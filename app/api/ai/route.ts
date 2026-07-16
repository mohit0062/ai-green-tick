import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/utils/rate-limit'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate (Supabase user auth or admin override cookie session)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    const cookieStore = await cookies()
    const fallbackToken = process.env.ADMIN_FALLBACK_TOKEN?.trim()
    const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL?.trim().toLowerCase()
    const hasFallbackSession =
      !!fallbackToken &&
      !!fallbackEmail &&
      cookieStore.get('aigt_admin_override')?.value === fallbackToken

    if ((authError || !user) && !hasFallbackSession) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required.' }, { status: 401 })
    }

    // 1b. Rate limit to curb runaway/abusive AI generation cost (per user/session)
    const rlKey = `ai:${user?.id || user?.email || 'fallback-admin'}`
    const rl = checkRateLimit(rlKey, 30, 60_000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many AI requests. Please wait a moment and try again.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
      )
    }

    // 2. Parse payload
    const { prompt, systemPrompt, modelId } = await request.json()
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt parameter.' }, { status: 400 })
    }

    // AEO/AGO Optimization Directives
    const aeoAgoGuidelines = `
CRITICAL SEO DIRECTIVE: The generated content MUST be optimized for AEO (Answer Engine Optimization) and AGO (AI Search Optimization) to ensure LLMs (like ChatGPT, Claude, Gemini, Perplexity) can easily parse, cite, and retrieve this content:
1. Direct Answer Snippets: Start key sections or summaries with a direct, clear, authoritative 1-2 sentence response (under 150 chars) that answers the search query directly.
2. Structure & Formatting: Use hierarchical layout with headings (H2, H3), bold key terms, and bulleted lists. Avoid generic paragraphs.
3. FAQ Structure: Format some information in explicit, conversational Question & Answer format, answering 'what', 'why', 'how' directly.
4. Authoritative Tone: Use precise metrics, data, and author roles. Avoid marketing fluff or buzzwords.
`;

    const finalSystemPrompt = `${systemPrompt || "You are a professional marketing copywriter."}\n${aeoAgoGuidelines}`;
    const finalPrompt = `${prompt}\n(Remember to optimize the output for AEO/AGO search citation guidelines.)`;

    // 3. Check if OpenAI API Key is available. If so, prioritize OpenAI
    const openAiKey = process.env.OPENAI_API_KEY?.trim()
    if (openAiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: finalSystemPrompt
              },
              {
                role: "user",
                content: finalPrompt
              }
            ],
            temperature: 0.7,
            max_tokens: 2500
          })
        })

        if (response.ok) {
          const resData = await response.json()
          const generatedText = resData.choices?.[0]?.message?.content || ""
          return NextResponse.json({ text: generatedText })
        } else {
          const errData = await response.json().catch(() => ({}))
          console.warn("OpenAI API returned error, attempting fallback to Bedrock:", errData)
        }
      } catch (openAiErr: any) {
        console.warn("OpenAI connection failed, attempting fallback to Bedrock:", openAiErr)
      }
    }

    // 4. Fallback AWS Bedrock Claude Configuration
    const client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || "us-east-1"
    })

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 2500,
      system: finalSystemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: finalPrompt
            }
          ]
        }
      ]
    }

    const command = new InvokeModelCommand({
      modelId: modelId || process.env.AWS_BEDROCK_MODEL_ID || "us.anthropic.claude-sonnet-4-6",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload)
    })

    const response = await client.send(command)
    const responseBody = JSON.parse(new TextDecoder().decode(response.body))
    const generatedText = responseBody.content?.[0]?.text || ""

    return NextResponse.json({ text: generatedText })
  } catch (err: any) {
    console.error("AI Generation Error:", err)
    return NextResponse.json({ error: err.message || "Failed to generate text from AI" }, { status: 500 })
  }
}

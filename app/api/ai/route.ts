import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required.' }, { status: 401 })
    }

    // 2. Parse payload
    const { prompt, systemPrompt, modelId } = await request.json()
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt parameter.' }, { status: 400 })
    }

    const client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || "us-east-1"
    })

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 2500,
      system: systemPrompt || "You are a professional marketing copywriter.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
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
    console.error("AWS Bedrock Claude Error:", err)
    return NextResponse.json({ error: err.message || "Failed to generate text from AWS Bedrock Claude" }, { status: 500 })
  }
}

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateSiteSectionAction } from '../cms-actions'
import { cn } from '@/lib/utils'
import { 
  Sparkles, Check, X, Plus, Trash2, ArrowUp, ArrowDown, ArrowLeft,
  Info, Laptop, Smartphone, HelpCircle, Layers, ShieldCheck,
  Undo, Redo, Bold, Italic, List, ListOrdered, Quote, AlignLeft, 
  AlignCenter, AlignRight, Link, Image, FileText, Settings, Eye, Globe, Upload, Loader2
} from 'lucide-react'

interface PricingEditorClientProps {
  initialData: any
}

export default function PricingEditorClient({ initialData }: PricingEditorClientProps) {
  const [data, setData] = useState(initialData)
  const [title, setTitle] = useState('AIS Pricing Plans')
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Sidebar stats
  const [status, setStatus] = useState('published')
  const [focusKeyword, setFocusKeyword] = useState('pricing plans')
  const [schemaStatus, setSchemaStatus] = useState('On')
  const [seoScore, setSeoScore] = useState(75)

  // AI Content Assistant simulation
  const [aiInstructions, setAiInstructions] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiTab, setAiTab] = useState<'write' | 'instructions'>('write')

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const result = await updateSiteSectionAction('pricing_data', data)
      if (result.error) {
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Pricing configuration updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving pricing:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  const updateHeader = (field: string, value: string) => {
    setData({
      ...data,
      [field]: value
    })
  }

  const updatePlanField = (planKey: string, field: string, value: any) => {
    setData({
      ...data,
      plans: {
        ...data.plans,
        [planKey]: {
          ...data.plans[planKey],
          [field]: value
        }
      }
    })
  }

  const updatePlanPrice = (planKey: string, currency: 'INR' | 'USD', cycle: 'monthly' | 'annual', value: number) => {
    setData({
      ...data,
      plans: {
        ...data.plans,
        [planKey]: {
          ...data.plans[planKey],
          price: {
            ...data.plans[planKey].price,
            [currency]: {
              ...data.plans[planKey].price[currency],
              [cycle]: value
            }
          }
        }
      }
    })
  }

  const updateFeature = (planKey: string, featIdx: number, value: string) => {
    const features = [...(data.plans[planKey].features || [])]
    features[featIdx] = value
    updatePlanField(planKey, 'features', features)
  }

  const deleteFeature = (planKey: string, featIdx: number) => {
    const features = (data.plans[planKey].features || []).filter((_: any, i: number) => i !== featIdx)
    updatePlanField(planKey, 'features', features)
  }

  const addFeature = (planKey: string) => {
    const features = [...(data.plans[planKey].features || []), '']
    updatePlanField(planKey, 'features', features)
  }

  // SEO checklist simulation
  const seoChecklist = (() => {
    const checks: { label: string; pass: boolean; tip: string }[] = []
    const kw = focusKeyword.toLowerCase().trim()
    const subtitle = data.headerSubtitle || ''
    const desc = data.headerDescription || ''

    checks.push({ label: 'Focus keyword set', pass: !!kw, tip: 'Set focus keyword' })
    checks.push({ label: 'Keyword in Header Subtitle', pass: !!kw && subtitle.toLowerCase().includes(kw), tip: 'Include keyword in pricing subtitle' })
    checks.push({ label: 'Header description length (>60 chars)', pass: desc.length > 60, tip: 'Add details to header description' })
    checks.push({ label: 'Four plans configured', pass: Object.keys(data.plans || {}).length === 4, tip: 'Configure starter, growth, business and enterprise plans' })
    checks.push({ label: 'Starter plan price defined', pass: data.plans?.Starter?.price?.INR?.monthly > 0, tip: 'Starter plan price' })
    checks.push({ label: 'Growth plan popular badge set', pass: !!data.plans?.Growth?.popular, tip: 'Check popular badge on Growth' })
    checks.push({ label: 'Enterprise plan features list', pass: (data.plans?.Enterprise?.features || []).length > 4, tip: 'Enterprise list size' })

    // AEO/AGO checks
    const hasConversationalKeyword = ['how', 'why', 'what', 'best', 'guide', 'strategy', 'tips', 'api'].some(word => kw.includes(word))
    checks.push({
      label: 'AEO: Conversational Keyword intent',
      pass: hasConversationalKeyword,
      tip: 'Use conversational search words in keyword (how, why, what, best, api, guide)'
    })

    const hasDirectAnswer = desc.length > 50 && desc.length <= 200
    checks.push({
      label: 'AEO: Direct Answer Snippet',
      pass: hasDirectAnswer,
      tip: 'Description should be 50-200 chars to serve as an AI Direct Answer Snippet'
    })

    const passCount = checks.filter(c => c.pass).length
    const calculatedScore = Math.round((passCount / checks.length) * 100)

    return { checks, score: calculatedScore }
  })()

  useEffect(() => {
    setSeoScore(seoChecklist.score)
  }, [seoChecklist.score])

  const handleAIGenerate = () => {
    setIsGeneratingAI(true)
    setTimeout(() => {
      setIsGeneratingAI(false)
      updateHeader('headerSubtitle', 'Unbeatable Value. High Delivery. Official Meta APIs.')
      updateHeader('headerDescription', 'Get started with our flexible pricing plans. Zero markups on official WhatsApp business charges. Choose the tier that matches your team and volumes.')
      showStatus('success', 'AI Generator updated pricing header texts!')
    }, 2000)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-neutral-800 antialiased select-none">
      {/* Toast Notification Banner */}
      {statusMsg && (
        <div
          className={cn(
            "fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300",
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
              : 'bg-destructive/10 text-destructive border-destructive/20'
          )}
        >
          {statusMsg.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <X className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span className="text-sm font-medium">{statusMsg.text}</span>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 select-none">
          <Globe className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-neutral-900">
            Edit Page: {title}
          </h2>
          <p className="text-neutral-500 text-xs">WordPress layout view. Customize plan prices, currency conversions, and features checklists.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Post Title Field */}
          <div className="bg-white p-4.5 rounded-lg border border-[#C5C4C2]/50 shadow-xs space-y-2">
            <Input
              type="text"
              placeholder="Enter title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold h-12 px-3 border-neutral-300 hover:border-neutral-400 focus:border-neutral-500 bg-white placeholder-neutral-300 rounded-md"
            />
            
            {/* Permalink preview */}
            <div className="text-xs text-neutral-500 pl-1 flex flex-wrap items-center gap-1">
              <span className="font-semibold text-neutral-600">Permalink:</span>
              <span className="font-mono bg-neutral-50 px-1 rounded text-neutral-400">
                http://localhost:3005/#pricing
              </span>
              <span className="font-semibold text-sky-700 font-mono underline hover:text-sky-855 cursor-pointer">
                (pricing-hash)
              </span>
            </div>
          </div>

          {/* Section 1: Header Text */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">Header Information</CardTitle>
              <CardDescription className="text-[10px]">Edit the pricing section tagline subtitle and general introduction descriptions.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white">
              <div className="space-y-1.5">
                <Label className="font-semibold text-neutral-750">Header Tagline Subtitle</Label>
                <Input value={data.headerSubtitle || ''} onChange={e => updateHeader('headerSubtitle', e.target.value)} className="border-neutral-300 h-9 bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="font-semibold text-neutral-750">Header Description Paragraph</Label>
                <Textarea value={data.headerDescription || ''} onChange={e => updateHeader('headerDescription', e.target.value)} className="border-neutral-300 min-h-[70px] bg-white" />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Plans lists */}
          {Object.keys(data.plans || {}).map((planKey) => {
            const plan = data.plans[planKey]
            return (
              <Card key={planKey} className="border border-neutral-200 shadow-sm bg-white rounded-lg">
                <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3 px-5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-black text-neutral-850 flex items-center gap-1.5">
                      {plan.name || planKey.toUpperCase()}
                      {plan.popular && <Badge className="bg-primary text-white text-[9px] hover:bg-primary">MOST POPULAR</Badge>}
                    </CardTitle>
                    <CardDescription className="text-[9px]">Configure descriptors, rates, and feature listings.</CardDescription>
                  </div>
                  
                  {planKey === 'Growth' && (
                    <div className="flex items-center gap-1 text-[10px]">
                      <input 
                        type="checkbox" 
                        id={`popular-${planKey}`}
                        checked={!!plan.popular} 
                        onChange={e => updatePlanField(planKey, 'popular', e.target.checked)} 
                        className="cursor-pointer"
                      />
                      <label htmlFor={`popular-${planKey}`} className="font-bold text-neutral-600 cursor-pointer">Most Popular Badge</label>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-neutral-500 uppercase font-semibold">Short Descriptor Tagline</Label>
                    <Input value={plan.desc || ''} onChange={e => updatePlanField(planKey, 'desc', e.target.value)} className="border-neutral-300 h-8.5 text-xs bg-white" />
                  </div>

                  {!plan.isCustom && (
                    <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-neutral-100">
                      {/* INR prices */}
                      <div className="p-3 border rounded-lg bg-neutral-50/30 space-y-2">
                        <span className="text-[9px] font-black font-mono text-neutral-500 uppercase">INR (₹) RATES</span>
                        <div className="grid gap-2 grid-cols-2">
                          <div>
                            <Label className="text-[8px] text-neutral-450 uppercase">Monthly Price</Label>
                            <Input 
                              type="number" 
                              value={plan.price?.INR?.monthly || 0} 
                              onChange={e => updatePlanPrice(planKey, 'INR', 'monthly', Number(e.target.value))} 
                              className="h-8 text-xs bg-white border-neutral-300"
                            />
                          </div>
                          <div>
                            <Label className="text-[8px] text-neutral-450 uppercase">Annual Price</Label>
                            <Input 
                              type="number" 
                              value={plan.price?.INR?.annual || 0} 
                              onChange={e => updatePlanPrice(planKey, 'INR', 'annual', Number(e.target.value))} 
                              className="h-8 text-xs bg-white border-neutral-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* USD prices */}
                      <div className="p-3 border rounded-lg bg-neutral-50/30 space-y-2">
                        <span className="text-[9px] font-black font-mono text-neutral-500 uppercase">USD ($) RATES</span>
                        <div className="grid gap-2 grid-cols-2">
                          <div>
                            <Label className="text-[8px] text-neutral-455 uppercase">Monthly Price</Label>
                            <Input 
                              type="number" 
                              value={plan.price?.USD?.monthly || 0} 
                              onChange={e => updatePlanPrice(planKey, 'USD', 'monthly', Number(e.target.value))} 
                              className="h-8 text-xs bg-white border-neutral-300"
                            />
                          </div>
                          <div>
                            <Label className="text-[8px] text-neutral-455 uppercase">Annual Price</Label>
                            <Input 
                              type="number" 
                              value={plan.price?.USD?.annual || 0} 
                              onChange={e => updatePlanPrice(planKey, 'USD', 'annual', Number(e.target.value))} 
                              className="h-8 text-xs bg-white border-neutral-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features list */}
                  <div className="border-t border-neutral-200 pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black text-neutral-800 uppercase tracking-wide">Included Features</h4>
                      <Button onClick={() => addFeature(planKey)} size="sm" className="h-6 text-[9px] font-bold cursor-pointer gap-1">
                        <Plus className="h-3 w-3" /> Add feature
                      </Button>
                    </div>
                    
                    <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
                      {(plan.features || []).map((feature: string, featIdx: number) => (
                        <div key={featIdx} className="flex gap-2 items-center">
                          <Input 
                            value={feature} 
                            onChange={e => updateFeature(planKey, featIdx, e.target.value)} 
                            className="h-8 text-xs bg-white border-neutral-200 flex-1"
                            placeholder="e.g. 1 WhatsApp Number"
                          />
                          <Button 
                            onClick={() => deleteFeature(planKey, featIdx)} 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-red-500 hover:text-red-655 hover:bg-red-50 cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* Publish Settings Card */}
          <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4">
              <CardTitle className="text-xs font-bold text-neutral-800">Publish settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-[11px] text-neutral-500 font-normal leading-relaxed select-none">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Status:</span>
                <Select value={status} onValueChange={(val) => setStatus(val)}>
                  <SelectTrigger className="bg-white border border-neutral-200 h-7 w-24 outline-none text-neutral-800 text-[10px] cursor-pointer font-normal shadow-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Visibility:</span>
                <span className="text-primary font-semibold">Public (Edit)</span>
              </div>

              <div className="space-y-1">
                <span className="block text-neutral-455 font-bold uppercase tracking-wider text-[9px]">Focus Keyword</span>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="Focus SEO keyword"
                  className="h-7.5 text-[10px] border-neutral-300 font-normal"
                />
              </div>

              <div className="border-t border-[#C5C4C2]/35 pt-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">SEO Score Rank:</span>
                  <Badge 
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                      seoScore >= 80 ? "bg-[#EAFBF3] text-emerald-600 border border-emerald-400" :
                      seoScore >= 50 ? "bg-[#FFF9E6] text-amber-600 border border-amber-400" :
                      "bg-red-50 text-red-650 border border-red-400"
                    )}
                  >
                    {focusKeyword ? `${seoScore}/100` : 'N/A'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">Schema:</span>
                  <select
                    value={schemaStatus}
                    onChange={(e) => setSchemaStatus(e.target.value)}
                    className="bg-white border border-neutral-300 h-7 rounded px-2 outline-none text-neutral-855 text-[10px] cursor-pointer font-normal"
                  >
                    <option value="On">Enabled (On)</option>
                    <option value="Off">Disabled (Off)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/45 pt-3.5 flex items-center justify-between border-neutral-200">
                <button
                  type="button"
                  onClick={() => alert('Moving the pricing settings to trash is disabled to prevent website breakdown.')}
                  className="text-red-500/50 hover:text-red-500/70 hover:underline cursor-not-allowed font-bold"
                >
                  Move to Trash
                </button>
                
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-black text-white hover:bg-neutral-850 font-bold h-8.5 px-4 cursor-pointer text-xs rounded-md shadow-xs gap-1"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" />} Update
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SEO Checklist Card */}
          <Card className="border border-[#C5C4C2]/50 bg-white rounded-lg shadow-xs overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1 font-display">
                <FileText className="h-3.5 w-3.5 text-blue-500" /> SEO Checklist
              </CardTitle>
              <Badge
                className={cn(
                  "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                  seoChecklist.score >= 80 ? "bg-[#EAFBF3] text-emerald-600 border-emerald-400" :
                  seoChecklist.score >= 50 ? "bg-[#FFF9E6] text-amber-600 border-amber-400" :
                  "bg-red-50 text-red-655 border-red-400"
                )}
              >
                {seoChecklist.score}/100
              </Badge>
            </CardHeader>
            <CardContent className="p-3 space-y-1 select-none">
              {seoChecklist.checks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 py-1 px-1 rounded hover:bg-neutral-50 transition-colors" title={check.tip}>
                  <div className={cn(
                    "size-4 rounded-full flex items-center justify-center shrink-0 border",
                    check.pass
                      ? "bg-[#EAFBF3] border-emerald-400 text-emerald-600"
                      : "bg-red-50 border-red-300 text-red-500"
                  )}>
                    {check.pass ? (
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    ) : (
                      <X className="h-2.5 w-2.5 stroke-[3]" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium leading-tight",
                    check.pass ? "text-neutral-600" : "text-red-655"
                  )}>
                    {check.label}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-200/50 mt-1">
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      seoChecklist.score >= 80 ? "bg-emerald-500" :
                      seoChecklist.score >= 50 ? "bg-amber-500" :
                      "bg-red-500"
                    )}
                    style={{ width: `${seoChecklist.score}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content AI metabox */}
          <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> Content AI Assistant
              </CardTitle>
              <Badge variant="outline" className="px-1 text-[8px] border-primary/30 text-primary bg-primary/5 font-bold tracking-wide uppercase select-none rounded">
                Beta
              </Badge>
            </CardHeader>
            <CardContent className="p-4 text-[11px] text-neutral-500 font-normal space-y-3 select-none leading-relaxed">
              <div className="flex bg-neutral-100 p-0.5 rounded-md text-[9px] font-semibold select-none border">
                <button
                  type="button"
                  onClick={() => setAiTab('write')}
                  className={cn(
                    "flex-1 text-center py-1 rounded-sm cursor-pointer transition-all",
                    aiTab === 'write' ? "bg-white text-black shadow-xs" : "text-neutral-500 hover:text-black"
                  )}
                >
                  Write Content
                </button>
                <button
                  type="button"
                  onClick={() => setAiTab('instructions')}
                  className={cn(
                    "flex-1 text-center py-1 rounded-sm cursor-pointer transition-all",
                    aiTab === 'instructions' ? "bg-white text-black shadow-xs" : "text-neutral-500 hover:text-black"
                  )}
                >
                  AI Instructions
                </button>
              </div>

              {aiTab === 'write' ? (
                <div className="space-y-3">
                  <p className="text-[10px] text-neutral-400 font-normal leading-normal">
                    AI analyzes your Title and auto-generates description content and custom features list items instantly.
                  </p>
                  
                  <Button
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={isGeneratingAI}
                    className="w-full font-bold h-8 text-[11px] cursor-pointer rounded-md shadow-sm gap-1.5"
                  >
                    {isGeneratingAI ? (
                      <>
                        <span className="h-3 w-3 rounded-full border border-white border-t-transparent animate-spin inline-block" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" /> Write with AI
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-[9px] text-neutral-455 uppercase font-bold pl-0.5">Instructions for Generator</Label>
                  <Textarea
                    value={aiInstructions}
                    onChange={(e) => setAiInstructions(e.target.value)}
                    placeholder="e.g. Focus on e-commerce pricing details..."
                    className="h-20 text-[10px] border-neutral-200 resize-none font-normal"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

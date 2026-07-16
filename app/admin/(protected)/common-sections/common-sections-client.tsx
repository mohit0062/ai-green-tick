'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateSiteSectionAction } from '../cms-actions'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import { cn } from '@/lib/utils'
import { Check, Loader2, Plus, X, Globe, Mail, Phone, MapPin, Search, Trash2, Image as ImageIcon } from 'lucide-react'

interface CommonSectionsClientProps {
  initialNavbar: any
  initialFooter: any
  initialCta: any
  initialSeo: any
  initialFeatures: any[]
  initialTeams?: any[]
  initialSolutions?: any[]
  initialLogoCloud?: any
}

export default function CommonSectionsClient({
  initialNavbar,
  initialFooter,
  initialCta,
  initialSeo,
  initialFeatures,
  initialTeams,
  initialSolutions,
  initialLogoCloud,
}: CommonSectionsClientProps) {
  // State for Logo Cloud
  const [logoCloud, setLogoCloud] = useState(logoCloudWithFallback(initialLogoCloud))
  const [savingLogoCloud, setSavingLogoCloud] = useState(false)
  const [newLogoName, setNewLogoName] = useState('')
  const [newLogoImage, setNewLogoImage] = useState('')
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)

  function logoCloudWithFallback(data: any) {
    const fallback = DEFAULT_FALLBACKS.logo_cloud || { heading: '', logos: [] }
    if (!data) return fallback
    return {
      ...fallback,
      ...data,
      logos: (data.logos && data.logos.length > 0) ? data.logos : fallback.logos
    }
  }

  // State for Navbar
  const [navbar, setNavbar] = useState(navbarDataWithFallback(initialNavbar))
  const [savingNavbar, setSavingNavbar] = useState(false)
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkHref, setNewLinkHref] = useState('')

  // State for Features Dropdown Menu Items
  const [features, setFeatures] = useState<any[]>(initialFeatures || DEFAULT_FALLBACKS.industry_features)
  const [newFeatTitle, setNewFeatTitle] = useState('')
  const [newFeatShortDesc, setNewFeatShortDesc] = useState('')
  const [newFeatDesc, setNewFeatDesc] = useState('')
  const [newFeatIcon, setNewFeatIcon] = useState('Inbox')
  const [newFeatIconSvg, setNewFeatIconSvg] = useState('')
  const [newFeatLink, setNewFeatLink] = useState('')
  const [newFeatPreviewType, setNewFeatPreviewType] = useState('shared-inbox-feat')

  // State for Solutions Mega-Menu Teams
  const [teams, setTeams] = useState<any[]>(initialTeams || DEFAULT_FALLBACKS.industry_teams)
  const [newTeamTitle, setNewTeamTitle] = useState('')
  const [newTeamTagline, setNewTeamTagline] = useState('')
  const [newTeamDesc, setNewTeamDesc] = useState('')
  const [newTeamLink, setNewTeamLink] = useState('')
  const [newTeamPreview, setNewTeamPreview] = useState('marketing-preview')

  // State for Solutions Mega-Menu Industries
  const [solutions, setSolutions] = useState<any[]>(initialSolutions || DEFAULT_FALLBACKS.industry_list)
  const [newSolTitle, setNewSolTitle] = useState('')
  const [newSolShortDesc, setNewSolShortDesc] = useState('')
  const [newSolDesc, setNewSolDesc] = useState('')
  const [newSolIcon, setNewSolIcon] = useState('ShoppingBag')
  const [newSolLink, setNewSolLink] = useState('')
  const [newSolPreview, setNewSolPreview] = useState('ecommerce')
  
  // Helper to ensure standaloneLinks fallback is set safely
  function navbarDataWithFallback(data: any) {
    const fallback = DEFAULT_FALLBACKS.navbar
    if (!data) return fallback
    return {
      ...fallback,
      ...data,
      standaloneLinks: (data.standaloneLinks && data.standaloneLinks.length > 0) 
        ? data.standaloneLinks 
        : fallback.standaloneLinks
    }
  }

  // State for Footer
  const [footer, setFooter] = useState(footerDataWithFallback(initialFooter))
  const [savingFooter, setSavingFooter] = useState(false)
  const [newFooterColTitle, setNewFooterColTitle] = useState('')
  const [newBottomLinkTitle, setNewBottomLinkTitle] = useState('')
  const [newBottomLinkHref, setNewBottomLinkHref] = useState('')

  function footerDataWithFallback(data: any) {
    const fallback = DEFAULT_FALLBACKS.footer
    if (!data) return fallback
    return {
      ...fallback,
      ...data,
      linkColumns: (data.linkColumns && data.linkColumns.length > 0) 
        ? data.linkColumns 
        : fallback.linkColumns,
      bottomLinks: (data.bottomLinks && data.bottomLinks.length > 0) 
        ? data.bottomLinks 
        : fallback.bottomLinks
    }
  }

  // State for CTA
  const [cta, setCta] = useState(ctaDataWithFallback(initialCta))
  const [savingCta, setSavingCta] = useState(false)
  const [newCtaService, setNewCtaService] = useState('')

  function ctaDataWithFallback(data: any) {
    const fallback = DEFAULT_FALLBACKS.cta
    if (!data) return fallback
    return {
      ...fallback,
      ...data,
      services: (data.services && data.services.length > 0)
        ? data.services
        : fallback.services
    }
  }

  // State for SEO
  const [seo, setSeo] = useState(seoDataWithFallback(initialSeo))
  const [savingSeo, setSavingSeo] = useState(false)
  const [newMetaName, setNewMetaName] = useState('')
  const [newMetaContent, setNewMetaContent] = useState('')

  function seoDataWithFallback(data: any) {
    const fallback = DEFAULT_FALLBACKS.seo
    if (!data) return fallback
    return {
      ...fallback,
      ...data,
      additionalMetaTags: (data.additionalMetaTags && data.additionalMetaTags.length > 0)
        ? data.additionalMetaTags
        : []
    }
  }

  // Notification states
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSaveNavbar = async () => {
    setSavingNavbar(true)
    try {
      const result1 = await updateSiteSectionAction('navbar', navbar)
      const result2 = await updateSiteSectionAction('industry_features', features)
      const result3 = await updateSiteSectionAction('industry_teams', teams)
      const result4 = await updateSiteSectionAction('industry_list', solutions)
      if (result1.error || result2.error || result3.error || result4.error) {
        showStatus(
          'error',
          result1.error || result2.error || result3.error || result4.error || 'Failed to save navbar configuration.'
        )
      } else {
        showStatus('success', 'Navbar, features, and solutions mega menus updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving navbar:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSavingNavbar(false)
    }
  }

  const handleSaveFooter = async () => {
    setSavingFooter(true)
    try {
      const result = await updateSiteSectionAction('footer', footer)
      if (result.error) {
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Footer configuration updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving footer:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSavingFooter(false)
    }
  }

  const handleSaveCta = async () => {
    setSavingCta(true)
    try {
      const result = await updateSiteSectionAction('cta', cta)
      if (result.error) {
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Global CTA configuration updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving CTA:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSavingCta(false)
    }
  }

  const handleSaveSeo = async () => {
    setSavingSeo(true)
    try {
      const result = await updateSiteSectionAction('seo', seo)
      if (result.error) {
        showStatus('error', result.error)
      } else {
        showStatus('success', 'SEO configuration updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving SEO:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSavingSeo(false)
    }
  }

  const handleSaveLogoCloud = async () => {
    setSavingLogoCloud(true)
    try {
      const result = await updateSiteSectionAction('logo_cloud', logoCloud)
      if (result.error) {
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Logo Cloud configuration updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving Logo Cloud:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSavingLogoCloud(false)
    }
  }

  const handleLogoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingLogo(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1]
          const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName: cleanName,
              base64Data,
              mimeType: file.type
            })
          })
          const res = await response.json()
          if (res?.publicUrl) {
            setNewLogoImage(res.publicUrl)
          } else if (res?.error) {
            alert(`Upload error: ${res.error}`)
          }
        } catch (err: any) {
          alert(`Upload failed: ${err.message || err}`)
        } finally {
          setIsUploadingLogo(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const [isUploadingNavbarLogo, setIsUploadingNavbarLogo] = useState(false)
  const [isUploadingFooterLogo, setIsUploadingFooterLogo] = useState(false)

  const handleNavbarLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingNavbarLogo(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1]
          const cleanName = `navbar-logo-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName: cleanName,
              base64Data,
              mimeType: file.type
            })
          })
          const res = await response.json()
          if (res?.publicUrl) {
            setNavbar((prev: any) => ({ ...prev, logoImageUrl: res.publicUrl }))
            showStatus('success', 'Navbar logo uploaded successfully!')
          } else if (res?.error) {
            alert(`Upload error: ${res.error}`)
          }
        } catch (err: any) {
          alert(`Upload failed: ${err.message || err}`)
        } finally {
          setIsUploadingNavbarLogo(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFooterLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingFooterLogo(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1]
          const cleanName = `footer-logo-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName: cleanName,
              base64Data,
              mimeType: file.type
            })
          })
          const res = await response.json()
          if (res?.publicUrl) {
            setFooter((prev: any) => ({ ...prev, logoImageUrl: res.publicUrl }))
            showStatus('success', 'Footer logo uploaded successfully!')
          } else if (res?.error) {
            alert(`Upload error: ${res.error}`)
          }
        } catch (err: any) {
          alert(`Upload failed: ${err.message || err}`)
        } finally {
          setIsUploadingFooterLogo(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {statusMsg && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
            statusMsg.type === 'success'
              ? 'bg-[#00b259]/10 text-[#00b259] border-[#00b259]/20'
              : 'bg-red-500/10 text-red-500 border-red-500/20'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0 text-[#00b259]" />
          ) : (
            <X className="h-4 w-4 shrink-0 text-red-500" />
          )}
          <span className="text-sm font-medium">{statusMsg.text}</span>
        </div>
      )}

      <Tabs defaultValue="navbar" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl bg-neutral-100 p-1 rounded-xl">
          <TabsTrigger value="navbar" className="rounded-lg py-2 text-black cursor-pointer font-semibold data-[state=active]:bg-white data-[state=active]:shadow-xs">Navbar</TabsTrigger>
          <TabsTrigger value="footer" className="rounded-lg py-2 text-black cursor-pointer font-semibold data-[state=active]:bg-white data-[state=active]:shadow-xs">Footer</TabsTrigger>
          <TabsTrigger value="cta" className="rounded-lg py-2 text-black cursor-pointer font-semibold data-[state=active]:bg-white data-[state=active]:shadow-xs">Global CTA</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-lg py-2 text-black cursor-pointer font-semibold data-[state=active]:bg-white data-[state=active]:shadow-xs">SEO Settings</TabsTrigger>
          <TabsTrigger value="logo-cloud" className="rounded-lg py-2 text-black cursor-pointer font-semibold data-[state=active]:bg-white data-[state=active]:shadow-xs">Logo Cloud</TabsTrigger>
        </TabsList>

        {/* NAVBAR TAB CONTENT */}
        <TabsContent value="navbar" className="mt-6">
          <Card className="border border-[#C5C4C2]/50 bg-background shadow-xs rounded-xl overflow-hidden text-black font-sans">
            <CardHeader className="border-b border-[#C5C4C2]/30 bg-neutral-50/50 pb-4">
              <CardTitle className="text-xl font-bold font-display">Navbar Configuration</CardTitle>
              <CardDescription className="text-xs">
                Customize brand text, logo branding, and navigation control paths.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo / Brand Text</Label>
                  <Input
                    id="logoText"
                    value={navbar.logoText || ''}
                    onChange={(e) => setNavbar({ ...navbar, logoText: e.target.value })}
                    placeholder="AI Greentick"
                    className="border-[#C5C4C2] h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoImageUrl">Logo Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logoImageUrl"
                      value={navbar.logoImageUrl || ''}
                      onChange={(e) => setNavbar({ ...navbar, logoImageUrl: e.target.value })}
                      placeholder="/logo-full.png"
                      className="border-[#C5C4C2] h-10 flex-1 font-mono text-xs"
                    />
                    <label className="h-10 px-4 border border-[#C5C4C2] text-neutral-700 bg-white hover:bg-neutral-50 flex items-center justify-center text-xs font-semibold cursor-pointer shrink-0 rounded-lg shadow-sm select-none">
                      {isUploadingNavbarLogo ? '...' : 'Upload'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={isUploadingNavbarLogo}
                        onChange={handleNavbarLogoUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1">Standalone Navigation Links</h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Add, edit, reorder, or remove navigation links on the header.
                </p>

                {/* Links List */}
                <div className="space-y-3 mb-4">
                  {(navbar.standaloneLinks || []).map((link: any, index: number) => {
                    const linkType = link.type || (
                      link.title.toLowerCase() === 'features' ? 'mega-features' :
                      link.title.toLowerCase() === 'solutions' ? 'mega-solutions' :
                      link.title.toLowerCase() === 'company' ? 'dropdown' : 'link'
                    )

                    return (
                      <div key={index} className="flex flex-col gap-3 p-4 bg-neutral-50/40 border border-[#C5C4C2]/45 rounded-xl text-black">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <div className="grid grid-cols-3 gap-3 w-full flex-1">
                            <div className="space-y-1">
                              <Label className="text-[10px] text-neutral-400 uppercase font-bold">Link Title</Label>
                              <Input
                                value={link.title || ''}
                                onChange={(e) => {
                                  const updated = [...(navbar.standaloneLinks || [])]
                                  updated[index] = { ...updated[index], title: e.target.value }
                                  setNavbar({ ...navbar, standaloneLinks: updated })
                                }}
                                placeholder="Title"
                                className="bg-background h-9 text-xs border-[#C5C4C2]"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <Label className="text-[10px] text-neutral-400 uppercase font-bold">Destination (Href)</Label>
                              <Input
                                value={link.href || ''}
                                onChange={(e) => {
                                  const updated = [...(navbar.standaloneLinks || [])]
                                  updated[index] = { ...updated[index], href: e.target.value }
                                  setNavbar({ ...navbar, standaloneLinks: updated })
                                }}
                                placeholder="e.g. /pricing"
                                className="bg-background h-9 text-xs border-[#C5C4C2]"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-[10px] text-neutral-400 uppercase font-bold">Menu Action Type</Label>
                              <select
                                value={linkType}
                                onChange={(e) => {
                                  const updated = [...(navbar.standaloneLinks || [])]
                                  updated[index] = { 
                                    ...updated[index], 
                                    type: e.target.value,
                                    dropdownItems: e.target.value === 'dropdown' ? (updated[index].dropdownItems || []) : undefined 
                                  }
                                  setNavbar({ ...navbar, standaloneLinks: updated })
                                }}
                                className="w-full bg-background h-9 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                              >
                                <option value="link">Simple Link</option>
                                <option value="dropdown">Custom Dropdown List</option>
                                <option value="mega-features">Mega Menu: Features</option>
                                <option value="mega-solutions">Mega Menu: Solutions</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              disabled={index === 0}
                              onClick={() => {
                                const updated = [...(navbar.standaloneLinks || [])]
                                const temp = updated[index]
                                updated[index] = updated[index - 1]
                                updated[index - 1] = temp
                                setNavbar({ ...navbar, standaloneLinks: updated })
                              }}
                              className="h-8 w-8 text-neutral-400 hover:text-black cursor-pointer"
                              title="Move Up"
                            >
                              ↑
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              disabled={index === (navbar.standaloneLinks || []).length - 1}
                              onClick={() => {
                                const updated = [...(navbar.standaloneLinks || [])]
                                const temp = updated[index]
                                updated[index] = updated[index + 1]
                                updated[index + 1] = temp
                                setNavbar({ ...navbar, standaloneLinks: updated })
                              }}
                              className="h-8 w-8 text-neutral-400 hover:text-black cursor-pointer"
                              title="Move Down"
                            >
                              ↓
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updated = (navbar.standaloneLinks || []).filter((_: any, i: number) => i !== index)
                                setNavbar({ ...navbar, standaloneLinks: updated })
                              }}
                              className="h-8 w-8 text-red-500 hover:text-red-650 hover:bg-red-500/10 cursor-pointer"
                              title="Delete Link"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Nested Dropdown Sub-Items Editor */}
                        {linkType === 'dropdown' && (
                          <div className="mt-2 pl-4 border-l-2 border-[#00b259]/30 space-y-3">
                            <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 block">
                              Dropdown Sub-Items Editor
                            </span>
                            
                            <div className="space-y-3">
                              {(link.dropdownItems || []).map((subItem: any, subIndex: number) => (
                                <div key={subIndex} className="p-3 bg-white border border-[#C5C4C2]/30 rounded-lg space-y-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[9px] font-bold text-neutral-400 uppercase">Sub-Item #{subIndex + 1}</span>
                                    <div className="flex gap-1">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        disabled={subIndex === 0}
                                        onClick={() => {
                                          const links = [...(navbar.standaloneLinks || [])]
                                          const items = [...(links[index].dropdownItems || [])]
                                          const temp = items[subIndex]
                                          items[subIndex] = items[subIndex - 1]
                                          items[subIndex - 1] = temp
                                          links[index] = { ...links[index], dropdownItems: items }
                                          setNavbar({ ...navbar, standaloneLinks: links })
                                        }}
                                        className="h-6 w-6 text-neutral-400 hover:text-black cursor-pointer text-xs"
                                      >
                                        ↑
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        disabled={subIndex === (link.dropdownItems || []).length - 1}
                                        onClick={() => {
                                          const links = [...(navbar.standaloneLinks || [])]
                                          const items = [...(links[index].dropdownItems || [])]
                                          const temp = items[subIndex]
                                          items[subIndex] = items[subIndex + 1]
                                          items[subIndex + 1] = temp
                                          links[index] = { ...links[index], dropdownItems: items }
                                          setNavbar({ ...navbar, standaloneLinks: links })
                                        }}
                                        className="h-6 w-6 text-neutral-400 hover:text-black cursor-pointer text-xs"
                                      >
                                        ↓
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          const links = [...(navbar.standaloneLinks || [])]
                                          const items = (links[index].dropdownItems || []).filter((_: any, i: number) => i !== subIndex)
                                          links[index] = { ...links[index], dropdownItems: items }
                                          setNavbar({ ...navbar, standaloneLinks: links })
                                        }}
                                        className="h-6 w-6 text-red-500 hover:text-red-650 hover:bg-red-500/10 cursor-pointer"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Sub-Item Title</Label>
                                      <Input
                                        value={subItem.title || ''}
                                        onChange={(e) => {
                                          const links = [...(navbar.standaloneLinks || [])]
                                          const items = [...(links[index].dropdownItems || [])]
                                          items[subIndex] = { ...items[subIndex], title: e.target.value }
                                          links[index] = { ...links[index], dropdownItems: items }
                                          setNavbar({ ...navbar, standaloneLinks: links })
                                        }}
                                        placeholder="e.g. About Us"
                                        className="bg-background h-8 text-xs border-[#C5C4C2]"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Destination Route (Href)</Label>
                                      <Input
                                        value={subItem.href || ''}
                                        onChange={(e) => {
                                          const links = [...(navbar.standaloneLinks || [])]
                                          const items = [...(links[index].dropdownItems || [])]
                                          items[subIndex] = { ...items[subIndex], href: e.target.value }
                                          links[index] = { ...links[index], dropdownItems: items }
                                          setNavbar({ ...navbar, standaloneLinks: links })
                                        }}
                                        placeholder="e.g. /about"
                                        className="bg-background h-8 text-xs border-[#C5C4C2]"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-[9px] text-neutral-400 font-bold uppercase">Short Description (Optional)</Label>
                                    <Input
                                      value={subItem.description || ''}
                                      onChange={(e) => {
                                        const links = [...(navbar.standaloneLinks || [])]
                                        const items = [...(links[index].dropdownItems || [])]
                                        items[subIndex] = { ...items[subIndex], description: e.target.value }
                                        links[index] = { ...links[index], dropdownItems: items }
                                        setNavbar({ ...navbar, standaloneLinks: links })
                                      }}
                                      placeholder="e.g. Learn about our story"
                                      className="bg-background h-8 text-xs border-[#C5C4C2]"
                                    />
                                  </div>
                                </div>
                              ))}

                              {(link.dropdownItems || []).length === 0 && (
                                <p className="text-xs text-neutral-400 italic text-center p-3 border border-dashed border-[#C5C4C2] rounded-lg">
                                  No sub-menu items defined. Add one below!
                                </p>
                              )}

                              <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                  const links = [...(navbar.standaloneLinks || [])]
                                  const items = [...(links[index].dropdownItems || []), { title: '', href: '', description: '' }]
                                  links[index] = { ...links[index], dropdownItems: items }
                                  setNavbar({ ...navbar, standaloneLinks: links })
                                }}
                                className="h-8 text-xs text-[#00b259] hover:bg-[#00b259]/10 gap-1.5 cursor-pointer font-bold"
                              >
                                <Plus className="h-3.5 w-3.5" /> Add Sub-Item
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {(navbar.standaloneLinks || []).length === 0 && (
                    <p className="text-xs text-neutral-400 italic text-center p-4 border border-dashed border-[#C5C4C2] rounded-xl">
                      No standalone navigation links defined. Add one below!
                    </p>
                  )}
                </div>

                {/* Add Link Sub-Form */}
                <div className="flex flex-col sm:flex-row items-end gap-3 p-3 bg-[#00b259]/5 border border-[#00b259]/20 rounded-xl max-w-2xl">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="space-y-1">
                      <Label htmlFor="newLinkTitle" className="text-xs">New Title</Label>
                      <Input
                        id="newLinkTitle"
                        value={newLinkTitle}
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                        placeholder="e.g. Careers"
                        className="bg-background h-9 text-xs border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="newLinkHref" className="text-xs">New Destination</Label>
                      <Input
                        id="newLinkHref"
                        value={newLinkHref}
                        onChange={(e) => setNewLinkHref(e.target.value)}
                        placeholder="e.g. /careers"
                        className="bg-background h-9 text-xs border-[#C5C4C2]"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      if (!newLinkTitle.trim() || !newLinkHref.trim()) return
                      const updated = [...(navbar.standaloneLinks || []), { title: newLinkTitle.trim(), href: newLinkHref.trim() }]
                      setNavbar({ ...navbar, standaloneLinks: updated })
                      setNewLinkTitle('')
                      setNewLinkHref('')
                    }}
                    className="w-full sm:w-auto h-9 shrink-0 gap-1.5 px-4 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-semibold text-xs"
                  >
                    <Plus className="h-4 w-4" /> Add Link
                  </Button>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1">Features Dropdown Menu Items</h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Add, edit, reorder, or remove key features displayed in the hover mega-menu under "Features".
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-6">
                  {features.map((feat, index) => (
                    <div key={feat.id || index} className="p-4 bg-neutral-50/20 border border-[#C5C4C2]/45 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-black font-mono text-[#00b259] uppercase tracking-wider bg-[#00b259]/10 px-2 py-0.5 rounded">
                          Feature #{index + 1}: {feat.title || 'Untitled'}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={index === 0}
                            onClick={() => {
                              const updated = [...features]
                              const temp = updated[index]
                              updated[index] = updated[index - 1]
                              updated[index - 1] = temp
                              setFeatures(updated)
                            }}
                            className="h-8 w-8 cursor-pointer"
                            title="Move Up"
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={index === features.length - 1}
                            onClick={() => {
                              const updated = [...features]
                              const temp = updated[index]
                              updated[index] = updated[index + 1]
                              updated[index + 1] = temp
                              setFeatures(updated)
                            }}
                            className="h-8 w-8 cursor-pointer"
                            title="Move Down"
                          >
                            ↓
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updated = features.filter((_, i) => i !== index)
                              setFeatures(updated)
                            }}
                            className="h-8 w-8 text-red-500 hover:text-red-650 hover:bg-red-500/10 cursor-pointer"
                            title="Delete Feature"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Feature Title</Label>
                          <Input
                            value={feat.title || ''}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[index] = { ...updated[index], title: e.target.value }
                              setFeatures(updated)
                            }}
                            className="bg-background h-9 text-xs border-[#C5C4C2]"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Short Tagline Description</Label>
                          <Input
                            value={feat.shortDesc || ''}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[index] = { ...updated[index], shortDesc: e.target.value }
                              setFeatures(updated)
                            }}
                            className="bg-background h-9 text-xs border-[#C5C4C2]"
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Icon Class Name</Label>
                          <select
                            value={feat.icon && feat.icon.trim().startsWith('<svg') ? 'custom' : (feat.icon || 'Inbox')}
                            onChange={(e) => {
                              const updated = [...features]
                              if (e.target.value === 'custom') {
                                updated[index] = { ...updated[index], icon: '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' }
                              } else {
                                updated[index] = { ...updated[index], icon: e.target.value }
                              }
                              setFeatures(updated)
                            }}
                            className="w-full bg-background h-9 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                          >
                            <option value="Inbox">Inbox</option>
                            <option value="Bot">Bot / Chatbot</option>
                            <option value="BarChart2">BarChart / Analytics</option>
                            <option value="Megaphone">Megaphone / Broadcast</option>
                            <option value="CalendarClock">Calendar / Drips</option>
                            <option value="Sparkles">Sparkles / Ads</option>
                            <option value="Activity">Activity / Healthcare</option>
                            <option value="GraduationCap">GraduationCap / Education</option>
                            <option value="Home">Home / RealEstate</option>
                            <option value="Shield">Shield / Finance</option>
                            <option value="Plane">Plane / Travel</option>
                            <option value="custom">-- Custom SVG Code --</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Link URL Href</Label>
                          <Input
                            value={feat.link || ''}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[index] = { ...updated[index], link: e.target.value }
                              setFeatures(updated)
                            }}
                            className="bg-background h-9 text-xs border-[#C5C4C2]"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Live Visual Simulator</Label>
                          <select
                            value={feat.previewType || 'shared-inbox-feat'}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[index] = { ...updated[index], previewType: e.target.value }
                              setFeatures(updated)
                            }}
                            className="w-full bg-background h-9 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                          >
                            <option value="shared-inbox-feat">Shared Inbox Preview</option>
                            <option value="codeless-bot">Codeless Bot Flowchart</option>
                            <option value="perf-reports">Performance Reports</option>
                            <option value="broadcast-feat">Broadcast Send Logs</option>
                            <option value="drip-sequences">Drip Sequences Progress</option>
                            <option value="ads-feat">WhatsApp Ads Preview</option>
                          </select>
                        </div>
                      </div>

                      {feat.icon && feat.icon.trim().startsWith('<svg') && (
                        <div className="space-y-1">
                          <Label className="text-[10px] text-amber-700 uppercase font-bold">Custom SVG Icon Code</Label>
                          <Textarea
                            value={feat.icon}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[index] = { ...updated[index], icon: e.target.value }
                              setFeatures(updated)
                            }}
                            placeholder="Paste raw <svg>...</svg> here"
                            className="bg-background min-h-[60px] font-mono text-[10px] border-[#C5C4C2]"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Detailed Panel Description</Label>
                        <Textarea
                          value={feat.description || ''}
                          onChange={(e) => {
                            const updated = [...features]
                            updated[index] = { ...updated[index], description: e.target.value }
                            setFeatures(updated)
                          }}
                          className="bg-background min-h-[60px] text-xs border-[#C5C4C2]"
                        />
                      </div>
                    </div>
                  ))}

                  {features.length === 0 && (
                    <p className="text-xs text-neutral-400 italic text-center p-4 border border-dashed border-[#C5C4C2] rounded-xl">
                      No features defined in the dropdown yet. Add one below!
                    </p>
                  )}
                </div>

                {/* Add Feature Sub-Form */}
                <div className="p-4 bg-[#00b259]/5 border border-[#00b259]/20 rounded-xl space-y-3 max-w-2xl">
                  <span className="text-xs font-bold text-neutral-700 block">Add New Dropdown Feature Item</span>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Feature Title</Label>
                      <Input
                        value={newFeatTitle}
                        onChange={(e) => setNewFeatTitle(e.target.value)}
                        placeholder="e.g. Chatbot Builder"
                        className="bg-background h-9 text-xs border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Short Tagline</Label>
                      <Input
                        value={newFeatShortDesc}
                        onChange={(e) => setNewFeatShortDesc(e.target.value)}
                        placeholder="e.g. Build conversational paths"
                        className="bg-background h-9 text-xs border-[#C5C4C2]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Icon</Label>
                      <select
                        value={newFeatIcon}
                        onChange={(e) => {
                          setNewFeatIcon(e.target.value)
                          if (e.target.value === 'custom') {
                            setNewFeatIconSvg('<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>')
                          }
                        }}
                        className="w-full bg-background h-9 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                      >
                        <option value="Inbox">Inbox</option>
                        <option value="Bot">Bot / Chatbot</option>
                        <option value="BarChart2">BarChart / Analytics</option>
                        <option value="Megaphone">Megaphone / Broadcast</option>
                        <option value="CalendarClock">Calendar / Drips</option>
                        <option value="Sparkles">Sparkles / Ads</option>
                        <option value="Activity">Activity / Healthcare</option>
                        <option value="GraduationCap">GraduationCap / Education</option>
                        <option value="Home">Home / RealEstate</option>
                        <option value="Shield">Shield / Finance</option>
                        <option value="Plane">Plane / Travel</option>
                        <option value="custom">-- Custom SVG Code --</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Destination URL (Href)</Label>
                      <Input
                        value={newFeatLink}
                        onChange={(e) => setNewFeatLink(e.target.value)}
                        placeholder="e.g. /#about"
                        className="bg-background h-9 text-xs border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Live Simulator Preview</Label>
                      <select
                        value={newFeatPreviewType}
                        onChange={(e) => setNewFeatPreviewType(e.target.value)}
                        className="w-full bg-background h-9 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                      >
                        <option value="shared-inbox-feat">Shared Inbox Preview</option>
                        <option value="codeless-bot">Codeless Bot Flowchart</option>
                        <option value="perf-reports">Performance Reports</option>
                        <option value="broadcast-feat">Broadcast Send Logs</option>
                        <option value="drip-sequences">Drip Sequences Progress</option>
                        <option value="ads-feat">WhatsApp Ads Preview</option>
                      </select>
                    </div>
                  </div>

                  {newFeatIcon === 'custom' && (
                    <div className="space-y-1">
                      <Label className="text-xs text-amber-700 font-bold">Custom SVG Icon Code</Label>
                      <Textarea
                        value={newFeatIconSvg}
                        onChange={(e) => setNewFeatIconSvg(e.target.value)}
                        placeholder="Paste <svg>...</svg> tag here"
                        className="bg-background min-h-[60px] font-mono text-[10px] border-[#C5C4C2]"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label className="text-xs">Detailed Description</Label>
                    <Textarea
                      value={newFeatDesc}
                      onChange={(e) => setNewFeatDesc(e.target.value)}
                      placeholder="Enter detailed paragraph content here..."
                      className="bg-background min-h-[60px] text-xs border-[#C5C4C2]"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      if (!newFeatTitle.trim() || !newFeatShortDesc.trim() || !newFeatDesc.trim()) return
                      const newId = newFeatTitle.toLowerCase().replace(/\s+/g, '-')
                      const iconVal = newFeatIcon === 'custom' ? newFeatIconSvg : newFeatIcon
                      const newItem = {
                        id: newId,
                        title: newFeatTitle.trim(),
                        shortDesc: newFeatShortDesc.trim(),
                        description: newFeatDesc.trim(),
                        icon: iconVal,
                        link: newFeatLink.trim() || '/#about',
                        previewType: newFeatPreviewType
                      }
                      setFeatures([...features, newItem])
                      setNewFeatTitle('')
                      setNewFeatShortDesc('')
                      setNewFeatDesc('')
                      setNewFeatLink('')
                      setNewFeatIcon('Inbox')
                      setNewFeatIconSvg('')
                    }}
                    className="w-full h-9 shrink-0 gap-1.5 px-4 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs mt-2"
                  >
                    <Plus className="h-4 w-4" /> Add Feature Item
                  </Button>
                </div>
              </div>

              {/* SOLUTIONS MEGA-MENU EDITOR */}
              <div className="border-t border-[#C5C4C2]/30 pt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-neutral-800 mb-1">Solutions Mega-Menu: Teams/Roles</h4>
                  <p className="text-xs text-neutral-400">
                    Manage the teams or roles displayed in the left-hand column of the "Solutions" mega-menu.
                  </p>
                </div>

                {/* Teams List */}
                <div className="space-y-4 mb-6">
                  {teams.map((t, idx) => (
                    <div key={t.id || idx} className="p-4 bg-neutral-50/20 border border-[#C5C4C2]/45 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-black font-mono text-[#00b259] uppercase tracking-wider bg-[#00b259]/10 px-2 py-0.5 rounded">
                          Team #{idx + 1}: {t.title || 'Untitled'}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === 0}
                            onClick={() => {
                              const updated = [...teams]
                              const temp = updated[idx]
                              updated[idx] = updated[idx - 1]
                              updated[idx - 1] = temp
                              setTeams(updated)
                            }}
                            className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === teams.length - 1}
                            onClick={() => {
                              const updated = [...teams]
                              const temp = updated[idx]
                              updated[idx] = updated[idx + 1]
                              updated[idx + 1] = temp
                              setTeams(updated)
                            }}
                            className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"
                          >
                            ↓
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setTeams(teams.filter((_, i) => i !== idx))
                            }}
                            className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Team Title</Label>
                          <Input
                            value={t.title || ''}
                            onChange={(e) => {
                              const updated = [...teams]
                              updated[idx] = { ...updated[idx], title: e.target.value }
                              setTeams(updated)
                            }}
                            placeholder="e.g. Support"
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Tagline</Label>
                          <Input
                            value={t.tagline || ''}
                            onChange={(e) => {
                              const updated = [...teams]
                              updated[idx] = { ...updated[idx], tagline: e.target.value }
                              setTeams(updated)
                            }}
                            placeholder="e.g. Offer instant, 24/7 care"
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Destination Href</Label>
                          <Input
                            value={t.link || ''}
                            onChange={(e) => {
                              const updated = [...teams]
                              updated[idx] = { ...updated[idx], link: e.target.value }
                              setTeams(updated)
                            }}
                            placeholder="e.g. /team-inbox"
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Preview Template</Label>
                          <select
                            value={t.previewType || 'marketing-preview'}
                            onChange={(e) => {
                              const updated = [...teams]
                              updated[idx] = { ...updated[idx], previewType: e.target.value }
                              setTeams(updated)
                            }}
                            className="w-full bg-background h-8 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                          >
                            <option value="marketing-preview">Marketing Broadcast Template</option>
                            <option value="sales-preview">AI Sales Agent Template</option>
                            <option value="support-preview">Shared Inbox Team Template</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Description (Hover Box)</Label>
                        <Textarea
                          value={t.description || ''}
                          onChange={(e) => {
                            const updated = [...teams]
                            updated[idx] = { ...updated[idx], description: e.target.value }
                            setTeams(updated)
                          }}
                          placeholder="Long explanation of this team role..."
                          className="bg-background text-xs border-[#C5C4C2] min-h-[60px]"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add Team form */}
                  <div className="p-4 border border-dashed border-[#C5C4C2] rounded-xl space-y-3 bg-white">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Create New Team / Role</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Team Title</Label>
                        <Input
                          value={newTeamTitle}
                          onChange={(e) => setNewTeamTitle(e.target.value)}
                          placeholder="e.g. Product Ops"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Tagline</Label>
                        <Input
                          value={newTeamTagline}
                          onChange={(e) => setNewTeamTagline(e.target.value)}
                          placeholder="e.g. Automate internal tracking"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Destination Href</Label>
                        <Input
                          value={newTeamLink}
                          onChange={(e) => setNewTeamLink(e.target.value)}
                          placeholder="/#features"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Preview Template</Label>
                        <select
                          value={newTeamPreview}
                          onChange={(e) => setNewTeamPreview(e.target.value)}
                          className="w-full bg-background h-8 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                        >
                          <option value="marketing-preview">Marketing Broadcast Template</option>
                          <option value="sales-preview">AI Sales Agent Template</option>
                          <option value="support-preview">Shared Inbox Team Template</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] text-neutral-400 uppercase font-bold">Description (Hover Box)</Label>
                      <Textarea
                        value={newTeamDesc}
                        onChange={(e) => setNewTeamDesc(e.target.value)}
                        placeholder="Long explanation of this team role..."
                        className="text-xs border-[#C5C4C2] min-h-[60px]"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        if (!newTeamTitle.trim() || !newTeamTagline.trim()) return
                        const newId = newTeamTitle.toLowerCase().replace(/\s+/g, '-')
                        const newItem = {
                          id: newId,
                          title: newTeamTitle.trim(),
                          tagline: newTeamTagline.trim(),
                          description: newTeamDesc.trim(),
                          link: newTeamLink.trim() || '/#features',
                          previewType: newTeamPreview
                        }
                        setTeams([...teams, newItem])
                        setNewTeamTitle('')
                        setNewTeamTagline('')
                        setNewTeamDesc('')
                        setNewTeamLink('')
                        setNewTeamPreview('marketing-preview')
                      }}
                      className="h-8 text-xs text-[#00b259] hover:bg-[#00b259]/10 gap-1.5 cursor-pointer font-bold mt-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Team Item
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-800 mb-1">Solutions Mega-Menu: Industries & Use-Cases</h4>
                  <p className="text-xs text-neutral-400">
                    Manage the industries or specific solutions displayed in the main grid of the "Solutions" mega-menu.
                  </p>
                </div>

                {/* Solutions List */}
                <div className="space-y-4 mb-6">
                  {solutions.map((sol, idx) => (
                    <div key={sol.id || idx} className="p-4 bg-neutral-50/20 border border-[#C5C4C2]/45 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-black font-mono text-[#00b259] uppercase tracking-wider bg-[#00b259]/10 px-2 py-0.5 rounded">
                          Solution #{idx + 1}: {sol.title || 'Untitled'}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === 0}
                            onClick={() => {
                              const updated = [...solutions]
                              const temp = updated[idx]
                              updated[idx] = updated[idx - 1]
                              updated[idx - 1] = temp
                              setSolutions(updated)
                            }}
                            className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === solutions.length - 1}
                            onClick={() => {
                              const updated = [...solutions]
                              const temp = updated[idx]
                              updated[idx] = updated[idx + 1]
                              updated[idx + 1] = temp
                              setSolutions(updated)
                            }}
                            className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"
                          >
                            ↓
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSolutions(solutions.filter((_, i) => i !== idx))
                            }}
                            className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Solution/Industry Title</Label>
                          <Input
                            value={sol.title || ''}
                            onChange={(e) => {
                              const updated = [...solutions]
                              updated[idx] = { ...updated[idx], title: e.target.value }
                              setSolutions(updated)
                            }}
                            placeholder="e.g. eCommerce & Retail"
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Short Display Description</Label>
                          <Input
                            value={sol.shortDesc || ''}
                            onChange={(e) => {
                              const updated = [...solutions]
                              updated[idx] = { ...updated[idx], shortDesc: e.target.value }
                              setSolutions(updated)
                            }}
                            placeholder="e.g. Recover lost carts and sell inside chats"
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Icon Name / Raw SVG</Label>
                          <Input
                            value={sol.icon || ''}
                            onChange={(e) => {
                              const updated = [...solutions]
                              updated[idx] = { ...updated[idx], icon: e.target.value }
                              setSolutions(updated)
                            }}
                            placeholder="e.g. ShoppingBag or Raw <svg..."
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Destination Href</Label>
                          <Input
                            value={sol.link || ''}
                            onChange={(e) => {
                              const updated = [...solutions]
                              updated[idx] = { ...updated[idx], link: e.target.value }
                              setSolutions(updated)
                            }}
                            placeholder="e.g. /industries"
                            className="bg-background h-8 text-xs border-[#C5C4C2]"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-neutral-400 uppercase font-bold">Preview Template</Label>
                          <select
                            value={sol.previewType || 'ecommerce'}
                            onChange={(e) => {
                              const updated = [...solutions]
                              updated[idx] = { ...updated[idx], previewType: e.target.value }
                              setSolutions(updated)
                            }}
                            className="w-full bg-background h-8 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                          >
                            <option value="ecommerce">Shopify eCommerce Dashboard</option>
                            <option value="realestate">Real Estate Visits Scheduler</option>
                            <option value="travel">Travel Boarding Passes Alert</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Hover Preview Long Description</Label>
                        <Textarea
                          value={sol.description || ''}
                          onChange={(e) => {
                            const updated = [...solutions]
                            updated[idx] = { ...updated[idx], description: e.target.value }
                            setSolutions(updated)
                          }}
                          placeholder="Longer description displayed on hover preview container..."
                          className="bg-background text-xs border-[#C5C4C2] min-h-[60px]"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add Solution Form */}
                  <div className="p-4 border border-dashed border-[#C5C4C2] rounded-xl space-y-3 bg-white">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Create New Industry / Solution</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Solution/Industry Title</Label>
                        <Input
                          value={newSolTitle}
                          onChange={(e) => setNewSolTitle(e.target.value)}
                          placeholder="e.g. Education"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Short Display Description</Label>
                        <Input
                          value={newSolShortDesc}
                          onChange={(e) => setNewSolShortDesc(e.target.value)}
                          placeholder="e.g. Send notifications & fee reminders"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Icon Name / Raw SVG</Label>
                        <Input
                          value={newSolIcon}
                          onChange={(e) => setNewSolIcon(e.target.value)}
                          placeholder="GraduationCap"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Destination Href</Label>
                        <Input
                          value={newSolLink}
                          onChange={(e) => setNewSolLink(e.target.value)}
                          placeholder="/#about"
                          className="h-8 text-xs border-[#C5C4C2]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-neutral-400 uppercase font-bold">Preview Template</Label>
                        <select
                          value={newSolPreview}
                          onChange={(e) => setNewSolPreview(e.target.value)}
                          className="w-full bg-background h-8 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                        >
                          <option value="ecommerce">Shopify eCommerce Dashboard</option>
                          <option value="realestate">Real Estate Visits Scheduler</option>
                          <option value="travel">Travel Boarding Passes Alert</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] text-neutral-400 uppercase font-bold">Hover Preview Long Description</Label>
                      <Textarea
                        value={newSolDesc}
                        onChange={(e) => setNewSolDesc(e.target.value)}
                        placeholder="Longer description displayed on hover preview container..."
                        className="text-xs border-[#C5C4C2] min-h-[60px]"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        if (!newSolTitle.trim() || !newSolShortDesc.trim() || !newSolDesc.trim()) return
                        const newId = newSolTitle.toLowerCase().replace(/\s+/g, '-')
                        const newItem = {
                          id: newId,
                          title: newSolTitle.trim(),
                          shortDesc: newSolShortDesc.trim(),
                          description: newSolDesc.trim(),
                          icon: newSolIcon.trim(),
                          link: newSolLink.trim() || '/#about',
                          previewType: newSolPreview
                        }
                        setSolutions([...solutions, newItem])
                        setNewSolTitle('')
                        setNewSolShortDesc('')
                        setNewSolDesc('')
                        setNewSolLink('')
                        setNewSolIcon('ShoppingBag')
                        setNewSolPreview('ecommerce')
                      }}
                      className="h-8 text-xs text-[#00b259] hover:bg-[#00b259]/10 gap-1.5 cursor-pointer font-bold mt-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Solution Item
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-4">Header Call-To-Action Button</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="demoBtnText">Button Label</Label>
                    <Input
                      id="demoBtnText"
                      value={navbar.demoBtnText || ''}
                      onChange={(e) => setNavbar({ ...navbar, demoBtnText: e.target.value })}
                      placeholder="BOOK A DEMO"
                      className="border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demoBtnLink">Button Route / Destination</Label>
                    <Input
                      id="demoBtnLink"
                      value={navbar.demoBtnLink || ''}
                      onChange={(e) => setNavbar({ ...navbar, demoBtnLink: e.target.value })}
                      placeholder="e.g. /#demo"
                      className="border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calendlyUrl">Calendly URL (if route is #demo)</Label>
                    <Input
                      id="calendlyUrl"
                      value={navbar.calendlyUrl || ''}
                      onChange={(e) => setNavbar({ ...navbar, calendlyUrl: e.target.value })}
                      placeholder="https://calendly.com/..."
                      className="border-[#C5C4C2]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#C5C4C2]/30 bg-neutral-50/50 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveNavbar} disabled={savingNavbar} className="gap-2 px-6 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs">
                {savingNavbar && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Navbar Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* FOOTER TAB CONTENT */}
        <TabsContent value="footer" className="mt-6">
          <Card className="border border-[#C5C4C2]/50 bg-background shadow-xs rounded-xl overflow-hidden text-black font-sans">
            <CardHeader className="border-b border-[#C5C4C2]/30 bg-neutral-50/50 pb-4">
              <CardTitle className="text-xl font-bold font-display">Footer Configuration</CardTitle>
              <CardDescription className="text-xs">
                Customize brand descriptions, copyright attributions, link columns, and social handles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="footerDescription">Footer Brand Description</Label>
                <Textarea
                  id="footerDescription"
                  value={footer.description || ''}
                  onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                  placeholder="AI Greentick is an enterprise-grade WhatsApp Business API platform..."
                  className="border-[#C5C4C2] min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerCopyright">Copyright Attribution Text</Label>
                <Input
                  id="footerCopyright"
                  value={footer.copyright || ''}
                  onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                  placeholder="2026 AI Greentick, Made with ❤️ for a better web."
                  className="border-[#C5C4C2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerLogoImageUrl">Footer Logo Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="footerLogoImageUrl"
                    value={footer.logoImageUrl || ''}
                    onChange={(e) => setFooter({ ...footer, logoImageUrl: e.target.value })}
                    placeholder="/logo-full.png"
                    className="border-[#C5C4C2] h-10 flex-1 font-mono text-xs"
                  />
                  <label className="h-10 px-4 border border-[#C5C4C2] text-neutral-700 bg-white hover:bg-neutral-50 flex items-center justify-center text-xs font-semibold cursor-pointer shrink-0 rounded-lg shadow-sm select-none">
                    {isUploadingFooterLogo ? '...' : 'Upload'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      disabled={isUploadingFooterLogo}
                      onChange={handleFooterLogoUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-4 font-display">Social Connections</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="socialGithub" className="flex items-center gap-2">
                      Github URL
                    </Label>
                    <Input
                      id="socialGithub"
                      value={footer.socialLinks?.github || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, github: e.target.value }
                      })}
                      placeholder="https://github.com"
                      className="border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialInstagram" className="flex items-center gap-2">
                      Instagram URL
                    </Label>
                    <Input
                      id="socialInstagram"
                      value={footer.socialLinks?.instagram || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, instagram: e.target.value }
                      })}
                      placeholder="https://instagram.com"
                      className="border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialTwitter" className="flex items-center gap-2">
                      Twitter / X URL
                    </Label>
                    <Input
                      id="socialTwitter"
                      value={footer.socialLinks?.twitter || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, twitter: e.target.value }
                      })}
                      placeholder="https://twitter.com"
                      className="border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialYoutube" className="flex items-center gap-2">
                      Youtube URL
                    </Label>
                    <Input
                      id="socialYoutube"
                      value={footer.socialLinks?.youtube || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, youtube: e.target.value }
                      })}
                      placeholder="https://youtube.com"
                      className="border-[#C5C4C2]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1">Footer Link Columns</h4>
                <p className="text-xs text-neutral-400 mb-4">Manage link categories shown in the footer (e.g. Product, Company, Resources).</p>

                <div className="space-y-6">
                  {(footer.linkColumns || []).map((col: any, colIdx: number) => (
                    <div key={colIdx} className="p-4 bg-neutral-50/20 border border-[#C5C4C2]/40 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <Label className="text-[10px] uppercase font-bold text-neutral-400">Column Heading</Label>
                          <Input
                            value={col.title || ''}
                            onChange={(e) => {
                              const cols = [...(footer.linkColumns || [])]
                              cols[colIdx] = { ...cols[colIdx], title: e.target.value }
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            placeholder="e.g. Company"
                            className="bg-background h-9 text-xs font-semibold border-[#C5C4C2]"
                          />
                        </div>
                        <div className="flex items-center gap-1 shrink-0 self-end">
                          <Button type="button" variant="ghost" size="icon" disabled={colIdx === 0}
                            onClick={() => {
                              const cols = [...(footer.linkColumns || [])]
                              const tmp = cols[colIdx]; cols[colIdx] = cols[colIdx - 1]; cols[colIdx - 1] = tmp
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            className="h-8 w-8 cursor-pointer" title="Move Column Up">↑</Button>
                          <Button type="button" variant="ghost" size="icon" disabled={colIdx === (footer.linkColumns || []).length - 1}
                            onClick={() => {
                              const cols = [...(footer.linkColumns || [])]
                              const tmp = cols[colIdx]; cols[colIdx] = cols[colIdx + 1]; cols[colIdx + 1] = tmp
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            className="h-8 w-8 cursor-pointer" title="Move Column Down">↓</Button>
                          <Button type="button" variant="ghost" size="icon"
                            onClick={() => {
                              const cols = (footer.linkColumns || []).filter((_: any, i: number) => i !== colIdx)
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            className="h-8 w-8 text-red-500 hover:text-red-650 hover:bg-red-500/10 cursor-pointer" title="Delete Column">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Links inside column */}
                      <div className="space-y-2 pl-2">
                        {(col.links || []).map((link: any, linkIdx: number) => (
                          <div key={linkIdx} className="flex items-center gap-2">
                            <Input
                              value={link.title || ''}
                              onChange={(e) => {
                                const cols = [...(footer.linkColumns || [])]
                                const links = [...(cols[colIdx].links || [])]
                                links[linkIdx] = { ...links[linkIdx], title: e.target.value }
                                cols[colIdx] = { ...cols[colIdx], links }
                                setFooter({ ...footer, linkColumns: cols })
                              }}
                              placeholder="Link title"
                              className="bg-background h-8 text-xs flex-1 border-[#C5C4C2]"
                            />
                            <Input
                              value={link.href || ''}
                              onChange={(e) => {
                                const cols = [...(footer.linkColumns || [])]
                                const links = [...(cols[colIdx].links || [])]
                                links[linkIdx] = { ...links[linkIdx], href: e.target.value }
                                cols[colIdx] = { ...cols[colIdx], links }
                                setFooter({ ...footer, linkColumns: cols })
                              }}
                              placeholder="/path"
                              className="bg-background h-8 text-xs flex-1 border-[#C5C4C2]"
                            />
                            <Button type="button" variant="ghost" size="icon"
                              onClick={() => {
                                const cols = [...(footer.linkColumns || [])]
                                const links = (cols[colIdx].links || []).filter((_: any, i: number) => i !== linkIdx)
                                cols[colIdx] = { ...cols[colIdx], links }
                                setFooter({ ...footer, linkColumns: cols })
                              }}
                              className="h-7 w-7 text-red-500 hover:bg-red-500/10 shrink-0 cursor-pointer">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm"
                          onClick={() => {
                            const cols = [...(footer.linkColumns || [])]
                            const links = [...(cols[colIdx].links || []), { title: '', href: '' }]
                            cols[colIdx] = { ...cols[colIdx], links }
                            setFooter({ ...footer, linkColumns: cols })
                          }}
                          className="h-7 text-xs text-[#00b259] hover:bg-[#00b259]/10 gap-1 cursor-pointer font-bold">
                          <Plus className="h-3 w-3" /> Add Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Column Button */}
                <div className="flex items-end gap-3 mt-4 max-w-sm">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs">New Column Heading</Label>
                    <Input
                      value={newFooterColTitle}
                      onChange={(e) => setNewFooterColTitle(e.target.value)}
                      placeholder="e.g. Products"
                      className="bg-background h-9 text-xs border-[#C5C4C2]"
                    />
                  </div>
                  <Button type="button" onClick={() => {
                    if (!newFooterColTitle.trim()) return
                    const cols = [...(footer.linkColumns || []), { title: newFooterColTitle.trim(), links: [] }]
                    setFooter({ ...footer, linkColumns: cols })
                    setNewFooterColTitle('')
                  }} className="h-9 gap-1.5 px-4 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] shrink-0 cursor-pointer font-bold text-xs">
                    <Plus className="h-4 w-4" /> Add Column
                  </Button>
                </div>
              </div>

              {/* Legal Bottom Links */}
              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1">Bottom Bar Links</h4>
                <p className="text-xs text-neutral-400 mb-4">Privacy, terms, and copyright-level links (displayed beside credits).</p>

                <div className="space-y-2 mb-4">
                  {(footer.bottomLinks || []).map((link: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.title || ''}
                        onChange={(e) => {
                          const links = [...(footer.bottomLinks || [])]
                          links[idx] = { ...links[idx], title: e.target.value }
                          setFooter({ ...footer, bottomLinks: links })
                        }}
                        placeholder="Link title"
                        className="bg-background h-9 text-xs flex-1 border-[#C5C4C2]"
                      />
                      <Input
                        value={link.href || ''}
                        onChange={(e) => {
                          const links = [...(footer.bottomLinks || [])]
                          links[idx] = { ...links[idx], href: e.target.value }
                          setFooter({ ...footer, bottomLinks: links })
                        }}
                        placeholder="/privacy-policy"
                        className="bg-background h-9 text-xs flex-1 border-[#C5C4C2]"
                      />
                      <Button type="button" variant="ghost" size="icon"
                        onClick={() => {
                          const links = (footer.bottomLinks || []).filter((_: any, i: number) => i !== idx)
                          setFooter({ ...footer, bottomLinks: links })
                        }}
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10 shrink-0 cursor-pointer">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-3 max-w-lg">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input value={newBottomLinkTitle} onChange={(e) => setNewBottomLinkTitle(e.target.value)} placeholder="e.g. Privacy" className="bg-background h-9 text-xs border-[#C5C4C2]" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Href</Label>
                      <Input value={newBottomLinkHref} onChange={(e) => setNewBottomLinkHref(e.target.value)} placeholder="/privacy" className="bg-background h-9 text-xs border-[#C5C4C2]" />
                    </div>
                  </div>
                  <Button type="button" onClick={() => {
                    if (!newBottomLinkTitle.trim() || !newBottomLinkHref.trim()) return
                    const links = [...(footer.bottomLinks || []), { title: newBottomLinkTitle.trim(), href: newBottomLinkHref.trim() }]
                    setFooter({ ...footer, bottomLinks: links })
                    setNewBottomLinkTitle(''); setNewBottomLinkHref('')
                  }} className="h-9 gap-1.5 px-4 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] shrink-0 cursor-pointer font-bold text-xs">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#C5C4C2]/30 bg-neutral-50/50 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveFooter} disabled={savingFooter} className="gap-2 px-6 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs">
                {savingFooter && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Footer Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* CTA TAB CONTENT */}
        <TabsContent value="cta" className="mt-6">
          <Card className="border border-[#C5C4C2]/50 bg-background shadow-xs rounded-xl overflow-hidden text-black font-sans">
            <CardHeader className="border-b border-[#C5C4C2]/30 bg-neutral-50/50 pb-4">
              <CardTitle className="text-xl font-bold font-display">Global CTA Configuration</CardTitle>
              <CardDescription className="text-xs">
                Modify details of your primary bottom marketing section.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="ctaHeading">Heading Title</Label>
                <Input
                  id="ctaHeading"
                  value={cta.heading || ''}
                  onChange={(e) => setCta({ ...cta, heading: e.target.value })}
                  placeholder="Supercharge your sales..."
                  className="border-[#C5C4C2] font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaDescription">Description Text</Label>
                <Textarea
                  id="ctaDescription"
                  value={cta.description || ''}
                  onChange={(e) => setCta({ ...cta, description: e.target.value })}
                  placeholder="Connect with customers, run automated campaigns..."
                  className="border-[#C5C4C2] min-h-[80px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 border-t border-[#C5C4C2]/30 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonText">Primary Button Label</Label>
                  <Input
                    id="ctaButtonText"
                    value={cta.buttonText || ''}
                    onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                    placeholder="Get Started - Free"
                    className="border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonHref">Primary Button Route</Label>
                  <Input
                    id="ctaButtonHref"
                    value={cta.buttonHref || ''}
                    onChange={(e) => setCta({ ...cta, buttonHref: e.target.value })}
                    placeholder="/contact"
                    className="border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ctaSecButtonText">Secondary Button Label</Label>
                  <Input
                    id="ctaSecButtonText"
                    value={cta.secondaryButtonText || ''}
                    onChange={(e) => setCta({ ...cta, secondaryButtonText: e.target.value })}
                    placeholder="Book a Demo"
                    className="border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaSecButtonHref">Secondary Button Route</Label>
                  <Input
                    id="ctaSecButtonHref"
                    value={cta.secondaryButtonHref || ''}
                    onChange={(e) => setCta({ ...cta, secondaryButtonHref: e.target.value })}
                    placeholder="/contact?intent=demo"
                    className="border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6 space-y-4">
                <Label className="text-sm font-bold text-neutral-800 font-display block">Services Tags (Badges)</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(cta.services || []).map((service: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1 bg-[#00b259]/10 text-[#00b259] px-2.5 py-1 border border-[#00b259]/20 text-xs font-mono font-bold rounded">
                      <span>{service}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (cta.services || []).filter((_: any, i: number) => i !== idx)
                          setCta({ ...cta, services: updated })
                        }}
                        className="text-red-500 hover:text-red-750 transition-colors ml-1 font-sans cursor-pointer size-4 flex items-center justify-center rounded-full hover:bg-red-500/10"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {(cta.services || []).length === 0 && (
                    <span className="text-xs text-neutral-400 italic">No service badges configured.</span>
                  )}
                </div>
                <div className="flex items-center gap-2 max-w-sm">
                  <Input
                    placeholder="Add new tag (e.g. Shared Inbox)"
                    value={newCtaService}
                    onChange={(e) => setNewCtaService(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (!newCtaService.trim()) return
                        const updated = [...(cta.services || []), newCtaService.trim()]
                        setCta({ ...cta, services: updated })
                        setNewCtaService('')
                      }
                    }}
                    className="border-[#C5C4C2] h-9 text-xs"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (!newCtaService.trim()) return
                      const updated = [...(cta.services || []), newCtaService.trim()]
                      setCta({ ...cta, services: updated })
                      setNewCtaService('')
                    }}
                    className="h-9 gap-1.5 px-4 bg-[#00b259] text-white hover:bg-[#009b4d] font-bold text-xs cursor-pointer rounded-lg"
                  >
                    <Plus className="h-4 w-4" /> Add Tag
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#C5C4C2]/30 bg-neutral-50/50 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveCta} disabled={savingCta} className="gap-2 px-6 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs">
                {savingCta && <Loader2 className="h-4 w-4 animate-spin" />}
                Save CTA Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO TAB CONTENT */}
        <TabsContent value="seo" className="mt-6">
          <Card className="border border-[#C5C4C2]/50 bg-background shadow-xs rounded-xl overflow-hidden text-black font-sans">
            <CardHeader className="border-b border-[#C5C4C2]/30 bg-neutral-50/50 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2 font-display">
                <Search className="h-5 w-5 text-[#00b259]" /> Global Site SEO Configuration
              </CardTitle>
              <CardDescription className="text-xs">
                Control site-wide search tags, keywords, Open Graph social share attributes, and robots directives.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seoSiteTitle">Site Brand Name</Label>
                  <Input
                    id="seoSiteTitle"
                    value={seo.siteTitle || ''}
                    onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                    placeholder="AI Greentick"
                    className="border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoTitleTemplate">Title Layout Template</Label>
                  <Input
                    id="seoTitleTemplate"
                    value={seo.titleTemplate || ''}
                    onChange={(e) => setSeo({ ...seo, titleTemplate: e.target.value })}
                    placeholder="%s | AI Greentick"
                    className="border-[#C5C4C2]"
                  />
                  <p className="text-[10px] text-neutral-400">Use <code>%s</code> as current page title placeholder.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDefaultDescription">Default Meta Description</Label>
                <Textarea
                  id="seoDefaultDescription"
                  value={seo.defaultDescription || ''}
                  onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
                  placeholder="AI Greentick — Enterprise WhatsApp Business API..."
                  className="border-[#C5C4C2] min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">Global Meta Keywords (Comma-separated)</Label>
                <Textarea
                  id="seoKeywords"
                  value={seo.keywords || ''}
                  onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                  placeholder="whatsapp business api, whatsapp automation..."
                  className="border-[#C5C4C2] min-h-[60px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seoRobots">Robots Directive</Label>
                  <Input
                    id="seoRobots"
                    value={seo.robots || ''}
                    onChange={(e) => setSeo({ ...seo, robots: e.target.value })}
                    placeholder="index, follow"
                    className="border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoCanonicalBase">Canonical Base URL</Label>
                  <Input
                    id="seoCanonicalBase"
                    value={seo.canonicalBase || ''}
                    onChange={(e) => setSeo({ ...seo, canonicalBase: e.target.value })}
                    placeholder="https://aigreentick.com"
                    className="border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1 flex items-center gap-2 font-display">
                  <Globe className="h-4 w-4 text-[#00b259]" /> Open Graph Social share Preview
                </h4>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoOgSiteName">OG Site Name</Label>
                    <Input id="seoOgSiteName" value={seo.ogSiteName || ''} onChange={(e) => setSeo({ ...seo, ogSiteName: e.target.value })} placeholder="AI Greentick" className="border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoOgType">OG Type</Label>
                    <Input id="seoOgType" value={seo.ogType || ''} onChange={(e) => setSeo({ ...seo, ogType: e.target.value })} placeholder="website" className="border-[#C5C4C2]" />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="seoOgImage" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-neutral-400" /> Default OG Image URL
                  </Label>
                  <Input id="seoOgImage" value={seo.ogImage || ''} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} placeholder="/og-image.png" className="border-[#C5C4C2]" />
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1">Additional Custom Meta Tags</h4>
                <p className="text-xs text-neutral-400 mb-4">Paste verification identifiers or custom crawler values (e.g. Google-Site-Verification).</p>

                <div className="space-y-2 mb-4">
                  {(seo.additionalMetaTags || []).map((tag: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={tag.name || ''}
                        onChange={(e) => {
                          const tags = [...(seo.additionalMetaTags || [])]
                          tags[idx] = { ...tags[idx], name: e.target.value }
                          setSeo({ ...seo, additionalMetaTags: tags })
                        }}
                        placeholder="meta name (e.g. author)"
                        className="bg-background h-9 text-xs flex-1 border-[#C5C4C2]"
                      />
                      <Input
                        value={tag.content || ''}
                        onChange={(e) => {
                          const tags = [...(seo.additionalMetaTags || [])]
                          tags[idx] = { ...tags[idx], content: e.target.value }
                          setSeo({ ...seo, additionalMetaTags: tags })
                        }}
                        placeholder="meta content"
                        className="bg-background h-9 text-xs flex-1 border-[#C5C4C2]"
                      />
                      <Button type="button" variant="ghost" size="icon"
                        onClick={() => {
                          const tags = (seo.additionalMetaTags || []).filter((_: any, i: number) => i !== idx)
                          setSeo({ ...seo, additionalMetaTags: tags })
                        }}
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10 shrink-0 cursor-pointer">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-3 max-w-lg">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="space-y-1">
                      <Label className="text-xs">Meta Name</Label>
                      <Input value={newMetaName} onChange={(e) => setNewMetaName(e.target.value)} placeholder="e.g. author" className="bg-background h-9 text-xs border-[#C5C4C2]" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Meta Content</Label>
                      <Input value={newMetaContent} onChange={(e) => setNewMetaContent(e.target.value)} placeholder="e.g. AI Greentick Team" className="bg-background h-9 text-xs border-[#C5C4C2]" />
                    </div>
                  </div>
                  <Button type="button" onClick={() => {
                    if (!newMetaName.trim() || !newMetaContent.trim()) return
                    const tags = [...(seo.additionalMetaTags || []), { name: newMetaName.trim(), content: newMetaContent.trim() }]
                    setSeo({ ...seo, additionalMetaTags: tags })
                    setNewMetaName(''); setNewMetaContent('')
                  }} className="h-9 gap-1.5 px-4 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] shrink-0 cursor-pointer font-bold text-xs">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#C5C4C2]/30 bg-neutral-50/50 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveSeo} disabled={savingSeo} className="gap-2 px-6 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs">
                {savingSeo && <Loader2 className="h-4 w-4 animate-spin" />}
                Save SEO Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* LOGO CLOUD TAB CONTENT */}
        <TabsContent value="logo-cloud" className="mt-6">
          <Card className="border border-[#C5C4C2]/50 bg-background shadow-xs rounded-xl overflow-hidden text-black font-sans">
            <CardHeader className="border-b border-[#C5C4C2]/30 bg-neutral-50/50 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2 font-display">
                <ImageIcon className="h-5 w-5 text-[#00b259]" /> Logo Cloud Configuration
              </CardTitle>
              <CardDescription className="text-xs">
                Manage the list of client brand logos and heading shown in the scrolling marquee across the website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="logoCloudHeading">Marquee Heading Text</Label>
                <Input
                  id="logoCloudHeading"
                  value={logoCloud.heading || ''}
                  onChange={(e) => setLogoCloud({ ...logoCloud, heading: e.target.value })}
                  placeholder="Loved by growing brands across 15+ industries"
                  className="border-[#C5C4C2] h-10"
                />
              </div>

              <div className="border-t border-[#C5C4C2]/30 pt-6">
                <h4 className="text-sm font-bold text-neutral-800 mb-1">Brand Logos</h4>
                <p className="text-xs text-neutral-400 mb-4">Add, remove, or reorder client logo images displayed in the marquee.</p>

                {/* Logos grid/list */}
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mb-6 max-h-[400px] overflow-y-auto pr-1">
                  {(logoCloud.logos || []).map((logo: any, idx: number) => (
                    <div key={idx} className="p-3 bg-neutral-50/40 border border-[#C5C4C2]/40 rounded-xl flex gap-3 relative items-center">
                      <div className="size-12 border border-[#C5C4C2]/50 bg-white rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                        {logo.image ? (
                          <img src={logo.image} alt={logo.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-neutral-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-800 truncate">{logo.name || 'Untitled Logo'}</p>
                        <p className="text-[9px] text-neutral-400 truncate">{logo.image}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === 0}
                            onClick={() => {
                              const logos = [...(logoCloud.logos || [])]
                              const temp = logos[idx]
                              logos[idx] = logos[idx - 1]
                              logos[idx - 1] = temp
                              setLogoCloud({ ...logoCloud, logos })
                            }}
                            className="h-5 w-5 text-neutral-400 hover:text-black cursor-pointer text-[10px]"
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={idx === (logoCloud.logos || []).length - 1}
                            onClick={() => {
                              const logos = [...(logoCloud.logos || [])]
                              const temp = logos[idx]
                              logos[idx] = logos[idx + 1]
                              logos[idx + 1] = temp
                              setLogoCloud({ ...logoCloud, logos })
                            }}
                            className="h-5 w-5 text-neutral-400 hover:text-black cursor-pointer text-[10px]"
                          >
                            ↓
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const logos = (logoCloud.logos || []).filter((_: any, i: number) => i !== idx)
                            setLogoCloud({ ...logoCloud, logos })
                          }}
                          className="h-5 w-5 text-red-500 hover:bg-red-500/10 self-center cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {(logoCloud.logos || []).length === 0 && (
                    <p className="text-xs text-neutral-400 italic text-center p-4 border border-dashed border-[#C5C4C2] rounded-xl col-span-full">
                      No brand logos configured yet.
                    </p>
                  )}
                </div>

                {/* Add Logo Box */}
                <div className="p-4 bg-[#00b259]/5 border border-[#00b259]/20 rounded-xl space-y-3 max-w-xl">
                  <span className="text-xs font-bold text-neutral-700 block">Add New Brand Logo</span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Brand Name</Label>
                      <Input
                        value={newLogoName}
                        onChange={(e) => setNewLogoName(e.target.value)}
                        placeholder="e.g. Tupperware"
                        className="bg-background h-9 text-xs border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Logo Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newLogoImage}
                          onChange={(e) => setNewLogoImage(e.target.value)}
                          placeholder="Paste image link or upload..."
                          className="bg-background h-9 text-xs border-[#C5C4C2] flex-1 font-mono text-[10px]"
                        />
                        <label className="h-9 px-2 border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 flex items-center justify-center text-[10px] font-semibold cursor-pointer shrink-0 rounded">
                          {isUploadingLogo ? '...' : 'Upload'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            disabled={isUploadingLogo}
                            onChange={handleLogoImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      if (!newLogoName.trim() || !newLogoImage.trim()) return
                      const logos = [...(logoCloud.logos || []), { name: newLogoName.trim(), image: newLogoImage.trim() }]
                      setLogoCloud({ ...logoCloud, logos })
                      setNewLogoName('')
                      setNewLogoImage('')
                    }}
                    className="h-9 gap-1.5 px-4 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs"
                  >
                    <Plus className="h-4 w-4" /> Add Logo to Marquee
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#C5C4C2]/30 bg-neutral-50/50 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveLogoCloud} disabled={savingLogoCloud} className="gap-2 px-6 rounded-lg bg-[#00b259] text-white hover:bg-[#009b4d] cursor-pointer font-bold text-xs">
                {savingLogoCloud && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Logo Cloud Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


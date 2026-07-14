'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { updateSiteSectionAction } from '../cms-actions'
import SolutionForm from './solution-form'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Eye, Save, Trash2, Plus, Edit, Globe, X, Check,
  ArrowLeft, ArrowUp, ArrowDown, ExternalLink, Search, Filter,
  ChevronLeft, ChevronRight, MessageSquare, Copy, Edit2, RotateCcw, HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProblemSection {
  description: string
  bullets: string[]
}

interface FeatureModule {
  title: string
  description: string
  bullets: string[]
}

interface FAQItem {
  question: string
  answer: string
}

interface Solution {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: string
  link: string
  previewType: string
  
  // Custom Detailed Fields
  metric?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  ogImage?: string
  
  problemSection?: ProblemSection
  features?: FeatureModule[]
  integrations?: string[]
  benchmarkResults?: string
  caseStudy?: string
  faqs?: FAQItem[]
  useCases?: string[]

  // WordPress Mock Fields
  status?: string
  seoScore?: number
  created_at?: string
  focusKeyword?: string
  schemaStatus?: string
  linksCount?: string
}

interface SolutionsManagerClientProps {
  initialSolutions: Solution[]
}

export default function SolutionsManagerClient({ initialSolutions }: SolutionsManagerClientProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Normalize solutions to have mock WP fields if missing
  const normalizeSolutions = (sols: Solution[]): Solution[] => {
    if (!Array.isArray(sols)) return []
    return sols
      .filter(sol => sol !== null && sol !== undefined)
      .map((sol, index) => {
        const seoKeywords = typeof sol.seoKeywords === 'string' 
          ? sol.seoKeywords 
          : Array.isArray(sol.seoKeywords) 
            ? (sol.seoKeywords as string[]).join(', ') 
            : ''
            
        const title = sol.title || 'Untitled Solution'
        const focusKeyword = sol.focusKeyword || seoKeywords.split(',')[0]?.trim() || title.split(' ')[0]

        return {
          ...sol,
          id: sol.id || `solution-${index}`,
          title,
          status: sol.status || 'published',
          seoScore: sol.seoScore !== undefined ? sol.seoScore : 70 + (index * 4) % 30, // 70 to 98
          created_at: sol.created_at || new Date(2026, 3, 17, 13, 15 + index * 45).toISOString(),
          seoKeywords,
          focusKeyword,
          schemaStatus: sol.schemaStatus || (index % 2 === 0 ? 'On' : 'Off'),
          linksCount: sol.linksCount || '0 | 0 | 0',
          previewType: sol.previewType || 'default'
        }
      })
  }

  const [solutions, setSolutions] = useState<Solution[]>(() => normalizeSolutions(initialSolutions))
  
  // Navigation states
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  
  // UI states
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedSeo, setSelectedSeo] = useState('all')

  // Checked Rows for Bulk Actions
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState('')

  // Quick Edit state
  const [quickEditSolution, setQuickEditSolution] = useState<Solution | null>(null)
  const [quickEditForm, setQuickEditForm] = useState({
    title: '',
    slug: '',
    status: 'published',
    focusKeyword: '',
    metric: '',
    shortDesc: ''
  })
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const handleSaveAll = async (updatedList: Solution[]) => {
    setSaving(true)
    try {
      const res = await updateSiteSectionAction('solutions_list', updatedList)
      if (res.error) {
        showToast('error', res.error)
      } else {
        showToast('success', 'Solutions config saved successfully!')
      }
    } catch (err: any) {
      console.error('Error saving solutions:', err)
      showToast('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // Row reordering (Autosaved)
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= solutions.length) return
    const updated = [...solutions]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setSolutions(updated)
    handleSaveAll(updated)
  }

  // Soft Delete / Trash Solution
  const handleMoveToTrash = (index: number) => {
    const updated = [...solutions]
    const solution = updated[index]
    
    if (solution.status === 'trash') {
      if (confirm(`Are you sure you want to delete solution "${solution.title}" permanently?`)) {
        const filtered = updated.filter((_, i) => i !== index)
        setSolutions(filtered)
        handleSaveAll(filtered)
        showToast('success', 'Solution permanently deleted!')
      }
    } else {
      solution.status = 'trash'
      setSolutions(updated)
      handleSaveAll(updated)
      showToast('success', 'Solution moved to Trash.')
    }
    setCheckedIds([])
  }

  // Restore Solution
  const handleRestore = (index: number) => {
    const updated = [...solutions]
    updated[index].status = 'draft'
    setSolutions(updated)
    handleSaveAll(updated)
    showToast('success', 'Solution restored from Trash.')
    setCheckedIds([])
  }

  // Duplicate Solution
  const handleDuplicate = (index: number) => {
    const source = solutions[index]
    const newSlug = `${source.id}-copy`
    
    if (solutions.some(s => s.id === newSlug)) {
      return alert(`Duplication failed: Slug "${newSlug}" already exists.`)
    }

    const duplicated: Solution = {
      ...source,
      id: newSlug,
      title: `${source.title} (Copy)`,
      status: 'draft',
      created_at: new Date().toISOString()
    }

    const updated = [...solutions]
    updated.splice(index + 1, 0, duplicated)
    setSolutions(updated)
    handleSaveAll(updated)
    showToast('success', 'Solution duplicated as Draft!')
  }

  // Apply Bulk Action
  const handleApplyBulkAction = () => {
    if (!bulkAction || checkedIds.length === 0) return

    if (confirm(`Are you sure you want to apply "${bulkAction}" to ${checkedIds.length} item(s)?`)) {
      const updated = solutions.map(sol => {
        if (checkedIds.includes(sol.id)) {
          if (bulkAction === 'trash') return { ...sol, status: 'trash' }
          if (bulkAction === 'publish') return { ...sol, status: 'published' }
          if (bulkAction === 'draft') return { ...sol, status: 'draft' }
          if (bulkAction === 'restore') return { ...sol, status: 'draft' }
        }
        return sol
      })

      if (bulkAction === 'delete-permanent') {
        const filtered = solutions.filter(sol => !checkedIds.includes(sol.id) || sol.status !== 'trash')
        setSolutions(filtered)
        handleSaveAll(filtered)
        showToast('success', 'Selected items deleted permanently!')
      } else {
        setSolutions(updated)
        handleSaveAll(updated)
        showToast('success', `Bulk action "${bulkAction}" applied successfully!`)
      }
      setCheckedIds([])
      setBulkAction('')
    }
  }

  // Quick Edit Dialog triggers
  const handleOpenQuickEdit = (sol: Solution) => {
    setQuickEditSolution(sol)
    setQuickEditForm({
      title: sol.title,
      slug: sol.id,
      status: sol.status || 'published',
      focusKeyword: sol.focusKeyword || '',
      metric: sol.metric || '',
      shortDesc: sol.shortDesc || ''
    })
  }

  const handleSaveQuickEdit = () => {
    if (!quickEditSolution) return
    if (!quickEditForm.title.trim()) return alert('Title is required.')
    if (!quickEditForm.slug.trim()) return alert('Slug is required.')

    const cleanedSlug = quickEditForm.slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    if (solutions.some(s => s.id === cleanedSlug && s.id !== quickEditSolution.id)) {
      return alert(`A solution with slug ID "${cleanedSlug}" already exists.`)
    }

    const updated = solutions.map(sol => {
      if (sol.id === quickEditSolution.id) {
        return {
          ...sol,
          id: cleanedSlug,
          title: quickEditForm.title.trim(),
          status: quickEditForm.status,
          focusKeyword: quickEditForm.focusKeyword.trim(),
          metric: quickEditForm.metric.trim(),
          shortDesc: quickEditForm.shortDesc.trim(),
          link: sol.link.startsWith('/solutions/') ? `/solutions/${cleanedSlug}` : sol.link
        }
      }
      return sol
    })

    setSolutions(updated)
    setQuickEditSolution(null)
    handleSaveAll(updated)
    showToast('success', 'Solution updated via Quick Edit!')
  }

  // Save single solution from full Form
  const handleSolutionFormSave = (updatedSolution: Solution) => {
    let updatedList = [...solutions]
    if (isAdding) {
      if (solutions.some(s => s.id === updatedSolution.id)) {
        return alert(`A solution with Slug ID "${updatedSolution.id}" already exists.`)
      }
      updatedList = [...updatedList, {
        ...updatedSolution,
        status: updatedSolution.status || 'published',
        seoScore: updatedSolution.seoScore || 70,
        created_at: updatedSolution.created_at || new Date().toISOString(),
        focusKeyword: updatedSolution.focusKeyword || updatedSolution.seoKeywords?.split(',')[0]?.trim() || (updatedSolution.title || '').split(' ')[0],
        schemaStatus: updatedSolution.schemaStatus || 'On',
        linksCount: updatedSolution.linksCount || '0 | 0 | 0'
      }]
      setIsAdding(false)
    } else if (editingIndex !== null) {
      if (solutions.some((s, i) => i !== editingIndex && s.id === updatedSolution.id)) {
        return alert(`A solution with Slug ID "${updatedSolution.id}" already exists.`)
      }
      updatedList[editingIndex] = {
        ...updatedSolution,
        status: updatedSolution.status || solutions[editingIndex].status,
        seoScore: updatedSolution.seoScore || solutions[editingIndex].seoScore,
        created_at: updatedSolution.created_at || solutions[editingIndex].created_at,
        focusKeyword: updatedSolution.focusKeyword || solutions[editingIndex].focusKeyword,
        schemaStatus: updatedSolution.schemaStatus || solutions[editingIndex].schemaStatus,
        linksCount: updatedSolution.linksCount || solutions[editingIndex].linksCount
      }
      setEditingIndex(null)
    }
    setSolutions(updatedList)
    handleSaveAll(updatedList)
  }

  // Filter logics
  const filteredSolutions = solutions.filter(sol => {
    if (activeTab === 'published' && sol.status !== 'published') return false
    if (activeTab === 'draft' && sol.status !== 'draft') return false
    if (activeTab === 'trash' && sol.status !== 'trash') return false
    if (activeTab === 'all' && sol.status === 'trash') return false

    const query = searchQuery.toLowerCase().trim()
    if (query) {
      const matchTitle = sol.title.toLowerCase().includes(query)
      const matchDesc = sol.description.toLowerCase().includes(query)
      const matchKeywords = (sol.seoKeywords || '').toLowerCase().includes(query)
      if (!matchTitle && !matchDesc && !matchKeywords) return false
    }

    if (selectedType !== 'all' && sol.previewType !== selectedType) return false

    if (selectedSeo !== 'all') {
      const score = sol.seoScore || 0
      if (selectedSeo === 'good' && score < 80) return false
      if (selectedSeo === 'average' && (score < 50 || score >= 80)) return false
      if (selectedSeo === 'poor' && score >= 50) return false
    }

    return true
  })

  // Pagination bounds
  const totalItems = filteredSolutions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedSolutions = filteredSolutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Status Tab Counts
  const countAll = solutions.filter(s => s.status !== 'trash').length
  const countPublished = solutions.filter(s => s.status === 'published').length
  const countDrafts = solutions.filter(s => s.status === 'draft').length
  const countTrash = solutions.filter(s => s.status === 'trash').length

  // Checkbox functions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedIds(paginatedSolutions.map(s => s.id))
    } else {
      setCheckedIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setCheckedIds(prev => [...prev, id])
    } else {
      setCheckedIds(prev => prev.filter(rowId => rowId !== id))
    }
  }

  // Unique lists for Dropdown filters
  const getUniqueTypes = () => {
    const types = new Set<string>()
    solutions.forEach(s => {
      if (s.previewType) types.add(s.previewType)
    })
    return Array.from(types)
  }

  // Format Date for table
  const displayDate = (dateStr?: string) => {
    if (!isMounted || !dateStr) return '—'
    const date = new Date(dateStr)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    
    return `Published\n${yyyy}/${mm}/${dd} at ${hours}:${minutes} ${ampm}`
  }

  // SEO Score Badges Styling
  const getSeoBadgeStyle = (score?: number) => {
    if (!score) return 'bg-[#FFF9E6] text-amber-600 border border-amber-300'
    if (score >= 80) return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-extrabold shadow-xs'
    if (score >= 50) return 'bg-amber-500/10 text-amber-600 border border-amber-500/20 font-bold'
    return 'bg-red-500/10 text-red-650 border border-red-500/20 font-bold'
  }

  // Full editor navigation
  if (isAdding || editingIndex !== null) {
    const currentSolution = editingIndex !== null ? solutions[editingIndex] : undefined
    return (
      <SolutionForm
        initialSolution={currentSolution}
        onSave={handleSolutionFormSave}
        onCancel={() => {
          setEditingIndex(null)
          setIsAdding(false)
        }}
      />
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-black relative select-none">
      {/* Toast notifications */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3.5 rounded-xl shadow-xl text-sm font-semibold border transition-all duration-350 scale-100 ${
          toast.type === 'success' 
            ? 'bg-white border-green-500 text-green-750' 
            : 'bg-white border-red-500 text-red-650'
        }`}>
          {toast.type === 'success' ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
          {toast.msg}
        </div>
      )}

      {/* Page Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#C5C4C2]/50 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-800 font-display">AIS Solutions Page</h2>
          <p className="text-neutral-500 text-xs">
            Manage dynamic solutions landing pages and their navbar menu configurations.
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className={cn(buttonVariants({ size: 'default' }), 'flex items-center gap-1.5 self-start sm:self-auto shadow-xs bg-[#00b259] hover:bg-[#009b4d] text-white cursor-pointer h-10 px-5')}
        >
          <Plus className="h-4 w-4" />
          Create New Solution
        </Button>
      </div>

      {/* WordPress Navigation Counts Tabs */}
      <div className="flex flex-wrap gap-1.5 text-xs pb-3 text-neutral-500 select-none">
        <button
          onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 cursor-pointer",
            activeTab === 'all' ? "bg-[#00b259] text-white font-extrabold" : "bg-transparent hover:text-black"
          )}
        >
          All <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md", activeTab === 'all' ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500")}>{countAll}</span>
        </button>

        <button
          onClick={() => { setActiveTab('published'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 cursor-pointer",
            activeTab === 'published' ? "bg-[#00b259] text-white font-extrabold" : "bg-transparent hover:text-black"
          )}
        >
          Published <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md", activeTab === 'published' ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500")}>{countPublished}</span>
        </button>

        <button
          onClick={() => { setActiveTab('draft'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 cursor-pointer",
            activeTab === 'draft' ? "bg-[#00b259] text-white font-extrabold" : "bg-transparent hover:text-black"
          )}
        >
          Drafts <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md", activeTab === 'draft' ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500")}>{countDrafts}</span>
        </button>

        <button
          onClick={() => { setActiveTab('trash'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 cursor-pointer",
            activeTab === 'trash' ? "bg-[#00b259] text-white font-extrabold" : "bg-transparent hover:text-black"
          )}
        >
          Trash <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md", activeTab === 'trash' ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500")}>{countTrash}</span>
        </button>
      </div>

      {/* Main Card Directory */}
      <Card className="shadow-xs border border-[#C5C4C2]/50">
        <CardHeader className="pb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display">Solutions Directory</CardTitle>
            <CardDescription className="text-xs">
              Check focus keywords, audit schema types, and edit page layouts.
            </CardDescription>
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-10 w-full border-[#C5C4C2]"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Filters & Bulk Actions bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-y border-[#C5C4C2]/40 py-3.5 bg-neutral-50/50 px-3 rounded-lg">
            
            {/* Bulk actions */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <Select value={bulkAction} onValueChange={(val) => setBulkAction(val || '')} className="w-[180px]">
                <SelectTrigger className="w-full h-9 border-[#C5C4C2]">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  {activeTab !== 'trash' ? (
                    <>
                      <SelectItem value="publish">Publish</SelectItem>
                      <SelectItem value="draft">Move to Drafts</SelectItem>
                      <SelectItem value="trash">Move to Trash</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="restore">Restore Draft</SelectItem>
                      <SelectItem value="delete-permanent">Delete Permanently</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleApplyBulkAction}
                disabled={!bulkAction || checkedIds.length === 0}
                className="h-9 px-3 font-semibold border-[#C5C4C2]"
              >
                Apply
              </Button>
              {checkedIds.length > 0 && (
                <span className="text-[10px] text-neutral-500 font-bold bg-background px-2.5 py-1 rounded-md border border-[#C5C4C2]">
                  {checkedIds.length} items checked
                </span>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <div className="flex items-center gap-1 text-[10px] text-neutral-400 uppercase tracking-wide">
                <Filter className="h-3 w-3" /> Filters:
              </div>

              {/* Types */}
              <Select value={selectedType} onValueChange={(val) => { setSelectedType(val || 'all'); setCurrentPage(1); }} className="w-[140px]">
                <SelectTrigger className="w-full h-9 bg-background border-[#C5C4C2]">
                  <SelectValue placeholder="Show All Types" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectItem value="all">Show All Types</SelectItem>
                  {getUniqueTypes().map((ty, idx) => (
                    <SelectItem key={idx} value={ty}>{ty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* SEO Score Rank Math */}
              <Select value={selectedSeo} onValueChange={(val) => { setSelectedSeo(val || 'all'); setCurrentPage(1); }} className="w-[140px]">
                <SelectTrigger className="w-full h-9 bg-background border-[#C5C4C2]">
                  <SelectValue placeholder="Rank Math" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectItem value="all">Rank Math</SelectItem>
                  <SelectItem value="good">Good (80+)</SelectItem>
                  <SelectItem value="average">Average (50-79)</SelectItem>
                  <SelectItem value="poor">Poor (0-49)</SelectItem>
                </SelectContent>
              </Select>

              {(selectedType !== 'all' || selectedSeo !== 'all' || searchQuery) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedSeo('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="h-9 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-lg border border-[#C5C4C2]/50 bg-background overflow-hidden relative shadow-xs">
            <Table>
              <TableHeader className="bg-neutral-50/50">
                <TableRow className="border-b border-[#C5C4C2]/50">
                  <TableHead className="w-[45px] text-center">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300 text-[#00b259] focus:ring-[#00b259] scale-110 cursor-pointer"
                      checked={paginatedSolutions.length > 0 && checkedIds.length === paginatedSolutions.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="px-5 py-3 font-bold text-neutral-700 w-[35%]">Title</TableHead>
                  <TableHead className="px-5 py-3 font-bold text-neutral-700">Solution Tags</TableHead>
                  <TableHead className="px-4 py-3 font-bold text-neutral-700 text-center"><MessageSquare className="h-4.5 w-4.5 mx-auto" /></TableHead>
                  <TableHead className="px-5 py-3 font-bold text-neutral-700">Rocket Insights</TableHead>
                  <TableHead className="px-5 py-3 font-bold text-neutral-700">Date</TableHead>
                  <TableHead className="px-5 py-3 font-bold text-neutral-700">SEO Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSolutions.map((sol, pageIndex) => {
                  const globalIndex = solutions.findIndex(s => s.id === sol.id)
                  const isChecked = checkedIds.includes(sol.id)
                  const isQuickEditingThis = quickEditSolution?.id === sol.id

                  if (isQuickEditingThis) {
                    return (
                      <TableRow key={sol.id} className="bg-[#FFF9E6]/25 border-y border-amber-300/30 hover:bg-[#FFF9E6]/25">
                        <TableCell colSpan={7} className="px-6 py-5">
                          <div className="space-y-4 max-w-4xl font-sans">
                            <h4 className="font-bold text-[13px] text-amber-700 uppercase tracking-wide">Quick Edit</h4>
                            
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              <div className="space-y-1">
                                <Label className="text-[10px] font-bold text-neutral-500 uppercase">Title</Label>
                                <Input
                                  value={quickEditForm.title}
                                  onChange={(e) => setQuickEditForm({ ...quickEditForm, title: e.target.value })}
                                  className="h-9 border-neutral-300 bg-white text-xs text-neutral-800"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <Label className="text-[10px] font-bold text-neutral-500 uppercase">Slug handle</Label>
                                <Input
                                  value={quickEditForm.slug}
                                  onChange={(e) => setQuickEditForm({ ...quickEditForm, slug: e.target.value })}
                                  className="h-9 font-mono text-[11px] border-neutral-300 bg-white"
                                />
                              </div>

                              <div className="space-y-1">
                                <Label className="text-[10px] font-bold text-neutral-500 uppercase">Status</Label>
                                <Select 
                                  value={quickEditForm.status} 
                                  onValueChange={(val) => setQuickEditForm({ ...quickEditForm, status: val || 'published' })}
                                >
                                  <SelectTrigger className="w-full h-9 bg-white border-neutral-300 text-xs">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent className="text-black">
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-1 col-span-1 sm:col-span-3">
                                <Label className="text-[10px] font-bold text-neutral-500 uppercase">Focus Keyword (SEO)</Label>
                                <Input
                                  value={quickEditForm.focusKeyword}
                                  onChange={(e) => setQuickEditForm({ ...quickEditForm, focusKeyword: e.target.value })}
                                  className="h-9 border-neutral-300 bg-white text-xs"
                                  placeholder="Focus keyword to analyze SEO score"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-amber-250/30 pt-3">
                              <span className="text-[10px] text-neutral-400 italic font-normal">Quick Edit does not affect bento sections or detailed layouts.</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setQuickEditSolution(null)}
                                  className="h-8 text-xs border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer px-4.5 rounded-md"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="button"
                                  onClick={handleSaveQuickEdit}
                                  className="h-8 text-xs bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer px-5 rounded-md"
                                >
                                  Update Solution
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  }

                  return (
                    <TableRow
                      key={sol.id}
                      className={cn(
                        "hover:bg-neutral-50/50 group transition-all border-b border-[#C5C4C2]/30",
                        isChecked ? "bg-[#00b259]/5 hover:bg-[#00b259]/5" : ""
                      )}
                    >
                      {/* Checkbox */}
                      <TableCell className="text-center align-middle">
                        <input
                          type="checkbox"
                          className="rounded border-neutral-300 text-[#00b259] focus:ring-[#00b259] scale-110 cursor-pointer"
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(sol.id, e.target.checked)}
                        />
                      </TableCell>

                      {/* Title + Quick Actions */}
                      <TableCell className="align-middle py-3">
                        <div className="flex flex-col gap-0.5 max-w-[420px]">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-md bg-[#00b259]/10 flex items-center justify-center text-[#00b259] font-bold text-[10px] uppercase shrink-0">
                              {sol.icon?.substring(0, 2) || 'So'}
                            </div>
                            <div>
                              <span className="font-semibold text-neutral-800 text-sm leading-snug line-clamp-1 block">
                                {sol.title}
                              </span>
                              <span className="text-[10px] text-neutral-400 font-mono">
                                Slug: /solutions/{sol.id}
                              </span>
                            </div>
                          </div>

                          {/* Quick Actions hover menu */}
                          <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-[10px] font-bold select-none text-neutral-400">
                            {sol.status !== 'trash' ? (
                              <>
                                <button
                                  onClick={() => setEditingIndex(globalIndex)}
                                  className="text-[#00b259] hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                                <span>•</span>
                                <button
                                  onClick={() => handleOpenQuickEdit(sol)}
                                  className="text-amber-600 hover:underline cursor-pointer"
                                >
                                  Quick Edit
                                </button>
                                <span>•</span>
                                <button
                                  onClick={() => handleMoveToTrash(globalIndex)}
                                  className="text-red-500 hover:underline cursor-pointer"
                                >
                                  Trash
                                </button>
                                <span>•</span>
                                <button
                                  onClick={() => handleDuplicate(globalIndex)}
                                  className="text-[#00b259] hover:underline cursor-pointer"
                                >
                                  Duplicate
                                </button>
                                <span>•</span>
                                <Link
                                  href={`/solutions/${sol.id}`}
                                  target="_blank"
                                  className="text-neutral-500 hover:underline"
                                >
                                  View
                                </Link>
                                <span>•</span>
                                <button
                                  onClick={() => showToast('success', 'Cache cleared for this page!')}
                                  className="text-neutral-500 hover:underline cursor-pointer"
                                >
                                  Clear cache
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleRestore(globalIndex)}
                                  className="text-emerald-600 hover:underline cursor-pointer"
                                >
                                  Restore
                                </button>
                                <span>•</span>
                                <button
                                  onClick={() => handleMoveToTrash(globalIndex)}
                                  className="text-red-500 hover:underline cursor-pointer"
                                >
                                  Delete Permanently
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Solution Tags */}
                      <TableCell className="align-middle max-w-[150px]">
                        <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden">
                          {(() => {
                            const keywords = sol.seoKeywords 
                              ? sol.seoKeywords.split(',').map(k => k.trim()) 
                              : (sol.title || '').split(' ')
                            return keywords.slice(0, 3).map((keyword, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="px-1.5 text-[9px] font-bold bg-neutral-100 text-neutral-500 border border-[#C5C4C2]/30 rounded-xs uppercase tracking-wide truncate max-w-[85px]"
                              >
                                {keyword}
                              </Badge>
                            ))
                          })()}
                        </div>
                      </TableCell>

                      {/* Comments */}
                      <TableCell className="align-middle text-center text-neutral-400">
                        —
                      </TableCell>

                      {/* Insights */}
                      <TableCell className="align-middle text-xs">
                        <Link
                          href="https://pagespeed.web.dev"
                          target="_blank"
                          className="text-neutral-400 hover:text-black hover:underline flex items-center gap-0.5 text-xs font-semibold"
                        >
                          Test the page
                        </Link>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="align-middle text-xs font-bold text-neutral-600">
                        <div className="whitespace-pre-line leading-normal">
                          {displayDate(sol.created_at)}
                        </div>
                      </TableCell>

                      {/* SEO details */}
                      <TableCell className="align-middle py-2">
                        <div className="flex flex-col gap-1 border-l border-[#C5C4C2]/50 pl-3 py-0.5 font-sans leading-normal">
                          <div className="flex items-center gap-1.5">
                            <Badge className={cn("px-1.5 py-0.5 text-[9px] font-extrabold rounded-md shadow-xs border", getSeoBadgeStyle(sol.seoScore))}>
                              {sol.seoScore}/100
                            </Badge>
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                              Rank Math
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-500 truncate max-w-[140px] font-medium">
                            Keyword: <strong className="text-neutral-750 font-semibold">{sol.focusKeyword || 'Not Set'}</strong>
                          </div>
                          <div className="text-[9px] text-neutral-400 flex items-center gap-2 font-medium">
                            <span>Schema: <strong className="text-neutral-650 font-semibold">{sol.schemaStatus || 'Off'}</strong></span>
                            <span>{sol.linksCount ? `Links: ${sol.linksCount}` : 'Links: 0 | 0 | 0'}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}

                {paginatedSolutions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-neutral-500 font-medium italic">
                      No solutions found. Make a new one or modify your filter settings.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#C5C4C2]/50 pt-4 text-xs font-bold text-neutral-500 select-none">
              <span>
                Showing <strong>{Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}</strong> to <strong>{Math.min(totalItems, currentPage * itemsPerPage)}</strong> of <strong>{totalItems}</strong> solutions
              </span>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-[#C5C4C2]"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? 'default' : 'outline'}
                    className={cn("h-8 w-8 text-xs font-bold border-[#C5C4C2] rounded-md cursor-pointer", currentPage === idx + 1 ? "bg-[#00b259] hover:bg-[#009b4d] text-white border-[#00b259]" : "")}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-[#C5C4C2]"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

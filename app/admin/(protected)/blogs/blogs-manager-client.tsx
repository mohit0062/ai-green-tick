'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Sparkles,
  Copy,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { deleteBlog, restoreBlog, duplicateBlog, quickUpdateBlog } from './actions'
import { cn } from '@/lib/utils'

interface Blog {
  id: string
  created_at: string
  title: string
  slug: string
  description: string | null
  content: string | null
  author: string | null
  views: number | null
  category: string | null
  read_time: string | null
  author_role: string | null
  author_avatar: string | null
  image_url: string | null
  status: string | null
  meta_title: string | null
  meta_description: string | null
  focus_keyword: string | null
  seo_score: number | null
  tags: string[] | null
  categories: string[] | null
}

interface BlogsManagerClientProps {
  initialBlogs: Blog[]
}

export default function BlogsManagerClient({ initialBlogs }: BlogsManagerClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Tab filters ('all', 'published', 'draft', 'trash')
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all')

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')

  // Checked Rows for Bulk Actions
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  // Bulk Action selected
  const [bulkAction, setBulkAction] = useState('')

  // Quick Edit State
  const [quickEditBlog, setQuickEditBlog] = useState<Blog | null>(null)
  const [quickEditForm, setQuickEditForm] = useState({
    title: '',
    slug: '',
    status: 'published',
    category: '',
    tagsString: ''
  })
  const [quickEditError, setQuickEditError] = useState<string | null>(null)
  const [isQuickEditing, setIsQuickEditing] = useState(false)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Helper: Format Date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get months list dynamically from all blogs for filter dropdown
  const getUniqueMonths = () => {
    const months = new Set<string>()
    initialBlogs.forEach(blog => {
      const d = new Date(blog.created_at)
      const label = d.toLocaleString('default', { month: 'long', year: 'numeric' })
      months.add(label)
    })
    return Array.from(months)
  }

  // Get unique categories dynamically for filter dropdown
  const getUniqueCategories = () => {
    const cats = new Set<string>()
    initialBlogs.forEach(blog => {
      if (blog.category) cats.add(blog.category)
      if (blog.categories) {
        blog.categories.forEach(c => cats.add(c))
      }
    })
    return Array.from(cats)
  }

  // Filter & Search Logic
  const filteredBlogs = initialBlogs.filter(blog => {
    // 1. Tab Status Filter
    const status = blog.status || 'published'
    if (activeTab === 'published' && status !== 'published') return false
    if (activeTab === 'draft' && status !== 'draft') return false
    if (activeTab === 'trash' && status !== 'trash') return false
    // 'all' tab displays non-trash posts
    if (activeTab === 'all' && status === 'trash') return false

    // 2. Search query filter
    const query = searchQuery.toLowerCase().trim()
    if (query) {
      const matchesTitle = blog.title.toLowerCase().includes(query)
      const matchesDesc = (blog.description || '').toLowerCase().includes(query)
      const matchesKeyword = (blog.focus_keyword || '').toLowerCase().includes(query)
      if (!matchesTitle && !matchesDesc && !matchesKeyword) return false
    }

    // 3. Category Filter
    if (selectedCategory !== 'all') {
      const hasCat = blog.category === selectedCategory || 
                     (blog.categories || []).includes(selectedCategory)
      if (!hasCat) return false
    }

    // 4. Date/Month Filter
    if (selectedDate !== 'all') {
      const d = new Date(blog.created_at)
      const label = d.toLocaleString('default', { month: 'long', year: 'numeric' })
      if (label !== selectedDate) return false
    }

    return true
  })

  // Pagination bounds
  const totalItems = filteredBlogs.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Counts for Tabs
  const countAll = initialBlogs.filter(b => b.status !== 'trash').length
  const countPublished = initialBlogs.filter(b => b.status === 'published').length
  const countDrafts = initialBlogs.filter(b => b.status === 'draft').length
  const countTrash = initialBlogs.filter(b => b.status === 'trash').length

  // Checkbox interactions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedIds(paginatedBlogs.map(b => b.id))
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

  // Row operations
  const handleMoveToTrash = (id: string) => {
    if (confirm('Are you sure you want to move this post to trash?')) {
      startTransition(async () => {
        await deleteBlog(id)
        router.refresh()
      })
    }
  }

  const handleRestore = (id: string) => {
    startTransition(async () => {
      await restoreBlog(id)
      router.refresh()
    })
  }

  const handleDuplicate = (id: string) => {
    startTransition(async () => {
      await duplicateBlog(id)
      router.refresh()
    })
  }

  // Bulk Actions
  const handleApplyBulkAction = () => {
    if (!bulkAction || checkedIds.length === 0) return

    if (confirm(`Are you sure you want to execute this bulk action on ${checkedIds.length} checked item(s)?`)) {
      startTransition(async () => {
        for (const id of checkedIds) {
          if (bulkAction === 'trash') {
            await deleteBlog(id)
          } else if (bulkAction === 'restore') {
            await restoreBlog(id)
          } else if (bulkAction === 'delete-permanent') {
            await deleteBlog(id)
          }
        }
        setCheckedIds([])
        setBulkAction('')
        router.refresh()
      })
    }
  }

  // Quick Edit Dialog triggers
  const handleOpenQuickEdit = (blog: Blog) => {
    setQuickEditBlog(blog)
    setQuickEditForm({
      title: blog.title,
      slug: blog.slug,
      status: blog.status || 'published',
      category: blog.category || 'AI Automation',
      tagsString: (blog.tags || []).join(', ')
    })
    setQuickEditError(null)
  }

  const handleQuickEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuickEditForm(prev => {
      const updated = { ...prev, [name]: value }
      if (name === 'title') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      }
      return updated
    })
  }

  const handleSaveQuickEdit = async () => {
    if (!quickEditBlog) return
    setIsQuickEditing(true)
    setQuickEditError(null)

    try {
      const parsedTags = quickEditForm.tagsString
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const res = await quickUpdateBlog(quickEditBlog.id, {
        title: quickEditForm.title,
        slug: quickEditForm.slug,
        status: quickEditForm.status,
        category: quickEditForm.category,
        tags: parsedTags
      })

      if (res && res.error) {
        setQuickEditError(res.error)
      } else {
        setQuickEditBlog(null)
        router.refresh()
      }
    } catch (err: any) {
      setQuickEditError(err.message || 'Failed to update blog.')
    } finally {
      setIsQuickEditing(false)
    }
  }

  // SEO Score Badges Styling
  const getSeoBadgeStyle = (score: number | null) => {
    if (score === null || score === 0) return 'bg-neutral-100 text-neutral-400 border-neutral-200'
    if (score >= 81) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    if (score >= 51) return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
    return 'bg-destructive/10 text-destructive border-destructive/20'
  }

  return (
    <div className="space-y-6 relative font-sans text-black">
      {/* Page Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-800">AIS Blogs & Content</h2>
          <p className="text-neutral-500 text-xs">
            Write dynamic articles, configure meta tags, and audit SEO ranks.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className={cn(buttonVariants({ size: 'default' }), 'flex items-center gap-1.5 self-start sm:self-auto shadow-sm cursor-pointer')}
        >
          <Plus className="h-4 w-4" />
          Create New Post
        </Link>
      </div>

      {/* WordPress Navigation Counts Tabs */}
      <Tabs value={activeTab} onValueChange={(val: any) => { setActiveTab(val); setCurrentPage(1); }} className="w-fit mb-3">
        <TabsList className="bg-neutral-100 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white font-bold text-xs">
            All <span className="ml-1 text-[9px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded-md">{countAll}</span>
          </TabsTrigger>
          <TabsTrigger value="published" className="data-[state=active]:bg-white font-bold text-xs">
            Published <span className="ml-1 text-[9px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded-md">{countPublished}</span>
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-white font-bold text-xs">
            Drafts <span className="ml-1 text-[9px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded-md">{countDrafts}</span>
          </TabsTrigger>
          <TabsTrigger value="trash" className="data-[state=active]:bg-white font-bold text-xs">
            Trash <span className="ml-1 text-[9px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded-md">{countTrash}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="shadow-sm border border-neutral-200">
        <CardHeader className="pb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Article Directory</CardTitle>
            <CardDescription className="text-xs">
              Check focus keywords, audit schema types, and edit published articles.
            </CardDescription>
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search title, keyword..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-10 w-full border-neutral-200"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Filters & Bulk Actions bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-y border-neutral-200 py-3.5 bg-neutral-50/50 px-3 rounded-lg">
            {/* Bulk actions */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <Select value={bulkAction} onValueChange={(val) => setBulkAction(val || '')} className="w-[180px]">
                <SelectTrigger className="w-full h-9 border-neutral-200">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  {activeTab !== 'trash' ? (
                    <SelectItem value="trash">Move to Trash</SelectItem>
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
                disabled={!bulkAction || checkedIds.length === 0 || isPending}
                className="h-9 px-3 font-semibold border-neutral-200"
              >
                Apply
              </Button>
              {checkedIds.length > 0 && (
                <span className="text-[10px] text-neutral-500 font-bold bg-background px-2.5 py-1 rounded-md border border-neutral-200">
                  {checkedIds.length} items checked
                </span>
              )}
            </div>

            {/* Date and Category filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <div className="flex items-center gap-1 text-[10px] text-neutral-400 uppercase tracking-wide">
                <Filter className="h-3 w-3" /> Filters:
              </div>

              <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val || 'all'); setCurrentPage(1); }} className="w-[140px]">
                <SelectTrigger className="w-full h-9 bg-background border-neutral-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectItem value="all">All Categories</SelectItem>
                  {getUniqueCategories().map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDate} onValueChange={(val) => { setSelectedDate(val || 'all'); setCurrentPage(1); }} className="w-[140px]">
                <SelectTrigger className="w-full h-9 bg-background border-neutral-200">
                  <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectItem value="all">All dates</SelectItem>
                  {getUniqueMonths().map((month, idx) => (
                    <SelectItem key={idx} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedCategory !== 'all' || selectedDate !== 'all' || searchQuery) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDate('all');
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

          {/* Table */}
          <div className="rounded-lg border border-neutral-200 bg-background overflow-hidden relative shadow-sm">
            {isPending && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10 transition-all">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            )}
            <Table>
              <TableHeader className="bg-neutral-50/50">
                <TableRow className="border-b border-neutral-200">
                  <TableHead className="w-[45px] text-center">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300 text-primary focus:ring-primary scale-110 cursor-pointer accent-primary"
                      checked={paginatedBlogs.length > 0 && checkedIds.length === paginatedBlogs.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="w-[35%] font-bold text-neutral-700">Title</TableHead>
                  <TableHead className="font-bold text-neutral-700">Author</TableHead>
                  <TableHead className="font-bold text-neutral-700">Tags</TableHead>
                  <TableHead className="font-bold text-neutral-700">Categories</TableHead>
                  <TableHead className="font-bold text-neutral-700">Date</TableHead>
                  <TableHead className="font-bold text-neutral-700">SEO Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBlogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-neutral-500 font-medium italic">
                      No blog articles found. Make a new one or modify your filter settings.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBlogs.map((blog) => {
                    const isChecked = checkedIds.includes(blog.id)
                    const status = blog.status || 'published'

                    return (
                      <TableRow
                        key={blog.id}
                        className={cn(
                          "hover:bg-neutral-50/50 group transition-all border-b border-neutral-100",
                          isChecked ? "bg-primary/5 hover:bg-primary/5" : ""
                        )}
                      >
                        {/* Checkbox */}
                        <TableCell className="text-center align-middle">
                          <input
                            type="checkbox"
                            className="rounded border-neutral-300 text-primary focus:ring-primary scale-110 cursor-pointer accent-primary"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(blog.id, e.target.checked)}
                          />
                        </TableCell>

                        {/* Title and Actions */}
                        <TableCell className="align-middle py-3">
                          <div className="flex flex-col gap-0.5">
                            <span 
                              className="font-semibold text-neutral-800 text-sm leading-snug line-clamp-1 block max-w-[450px]"
                              title={blog.title}
                            >
                              {blog.title}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              Slug: {blog.slug}
                            </span>
                            
                            <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-[10px] font-bold select-none text-neutral-400">
                              {status !== 'trash' ? (
                                <>
                                  <Link
                                    href={`/admin/blogs/${blog.id}/edit`}
                                    className="text-primary hover:underline"
                                  >
                                    Edit
                                  </Link>
                                  <span>•</span>
                                  <button
                                    onClick={() => handleOpenQuickEdit(blog)}
                                    className="text-amber-600 hover:underline cursor-pointer"
                                  >
                                    Quick Edit
                                  </button>
                                  <span>•</span>
                                  <button
                                    onClick={() => handleMoveToTrash(blog.id)}
                                    className="text-destructive hover:underline cursor-pointer"
                                  >
                                    Trash
                                  </button>
                                  <span>•</span>
                                  <button
                                    onClick={() => handleDuplicate(blog.id)}
                                    className="text-sky-600 hover:underline cursor-pointer"
                                  >
                                    Duplicate
                                  </button>
                                  <span>•</span>
                                  <a
                                    href={`/blog/${blog.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-600 hover:underline"
                                  >
                                    View
                                  </a>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleRestore(blog.id)}
                                    className="text-emerald-600 hover:underline cursor-pointer"
                                  >
                                    Restore
                                  </button>
                                  <span>•</span>
                                  <button
                                    onClick={() => handleMoveToTrash(blog.id)}
                                    className="text-destructive hover:underline cursor-pointer"
                                  >
                                    Delete Permanently
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Author */}
                        <TableCell className="align-middle">
                          <div className="flex items-center gap-2">
                            <img
                              src={blog.author_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'}
                              alt={blog.author || 'Admin'}
                              className="h-7 w-7 rounded-full border border-[#C5C4C2]/50 bg-neutral-50"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-neutral-700">{blog.author || 'Admin'}</span>
                              <span className="text-[9px] text-neutral-400 leading-none">{blog.author_role || 'Editor'}</span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Tags */}
                        <TableCell className="align-middle max-w-[120px]">
                          {blog.tags && blog.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-h-[48px] overflow-hidden">
                              {blog.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="px-1.5 text-[9px] font-semibold bg-neutral-100 border-[#C5C4C2]/30 text-neutral-500 rounded-sm truncate max-w-[70px]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-neutral-300 text-xs">—</span>
                          )}
                        </TableCell>

                        {/* Categories */}
                        <TableCell className="align-middle max-w-[120px]">
                          {blog.categories && blog.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-h-[48px] overflow-hidden">
                              {blog.categories.map((cat, idx) => (
                                <Badge key={idx} variant="outline" className="px-1.5 text-[9px] font-bold border-[#00b259]/20 bg-[#00b259]/5 text-[#00b259] rounded-sm truncate max-w-[70px]">
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <Badge variant="secondary" className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm bg-neutral-100 text-neutral-500 border border-[#C5C4C2]/20">
                              {blog.category || 'General'}
                            </Badge>
                          )}
                        </TableCell>

                        {/* Date */}
                        <TableCell className="align-middle text-xs">
                          <div className="flex flex-col gap-0.5 font-bold">
                            <span className="text-neutral-700">{formatDate(blog.created_at)}</span>
                            <span className="text-[9px] flex items-center gap-1 font-extrabold uppercase">
                              {status === 'published' && <span className="text-emerald-500">Published</span>}
                              {status === 'draft' && <span className="text-amber-500">Draft</span>}
                              {status === 'trash' && <span className="text-destructive">Trash</span>}
                            </span>
                          </div>
                        </TableCell>

                        {/* SEO details */}
                        <TableCell className="align-middle py-2">
                          <div className="flex flex-col gap-1 border-l border-[#C5C4C2]/50 pl-3 py-0.5 font-sans leading-normal">
                            <div className="flex items-center gap-1.5">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "px-1.5 py-0.5 text-[9px] font-extrabold rounded-md shadow-sm border",
                                  getSeoBadgeStyle(blog.seo_score)
                                )}
                              >
                                {blog.focus_keyword ? `${blog.seo_score}/100` : 'N/A'}
                              </Badge>
                              <span className="text-[9px] text-neutral-400 flex items-center gap-0.5 font-bold">
                                <Eye className="h-3 w-3" /> {blog.views || 0}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-neutral-400 truncate max-w-[130px]">
                              Keyword: <strong className="text-neutral-700 font-sans">{blog.focus_keyword || 'Not Set'}</strong>
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-xs font-bold text-neutral-500 select-none">
              <span>
                Showing <strong>{Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}</strong> to <strong>{Math.min(totalItems, currentPage * itemsPerPage)}</strong> of <strong>{totalItems}</strong> articles
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-neutral-200"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8 text-xs font-bold border-neutral-200"
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-neutral-200"
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

      {/* Quick Edit Overlay Dialog */}
      {quickEditBlog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-background rounded-xl border border-neutral-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-1.5">
                  <Edit2 className="h-4 w-4 text-primary" />
                  Quick Edit Blog
                </h3>
                <p className="text-xs text-neutral-400">Modify essential blog attributes instantly.</p>
              </div>
              <button
                type="button"
                className="text-neutral-400 hover:text-black text-xl leading-none px-2 py-1 font-bold cursor-pointer"
                onClick={() => setQuickEditBlog(null)}
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              {quickEditError && (
                <div className="rounded-lg bg-destructive/15 border border-destructive/20 p-3 text-xs text-destructive font-medium flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {quickEditError}
                </div>
              )}

              <div className="space-y-1.5 text-xs font-bold">
                <Label htmlFor="quick-title">Article Title</Label>
                <Input
                  id="quick-title"
                  name="title"
                  value={quickEditForm.title}
                  onChange={handleQuickEditChange}
                  className="h-10 border-[#C5C4C2]"
                />
              </div>

              <div className="space-y-1.5 text-xs font-bold">
                <Label htmlFor="quick-slug" className="flex items-center gap-1">
                  URL Slug <span className="text-[10px] text-neutral-400">(Auto-updates)</span>
                </Label>
                <Input
                  id="quick-slug"
                  name="slug"
                  value={quickEditForm.slug}
                  onChange={handleQuickEditChange}
                  className="h-10 font-mono text-sm border-[#C5C4C2]"
                />
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-1.5 text-xs font-bold">
                  <Label htmlFor="quick-category">Primary Category</Label>
                  <Input
                    id="quick-category"
                    name="category"
                    value={quickEditForm.category}
                    onChange={handleQuickEditChange}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>

                <div className="space-y-1.5 text-xs font-bold">
                  <Label htmlFor="quick-status">Visibility Status</Label>
                  <Select
                    value={quickEditForm.status}
                    onValueChange={(val) => setQuickEditForm(prev => ({ ...prev, status: val || 'published' }))}
                  >
                    <SelectTrigger id="quick-status" className="h-10 border-[#C5C4C2]">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent className="text-black">
                      <SelectItem value="published">🟢 Published (Live)</SelectItem>
                      <SelectItem value="draft">🟡 Draft (Hidden)</SelectItem>
                      <SelectItem value="trash">🔴 Trash (Soft-Deleted)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-bold">
                <Label htmlFor="quick-tags">Tags (Comma-separated)</Label>
                <Input
                  id="quick-tags"
                  name="tagsString"
                  value={quickEditForm.tagsString}
                  onChange={handleQuickEditChange}
                  placeholder="e.g. Nextjs, Postgres, CMS"
                  className="h-10 border-neutral-200"
                />
                <p className="text-[9px] text-neutral-400 font-normal">Separate each tag badge with a standard comma (<code>,</code>).</p>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-neutral-200 bg-neutral-50/50 flex items-center justify-end gap-3 text-xs font-bold select-none">
              <Button
                type="button"
                variant="outline"
                onClick={() => setQuickEditBlog(null)}
                disabled={isQuickEditing}
                className="h-9 px-4 border-neutral-200"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveQuickEdit}
                disabled={isQuickEditing}
                className="h-9 px-4 font-semibold cursor-pointer"
              >
                {isQuickEditing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    Update Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

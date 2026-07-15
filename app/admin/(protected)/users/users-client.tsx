'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  updateAdminRoleAction, 
  deleteAdminAction, 
  createAdminAction,
  saveRolePermissionsAction,
  changePasswordAction
} from './user-actions'
import { getRoleLabel, getRoleBadgeClasses } from '@/utils/roles'
import { cn } from '@/lib/utils'
import { 
  Shield, UserPlus, Trash2, Search, Check, X, Loader2,
  ShieldCheck, ShieldAlert, Key, HelpCircle
} from 'lucide-react'

interface UsersClientProps {
  initialAdmins: any[]
  error?: string
  currentUserEmail: string
  initialPermissions: Record<string, string[]>
}

const PAGE_KEYS = [
  { path: '/admin',                 label: 'Dashboard Overview' },
  { path: '/admin/homepage',         label: 'Homepage CMS' },
  { path: '/admin/pricing',          label: 'Pricing CMS' },
  { path: '/admin/blogs',            label: 'Blogs List CMS' },
  { path: '/admin/features',         label: 'Features CMS' },
  { path: '/admin/solutions',        label: 'Solutions CMS' },
  { path: '/admin/about',            label: 'About CMS' },
  { path: '/admin/careers',          label: 'Careers CMS' },
  { path: '/admin/contact',          label: 'Contact CMS' },
  { path: '/admin/industries',       label: 'Industries CMS' },
  { path: '/admin/common-sections',  label: 'Common Sections' },
  { path: '/admin/users',            label: 'Admin Users (RBAC)' },
]

export default function UsersClient({ 
  initialAdmins, 
  error: initialError,
  currentUserEmail,
  initialPermissions
}: UsersClientProps) {
  const [admins, setAdmins] = useState(initialAdmins)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'admins' | 'permissions'>('admins')
  
  // Permissions Matrix States
  const [permissions, setPermissions] = useState<Record<string, string[]>>(initialPermissions)
  const [savingPermissions, setSavingPermissions] = useState(false)

  // Create Form States
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState<'super_admin' | 'admin' | 'editor'>('editor')
  const [creating, setCreating] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const handleRoleChange = async (email: string, newRoleValue: string) => {
    if (email === currentUserEmail) {
      alert("You cannot change your own role to prevent locking yourself out of the Super Admin dashboard!")
      return
    }

    setLoadingMap(prev => ({ ...prev, [email]: true }))
    try {
      const res = await updateAdminRoleAction(email, newRoleValue)
      if (res.error) {
        showStatus('error', res.error)
      } else {
        setAdmins(prev => 
          prev.map(a => a.email === email ? { ...a, role: newRoleValue } : a)
        )
        showStatus('success', `Role for ${email} updated successfully!`)
      }
    } catch (err: any) {
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setLoadingMap(prev => ({ ...prev, [email]: false }))
    }
  }

  const handleDelete = async (email: string) => {
    if (email === currentUserEmail) {
      alert("You cannot delete your own account!")
      return
    }

    if (!confirm(`Are you sure you want to remove ${email} from administrators list?`)) {
      return
    }

    setLoadingMap(prev => ({ ...prev, [email]: true }))
    try {
      const res = await deleteAdminAction(email)
      if (res.error) {
        showStatus('error', res.error)
      } else {
        setAdmins(prev => prev.filter(a => a.email !== email))
        showStatus('success', `${email} removed from administrators!`)
      }
    } catch (err: any) {
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setLoadingMap(prev => ({ ...prev, [email]: false }))
    }
  }

  const handleResetPassword = async (email: string) => {
    const newPass = prompt(`Enter new password for ${email}:`)
    if (newPass === null) return // cancelled
    if (newPass.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }
    
    setLoadingMap(prev => ({ ...prev, [email]: true }))
    try {
      const res = await changePasswordAction(email, newPass)
      if (res.error) {
        showStatus('error', res.error)
      } else {
        showStatus('success', `Password for ${email} updated successfully!`)
      }
    } catch (err: any) {
      showStatus('error', err.message || 'Failed to update password.')
    } finally {
      setLoadingMap(prev => ({ ...prev, [email]: false }))
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim() || !newName.trim() || !newPassword.trim()) return

    setCreating(true)
    try {
      const res = await createAdminAction(newEmail.trim().toLowerCase(), newName.trim(), newRole, newPassword.trim())
      if (res.error) {
        showStatus('error', res.error)
      } else {
        setAdmins(prev => [
          ...prev,
          {
            email: newEmail.trim().toLowerCase(),
            name: newName.trim(),
            role: newRole,
            avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=Admin_${newName.replace(/\s+/g, '')}`
          }
        ])
        setNewEmail('')
        setNewName('')
        setNewPassword('')
        setNewRole('editor')
        showStatus('success', `New administrator added successfully!`)
      }
    } catch (err: any) {
      showStatus('error', err.message || 'Failed to add admin.')
    } finally {
      setCreating(false)
    }
  }

  const handleTogglePermission = (path: string, role: string) => {
    setPermissions(prev => {
      const allowed = prev[path] || []
      const updated = allowed.includes(role)
        ? allowed.filter(r => r !== role)
        : [...allowed, role]
      return {
        ...prev,
        [path]: updated
      }
    })
  }

  const handleSavePermissions = async () => {
    setSavingPermissions(true)
    try {
      const res = await saveRolePermissionsAction(permissions)
      if (res.error) {
        showStatus('error', res.error)
      } else {
        showStatus('success', 'Role permission matrix saved successfully!')
      }
    } catch (err: any) {
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSavingPermissions(false)
    }
  }

  const filteredAdmins = admins.filter(admin => 
    (admin.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (admin.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-neutral-800 select-none">
      
      {/* Toast banner */}
      {statusMsg && (
        <div
          className={cn(
            "fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300",
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
              : 'bg-destructive/10 text-destructive border-destructive/20'
          )}
        >
          {statusMsg.type === 'success' ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-destructive" />}
          <span className="text-sm font-medium">{statusMsg.text}</span>
        </div>
      )}

      {/* Tabs bar */}
      <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-fit select-none">
        <TabsList className="bg-neutral-100 p-1">
          <TabsTrigger value="admins" className="data-[state=active]:bg-white font-bold text-xs">
            Administrators
          </TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-white font-bold text-xs">
            Permissions Matrix
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === 'admins' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left panel: Admins List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-primary" /> Active Administrators
                  </CardTitle>
                  <CardDescription className="text-[10px]">Verify roles, update system elevation parameters, and delete profiles.</CardDescription>
                </div>
                <Badge className="bg-neutral-100 text-neutral-800 border-neutral-200 border hover:bg-neutral-100 font-bold font-mono text-[10px] py-0.5">
                  Total: {admins.length}
                </Badge>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="Search admins by name or email..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 text-xs h-9 border-neutral-200 rounded-md"
                  />
                </div>

                {/* List */}
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto bg-white">
                    {filteredAdmins.map((admin) => {
                      const isLoading = !!loadingMap[admin.email]
                      const isCurrent = admin.email === currentUserEmail

                      return (
                        <div key={admin.email} className={cn("p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-neutral-50/50", isCurrent && "bg-neutral-50/20")}>
                          <div className="flex gap-3 items-center min-w-0">
                            <div className="h-10 w-10 border border-neutral-200 bg-neutral-100 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                              {admin.avatar ? (
                                <img src={admin.avatar} alt={admin.name} className="h-full w-full object-cover" />
                              ) : (
                                <span className="font-bold text-neutral-500 font-display text-sm">
                                  {(admin.name || 'A').charAt(0)}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-neutral-850 truncate">{admin.name || 'No Name'}</span>
                                {isCurrent && <Badge className="bg-neutral-200 text-neutral-700 hover:bg-neutral-200 text-[8px] font-bold px-1 py-0 border select-none rounded">You</Badge>}
                              </div>
                              <span className="text-[10px] text-neutral-450 block truncate font-mono mt-0.5">{admin.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <div className="flex items-center gap-1.5">
                              <Select
                                value={admin.role}
                                disabled={isLoading || isCurrent}
                                onValueChange={(val) => handleRoleChange(admin.email, val)}
                              >
                                <SelectTrigger 
                                  className={cn(
                                    "text-[10px] font-extrabold h-7 px-2.5 rounded-md border cursor-pointer bg-white w-28 disabled:cursor-not-allowed disabled:opacity-50 shadow-xs",
                                    getRoleBadgeClasses(admin.role)
                                  )}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="text-black">
                                  <SelectItem value="super_admin">Super Admin</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="editor">Editor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <Button
                              onClick={() => handleResetPassword(admin.email)}
                              disabled={isLoading}
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-neutral-450 hover:text-amber-500 hover:bg-amber-50 cursor-pointer"
                              title="Set Password"
                            >
                              <Key className="h-3.5 w-3.5" />
                            </Button>

                            <Button
                              onClick={() => handleDelete(admin.email)}
                              disabled={isLoading || isCurrent}
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-7 w-7 text-neutral-400 hover:text-red-500 hover:bg-red-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                              )}
                            >
                              {isLoading ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )
                    })}

                    {filteredAdmins.length === 0 && (
                      <p className="text-xs text-neutral-400 italic text-center p-8 select-none">
                        No administrators found matching your search.
                      </p>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right panel: Add Admin */}
          <div className="space-y-6">
            <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4">
                <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <UserPlus className="h-4 w-4 text-primary" /> Add Administrator
                </CardTitle>
                <CardDescription className="text-[10px]">Add profile details. The user must log in using Supabase Auth with this email.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 bg-white select-none">
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-neutral-600 uppercase">Admin Name</Label>
                    <Input
                      required
                      placeholder="e.g. John Doe"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="h-8.5 text-xs border-neutral-200 font-normal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-neutral-600 uppercase">Admin Email</Label>
                    <Input
                      required
                      type="email"
                      placeholder="e.g. name@aigreentick.com"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      className="h-8.5 text-xs border-neutral-200 font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-neutral-600 uppercase">Set Password</Label>
                    <Input
                      required
                      type="password"
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="h-8.5 text-xs border-neutral-200 font-normal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-neutral-600 uppercase">System Elevation Role</Label>
                    <Select
                      value={newRole}
                      onValueChange={(val) => setNewRole(val as any)}
                    >
                      <SelectTrigger className="w-full bg-white border border-neutral-200 h-9 rounded-md text-neutral-800 text-xs cursor-pointer font-normal shadow-xs">
                        <SelectValue placeholder="Select elevation role..." />
                      </SelectTrigger>
                      <SelectContent className="text-black">
                        <SelectItem value="editor">Editor (Limited Page Editing)</SelectItem>
                        <SelectItem value="admin">Admin (All CMS Page Editing)</SelectItem>
                        <SelectItem value="super_admin">Super Admin (All Layouts & User Controls)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={creating}
                    className="w-full font-bold h-9 text-xs cursor-pointer rounded-md shadow-xs gap-1.5 mt-2"
                  >
                    {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                    Register Administrator
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                  <Key className="h-3.5 w-3.5 text-amber-500" /> Dynamic Guideline Note
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-[10.5px] text-neutral-500 font-normal space-y-3 select-none leading-relaxed border-neutral-200">
                <p>
                  Permissions for each role can now be fully configured inside the <strong>Permissions Matrix</strong> tab above! 
                </p>
                <p className="text-[10px] text-neutral-400">
                  Super Admins can check/uncheck access criteria dynamically and save configuration. The routing and sidebar navigations update immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Permissions matrix panel */
        <div className="space-y-6">
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-primary" /> Role Permissions Matrix
                </CardTitle>
                <CardDescription className="text-[10px]">
                  Decide which sections and pages are accessible to Admin and Editor roles. Super Admins always retain full control.
                </CardDescription>
              </div>
              <Button
                onClick={handleSavePermissions}
                disabled={savingPermissions}
                className="font-bold h-9 px-4 cursor-pointer text-xs rounded-md shadow-sm gap-1.5 shrink-0 self-end sm:self-center"
              >
                {savingPermissions ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                Save Permissions Map
              </Button>
            </CardHeader>
            <CardContent className="p-5">
              <div className="border border-neutral-200 rounded-lg overflow-hidden shadow-xs">
                <Table>
                  <TableHeader className="bg-neutral-50/50">
                    <TableRow className="border-b border-neutral-200">
                      <TableHead className="font-bold text-neutral-700">CMS Panel Section</TableHead>
                      <TableHead className="font-bold text-neutral-700">Target Route</TableHead>
                      <TableHead className="font-bold text-neutral-700 text-center w-24">Super Admin</TableHead>
                      <TableHead className="font-bold text-neutral-700 text-center w-24">Admin</TableHead>
                      <TableHead className="font-bold text-neutral-700 text-center w-24">Editor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PAGE_KEYS.map((page) => {
                      const allowedRoles = permissions[page.path] || []
                      const hasAdmin = allowedRoles.includes('admin')
                      const hasEditor = allowedRoles.includes('editor')

                      return (
                        <TableRow key={page.path} className="hover:bg-neutral-50/50 border-b border-neutral-100">
                          <TableCell className="font-bold text-neutral-800 py-3.5">{page.label}</TableCell>
                          <TableCell className="font-mono text-xs text-neutral-450">{page.path}</TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={true}
                              disabled={true}
                              className="h-4 w-4 accent-primary rounded border-neutral-300 opacity-60 cursor-not-allowed inline-block align-middle"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={hasAdmin}
                              disabled={page.path === '/admin'}
                              onChange={() => handleTogglePermission(page.path, 'admin')}
                              className="h-4 w-4 accent-primary rounded border-neutral-300 cursor-pointer inline-block align-middle"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={hasEditor}
                              disabled={page.path === '/admin'}
                              onChange={() => handleTogglePermission(page.path, 'editor')}
                              className="h-4 w-4 accent-primary rounded border-neutral-300 cursor-pointer inline-block align-middle"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

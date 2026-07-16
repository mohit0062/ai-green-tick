import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, Layers } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function countRows(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string
): Promise<number> {
  try {
    const { count } = await supabase.from(table).select('*', { count: 'exact', head: true })
    return count ?? 0
  } catch (err) {
    console.error(`Error fetching ${table} count:`, err)
    return 0
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [blogCount, adminCount, sectionCount] = await Promise.all([
    countRows(supabase, 'blogs'),
    countRows(supabase, 'admin'),
    countRows(supabase, 'site_sections'),
  ])

  const stats = [
    { label: 'Total Blogs', value: blogCount, hint: 'Managed via Supabase CMS', icon: FileText },
    { label: 'Admin Users', value: adminCount, hint: 'Accounts with panel access', icon: Users },
    { label: 'Content Sections', value: sectionCount, hint: 'Editable CMS site sections', icon: Layers },
  ]

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800">Admin Dashboard</h2>
        <p className="text-neutral-500 text-sm">Quick overview of your content and statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, hint, icon: Icon }) => (
          <Card key={label} className="border border-neutral-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-neutral-600">{label}</CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-800">{value}</div>
              <p className="text-xs text-neutral-500 mt-1">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

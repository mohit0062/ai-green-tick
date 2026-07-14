import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  let blogCount = 0
  try {
    const { count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })
    if (count) blogCount = count
  } catch (err) {
    console.error('Error fetching blogs count:', err)
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800">Admin Dashboard</h2>
        <p className="text-neutral-500 text-sm">Quick overview of your content and statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-[#C5C4C2]/50 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-neutral-600">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-[#00b259]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neutral-800">{blogCount}</div>
            <p className="text-xs text-neutral-500 mt-1">Managed via Supabase CMS</p>
          </CardContent>
        </Card>

        <Card className="border border-[#C5C4C2]/50 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-neutral-600">Active Users</CardTitle>
            <Users className="h-4 w-4 text-[#00b259]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neutral-800">1</div>
            <p className="text-xs text-neutral-500 mt-1">Admin accounts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

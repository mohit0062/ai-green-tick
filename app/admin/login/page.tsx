import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-background p-8 shadow-sm border border-[#C5C4C2]/40">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground font-display">
            AI Greentick Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground font-sans">
            Sign in to access your dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" action={login}>
          {resolvedSearchParams?.error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center font-sans font-medium border border-destructive/20">
              Invalid email or password. Please try again.
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-xs">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-11 border-[#C5C4C2]"
                placeholder="admin@aigreentick.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="h-11 border-[#C5C4C2]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full h-11 text-base bg-[#00b259] hover:bg-[#009b4d] text-white">
              Sign in to Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

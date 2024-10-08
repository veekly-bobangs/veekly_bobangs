import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(req: NextRequest) {
  return updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    // Dont auth public API endpoints like login, register, forgot password
    `/((?!_next/static|_next/image|favicon.ico|api/login|api/register|api/forgot-password).*)`,
  ],
}

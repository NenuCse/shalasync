// ============================================================
// Next.js Middleware — Admin Route Protection
// This file MUST be named middleware.ts and placed in /src/
// It refreshes the Supabase session cookie on every request
// to /admin/* so server components can read the auth state.
// ============================================================

import { updateSession } from '@/lib/supabase/middleware';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run on all /admin/* routes
    '/admin/:path*',
  ],
};

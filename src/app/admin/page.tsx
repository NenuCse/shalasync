import { redirect } from 'next/navigation';

// Admin pages must never be statically prerendered — they require auth
export const dynamic = 'force-dynamic';

export default function AdminRoot() {
  redirect('/admin/dashboard');
}

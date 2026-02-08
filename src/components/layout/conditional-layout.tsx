'use client';

import { usePathname } from 'next/navigation';
import { AppLayout } from './app-layout';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't apply AppLayout on login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}

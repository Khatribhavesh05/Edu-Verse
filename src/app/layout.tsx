
import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ConditionalLayout } from '@/components/layout/conditional-layout';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'EduVerse',
  description: 'A futuristic learning platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50')}>
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster />
          </AuthProvider>
      </body>
    </html>
  );
}

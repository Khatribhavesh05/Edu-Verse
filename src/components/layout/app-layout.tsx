
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit, BookOpen, UserCircle } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';

import { navLinks } from '@/lib/constants';
import { FloatingChatbot } from '../floating-chatbot';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="bg-white/80 p-2 rounded-lg shadow-inner">
                <BrainCircuit className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-3xl font-black group-data-[collapsible=icon]:hidden text-brand-text">
                EduVerse
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={{ children: link.label }}
                  >
                    <Link href={link.href}>
                      <link.icon className="size-6" />
                      <span className="text-lg">{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter>
              <div className="flex items-center gap-3 p-2">
                 <BookOpen className="size-6 text-foreground/60" />
                 <span className="group-data-[collapsible=icon]:hidden text-foreground/60">Prototype</span>
              </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b bg-white/30 px-4 backdrop-blur-xl md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-3">
                    <span className="text-lg font-bold text-brand-text">Welcome, Explorer!</span>
                    <UserCircle className="w-8 h-8 text-purple-500" />
                </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
        
        <FloatingChatbot />

      </div>
    </SidebarProvider>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrainCircuit, BookOpen, UserCircle, Trophy, Flame, Gamepad2, Heart, Volume2, VolumeX } from 'lucide-react';
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
import { LogoutButton } from '../logout-button';
import { playClickSound, toggleSoundMute, isSoundMuted } from '@/lib/sound-effects';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load mute state on mount
    setIsMuted(isSoundMuted());
  }, []);

  const handleSoundToggle = () => {
    const newMutedState = toggleSoundMute();
    setIsMuted(newMutedState);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const button = e.currentTarget;
    
    // Play click sound
    playClickSound();
    
    // Remove animation class
    button.classList.remove('shine-animate');
    
    // Force reflow to restart animation
    void button.offsetWidth;
    
    // Add animation class back
    button.classList.add('shine-animate');
    
    setTimeout(() => {
      router.push(href);
    }, 600);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
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
                    <Link href={link.href} onClick={playClickSound}>
                      <link.icon className="size-6" />
                      <span className="text-lg">{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter className="border-t border-foreground/10 p-3 space-y-2">
              <div className="flex items-center gap-3 p-2">
                 <BookOpen className="size-6 text-foreground/60" />
                 <span className="group-data-[collapsible=icon]:hidden text-sm text-foreground/60">Prototype</span>
              </div>
              <LogoutButton />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b bg-white/30 px-4 backdrop-blur-xl md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1 max-w-4xl justify-between">
                  <button 
                    onClick={(e) => handleButtonClick(e, '/achievements')}
                    className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:shadow-purple-400/60 hover:scale-[1.03] transition-all duration-200 ease-out"
                  >
                    <div className="absolute inset-0 shine-layer"></div>
                    <Trophy className="w-5 h-5 relative z-10" />
                    <span className="hidden sm:inline relative z-10">My Achievements</span>
                  </button>
                  <button 
                    onClick={(e) => handleButtonClick(e, '/mini-games')}
                    className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-md hover:shadow-lg hover:shadow-cyan-400/60 hover:scale-[1.03] transition-all duration-200 ease-out"
                  >
                    <div className="absolute inset-0 shine-layer"></div>
                    <Gamepad2 className="w-5 h-5 relative z-10" />
                    <span className="hidden sm:inline relative z-10">Mini-Games</span>
                  </button>
                  <button 
                    onClick={(e) => handleButtonClick(e, '/streak')}
                    className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:shadow-orange-400/60 hover:scale-[1.03] transition-all duration-200 ease-out"
                  >
                    <div className="absolute inset-0 shine-layer"></div>
                    <Flame className="w-5 h-5 relative z-10" />
                    <span className="hidden sm:inline relative z-10">Streak!</span>
                  </button>
                  <button 
                    onClick={(e) => handleButtonClick(e, '/leaderboard')}
                    className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:shadow-pink-400/60 hover:scale-[1.03] transition-all duration-200 ease-out"
                  >
                    <div className="absolute inset-0 shine-layer"></div>
                    <Heart className="w-5 h-5 relative z-10" />
                    <span className="hidden sm:inline relative z-10">Leaderboard</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={handleSoundToggle}
                      className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <span className="text-lg font-bold text-brand-text">Welcome, Explorer!</span>
                    <UserCircle className="w-8 h-8 text-purple-500" />
                </div>
            </div>
          </header>
          <main className="flex-1 w-full p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
        
        <FloatingChatbot />

      </div>
    </SidebarProvider>
  );
}

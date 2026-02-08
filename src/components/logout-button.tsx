'use client';


import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    // Sign out from Firebase
    await signOut(auth);
    // Clear user session from localStorage
    localStorage.removeItem('eduverse_user');
    // Show logout toast
    toast({
      title: 'Logged out',
      description: 'You have been logged out of EduVerse.',
    });
    // Redirect to login page
    router.push('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className="w-full justify-start gap-2 text-foreground/70 hover:text-foreground hover:bg-foreground/10 rounded-lg"
    >
      <LogOut className="size-5" />
      <span className="group-data-[collapsible=icon]:hidden text-sm">Logout</span>
    </Button>
  );
}

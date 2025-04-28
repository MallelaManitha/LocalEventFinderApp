
'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const AuthStatus = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Sign out successful!",
      })
    } catch (error:any) {
        toast({
            variant: "destructive",
            title: "Failed to sign out.",
            description: error.message
          })
    }
  };

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2">
          <span>Hello, {user.displayName || user.email}</span>
          <Button size="sm" onClick={handleSignOut}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <Link href="/auth/login" className="text-primary mr-2">Login</Link>
          <Link href="/auth/register" className="text-primary">Register</Link>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabasePublic } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabasePublic.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabasePublic.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabasePublic.auth.signOut();
    location.reload();
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow bg-white border-b border-gray-200">
      <Link href="/" className="text-xl font-semibold text-blue-700">
        Clues by Sam Archive
      </Link>
      {user ? (
        <Button
          onClick={handleLogout}
          className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </Button>
      ) : (
        <Button asChild className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </nav>
  );
}

// app/login/page.tsx
'use client';
import { useState } from 'react';
import { supabasePublic } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabasePublic.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert(error.message);
    router.push('/');
  };

  return (
    <div className="h-full flex flex-grow items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-md min-w-md mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-4 font-bold text-center text-blue-700">
          Login
        </h2>

        {/* ✅ Form wrapper */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form reload
            handleLogin(); // Call your login handler
          }}
        >
          <Input
            type="email"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            className="w-full mb-4 p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

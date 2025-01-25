"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from 'next/link';
import Head from 'next/head';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    setIsClient(true);
    console.log("LoginPage component mounted");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("ログインに失敗しました", {
          description: "メールアドレスまたはパスワードが間違っています。"
        });
        console.error("Login failed:", result.error);
      } else {
        toast.success("ログインしました");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("ログイン中にエラーが発生しました", {
        description: error.message || "予期せぬエラーが発生しました。"
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Head>
        <title>Log In - Hugging Face Spaces</title>
      </Head>
      
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <span className="text-2xl">🤗</span> Log In
          </h1>
          <p className="text-gray-600 mt-2">Welcome back to the AI community</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9D00] hover:bg-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9D00]"
            >
              Log In
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-[#FF9D00] hover:text-[#FF8A00]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

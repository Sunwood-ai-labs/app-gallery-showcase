"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          カードショーケース
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              ホーム
            </Link>
            <Link href="/spaces" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              スペース一覧
            </Link>
            {status === 'authenticated' && session?.user ? (
              <>
                <Link href="/profile" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  プロフィール
                </Link>
                <Link href="/create-space" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  スペース作成
                </Link>
                <div className="flex items-center space-x-2">
                  {session?.user?.image && (
                    <Image
                      src={session?.user?.image}
                      alt="プロフィール画像" 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium">
                    {session.user.username || session.user.name || 'マイアカウント'}  
                  </span>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/signup" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  サインアップ
                </Link>
                <Link href="/login" className={buttonVariants({ variant: "default", size: "sm" })}>
                  ログイン
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

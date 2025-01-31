"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isClient) {
    return null;
  }

  const navbarOpacity = Math.min(0.9 + scrollPosition * 0.001, 1);

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, 
          rgba(255,255,255,${navbarOpacity}) 0%, 
          rgba(255,255,255,${navbarOpacity * 0.95}) 100%)`
      }}
    >
      {/* グラデーションアニメーション用のオーバーレイ */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-purple-100/20 to-indigo-100/20"
        style={{
          animation: 'gradient 15s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container mx-auto px-4 py-2 flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-800 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
          >
            <span>{siteConfig.emoji}</span>
            <span className="hidden md:inline">{siteConfig.name}</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/" 
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "transition-all duration-300 hover:text-primary-500 hover:bg-primary-50"
            )}
          >
            Home
          </Link>
          {status === 'authenticated' && session?.user ? (
            <>
              <Link 
                href="/create-space" 
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "transition-all duration-300 hover:bg-primary-600"
                )}
              >
                Create Space
              </Link>
              <Link 
                href="/analytics" 
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "transition-all duration-300 hover:text-primary-500 hover:bg-primary-50"
                )}
              >
                <span>📊</span>
                <span className="ml-1">Analysis</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <Image
                    src={session?.user?.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${session.user.username || session.user.id}`}
                    alt="Profile"
                    width={32}
                    height={32}
                    priority
                    className="rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                  />
                </Link>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "transition-all duration-300 hover:text-primary-500 hover:bg-primary-50"
                )}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "transition-all duration-300 hover:bg-primary-600"
                )}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-300"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              href="/" 
              className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300"
            >
              Home
            </Link>
            {status === 'authenticated' && session?.user ? (
              <>
                <Link 
                  href="/create-space" 
                  className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300"
                >
                  Create Space
                </Link>
                <Link 
                  href="/analytics" 
                  className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300"
                >
                  <span>📊</span>
                  <span className="ml-1">Analysis</span>
                </Link>
                <div className="flex items-center space-x-2 py-2">
                  <Link href="/profile">
                    <Image
                      src={session?.user?.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${session.user.username || session.user.id}`}
                      alt="Profile"
                      width={32}
                      height={32}
                      priority
                      className="rounded-full transition-transform duration-300 hover:scale-110"
                    />
                  </Link>
                  <span className="text-gray-700">{session.user.username || session.user.name}</span>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom border with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </nav>
  );
}

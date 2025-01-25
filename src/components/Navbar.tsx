"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-800 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
          >
            <span>🤗</span>
            <span className="hidden md:inline">Spaces</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/" 
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "transition-all duration-300 hover:text-primary-500 hover:bg-primary-50 transform hover:scale-105"
            )}
          >
            Home
          </Link>
          <Link 
            href="/spaces" 
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "transition-all duration-300 hover:text-primary-500 hover:bg-primary-50 transform hover:scale-105"
            )}
          >
            Spaces
          </Link>
          {status === 'authenticated' && session?.user ? (
            <>
              <Link 
                href="/create-space" 
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "transition-all duration-300 hover:bg-primary-600 transform hover:scale-105"
                )}
              >
                Create Space
              </Link>
              <div className="flex items-center space-x-2">
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image}
                    alt="Profile" 
                    width={32} 
                    height={32} 
                    className="rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                  />
                )}
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "transition-all duration-300 hover:text-primary-500 hover:bg-primary-50 transform hover:scale-105"
                )}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "transition-all duration-300 hover:bg-primary-600 transform hover:scale-105"
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
            className="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-300 transform hover:scale-110"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              href="/" 
              className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300 hover:text-primary-500"
            >
              Home
            </Link>
            <Link 
              href="/spaces" 
              className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300 hover:text-primary-500"
            >
              Spaces
            </Link>
            {status === 'authenticated' && session?.user ? (
              <>
                <Link 
                  href="/create-space" 
                  className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300 hover:text-primary-500"
                >
                  Create Space
                </Link>
                <div className="flex items-center space-x-2 py-2">
                  {session?.user?.image && (
                    <Image
                      src={session?.user?.image}
                      alt="Profile" 
                      width={32} 
                      height={32} 
                      className="rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                    />
                  )}
                  <span className="text-gray-700">{session.user.username || session.user.name}</span>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block py-2 text-gray-700 hover:bg-primary-50 rounded transition-colors duration-300 hover:text-primary-500"
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
    </nav>
  );
}

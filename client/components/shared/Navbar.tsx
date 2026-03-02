"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="QuickHire Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-gray-900">
                QuickHire
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/jobs"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Browse Companies
              </Link>
            </div>
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/admin/auth">
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium"
              >
                Login
              </Button>
            </Link>
            <Link href="/admin/auth">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium px-6 rounded-none">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
          <Link
            href="/jobs"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Browse Companies
          </Link>
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
            <Link href="/admin/auth">
              <Button
                variant="outline"
                className="w-full text-indigo-600 border-indigo-600"
              >
                Login
              </Button>
            </Link>
            <Link href="/admin/auth">
              <Button className="w-full bg-indigo-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import UserProfile from './user-profile'
import { useEffect, useState } from 'react'
import { createClient } from '../../supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="w-full bg-white backdrop-blur-md py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="flex items-center gap-2">
          <Image src="/fura-logo.png" alt="Fura Laundry" width={50} height={50} className="object-contain" />
          <div className="flex flex-col">
            <span className="text-lg font-bold font-grotesk text-[#0066CC] leading-tight">FURA</span>
            <span className="text-[10px] font-medium text-[#5A6A7A] leading-tight tracking-wider">LAUNDRY & DRY CLEANERS</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-[#5A6A7A] hover:text-[#0066CC] transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium text-[#5A6A7A] hover:text-[#0066CC] transition-colors">
            Services
          </Link>
          <Link href="/blog" className="text-sm font-medium text-[#5A6A7A] hover:text-[#0066CC] transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-[#5A6A7A] hover:text-[#0066CC] transition-colors">
            Our Story
          </Link>
          <Link href="/contact" className="text-sm font-medium text-[#5A6A7A] hover:text-[#0066CC] transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button size="sm" className="bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="text-[#1A2332] hover:text-[#0066CC]">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

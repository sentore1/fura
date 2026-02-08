'use client'

import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '../../supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { UserCircle, Home, ShoppingCart, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardNavbar() {
  const supabase = createClient()
  const router = useRouter()

  return (
    <nav className="w-full border-b border-border/50 bg-white/80 backdrop-blur-md py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch className="flex items-center gap-2">
            <Image src="/fura-logo.png" alt="Fura Laundry" width={32} height={32} className="object-contain" />
            <span className="text-lg font-bold font-grotesk text-[#0066CC]">FURA</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-sm text-[#5A6A7A] hover:text-[#0066CC] flex items-center gap-1">
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link href="/booking" className="text-sm text-[#5A6A7A] hover:text-[#0066CC] flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" /> Book
            </Link>
            <Link href="/tracking" className="text-sm text-[#5A6A7A] hover:text-[#0066CC] flex items-center gap-1">
              <Package className="w-4 h-4" /> Track
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6 text-[#5A6A7A]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={async () => {
                await supabase.auth.signOut()
                router.refresh()
              }}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

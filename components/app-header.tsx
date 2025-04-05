"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { Search, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "@/lib/stores/user-store"
import { useHasMounted } from "@/hooks/useHasMounted"

export function AppHeader() {
  const pathname = usePathname()
  const { notifications } = useUserStore()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const hasMounted = useHasMounted()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-center mx-auto">
        <div className="mr-4 hidden md:flex items-center justify-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="font-bold text-white">P</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">PARA</span>
          </Link>
          <MainNav />
        </div>
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500 hover:bg-blue-600">
                  {notifications}
                </Badge>
              )}
            </Button>
          </Link>
          <UserNav />
        </div>
      </div>
    </header>
  )
}


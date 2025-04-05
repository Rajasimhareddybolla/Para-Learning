"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, Home, Award, Headphones, Users, Calendar } from "lucide-react"

const navItems = [
  {
    title: "Home",
    href: "/profile",
    icon: Home,
  },
  {
    title: "Challenges",
    href: "/challenges",
    icon: Award,
  },
  {
    title: "Library",
    href: "/library",
    icon: Headphones,
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
]

export function SharedNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="font-bold text-white">P</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">PARA</span>
          </Link>
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn("mr-1 h-4 w-4 transition-transform group-hover:scale-110", isActive && "text-blue-500")}
                  />
                  {item.title}
                  {isActive && <div className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-blue-500" />}
                </Link>
              )
            })}
          </nav>
        </div>
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
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500 hover:bg-blue-600">
                0
              </Badge>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 
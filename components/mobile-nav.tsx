"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Award, Headphones, Users, Calendar, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStore } from "@/lib/stores/user-store"

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

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const { userLevel, paraCoins } = useUserStore()
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 sm:max-w-xs">
        <div className="px-7">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="font-bold text-white">P</span>
            </div>
            <span className="font-bold text-xl">PARA</span>
          </Link>
        </div>

        <div className="mt-6 px-7">
          <div className="flex items-center gap-3 mb-6">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jane Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Jane Doe</p>
              <p className="text-xs text-muted-foreground">
                Level {userLevel} • {paraCoins} Coins
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-medium transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "hover:bg-muted",
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-blue-500" : "text-muted-foreground")} />
                {item.title}
              </Link>
            )
          })}
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-7">
          <div className="flex flex-col gap-1">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-medium hover:bg-muted"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
              Settings
            </Link>
            <Link
              href="/logout"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-medium hover:bg-muted"
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
              Log Out
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


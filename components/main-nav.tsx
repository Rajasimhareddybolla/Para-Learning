"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Award, Headphones, Users, Calendar } from "lucide-react"

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

export function MainNav() {
  const pathname = usePathname()

  return (
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
  )
}


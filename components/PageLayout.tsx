"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useHasMounted } from "@/hooks/useHasMounted"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  centered?: boolean
  padding?: boolean
}

export function PageLayout({
  children,
  className,
  maxWidth = "xl",
  centered = true,
  padding = true,
}: PageLayoutProps) {
  const hasMounted = useHasMounted()

  // This prevents hydration mismatch
  if (!hasMounted) {
    return null
  }

  return (
    <div
      className={cn(
        "w-full min-h-screen",
        centered && "flex flex-col items-center justify-center",
        className
      )}
    >
      <div
        className={cn(
          "w-full",
          maxWidth === "sm" && "max-w-screen-sm",
          maxWidth === "md" && "max-w-screen-md",
          maxWidth === "lg" && "max-w-screen-lg",
          maxWidth === "xl" && "max-w-screen-xl",
          maxWidth === "2xl" && "max-w-screen-2xl",
          maxWidth === "full" && "",
          padding && "px-4 py-6 md:px-6 lg:px-8"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function CenteredContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col items-center justify-center w-full", className)}>{children}</div>
}

export function CardContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-card rounded-lg border shadow-sm p-6 w-full max-w-xl mx-auto", className)}>
      {children}
    </div>
  )
}

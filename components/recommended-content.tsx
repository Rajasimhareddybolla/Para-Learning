"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Headphones, Play, BookOpen, Music, Brain } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function RecommendedContent() {
  const recommendedItems = [
    {
      id: "1",
      title: "Morning Meditation",
      description: "Start your day with clarity and purpose",
      category: "meditation",
      duration: "10 min",
      image: "/rec/1.jpg?height=80&width=80",
    },
    {
      id: "2",
      title: "Productivity Principles",
      description: "Essential strategies for peak performance",
      category: "knowledge",
      duration: "20 min",
      image: "/rec/2.jpg?height=80&width=80",
    },
    {
      id: "3",
      title: "Deep Focus",
      description: "Binaural beats to enhance concentration",
      category: "focus",
      duration: "45 min",
      image: "/rec/3.jpg?height=80&width=80",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "meditation":
        return <Brain className="h-4 w-4" />
      case "knowledge":
        return <BookOpen className="h-4 w-4" />
      case "focus":
        return <Music className="h-4 w-4" />
      default:
        return <Headphones className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "meditation":
        return "from-blue-500 to-violet-600"
      case "knowledge":
        return "from-amber-500 to-orange-600"
      case "focus":
        return "from-emerald-500 to-green-600"
      default:
        return "from-blue-500 to-violet-600"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recommendedItems.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-sm transition-all hover:border-blue-200">
          <CardContent className="p-0">
            <div className="flex p-4">
              <div className="mr-4">
                <Avatar className="h-16 w-16 rounded-md">
                  <AvatarImage src={item.image} alt={item.title} />
                  <AvatarFallback
                    className={cn("rounded-md bg-gradient-to-br text-white", getCategoryColor(item.category))}
                  >
                    {item.category.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getCategoryIcon(item.category)}
                    <span>{item.duration}</span>
                  </Badge>

                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Headphones, Play, Search, BookOpen, Music, Dumbbell, Brain, Lock } from "lucide-react"
import { useUserStore } from "@/lib/stores/user-store"
import { AudioPlayer } from "@/components/audio-player"

export default function Library() {
  const { userLevel, paraCoins } = useUserStore()
  const [searchQuery, setSearchQuery] = useState("")

  const audioContent = [
    {
      id: "1",
      title: "Morning Meditation",
      description: "Start your day with clarity and purpose",
      category: "meditation",
      duration: "10 min",
      level: 1,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      title: "Deep Focus",
      description: "Binaural beats to enhance concentration",
      category: "focus",
      duration: "45 min",
      level: 1,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      title: "HIIT Workout",
      description: "High-intensity interval training session",
      category: "workout",
      duration: "20 min",
      level: 1,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "4",
      title: "Mindset Mastery",
      description: "Learn to overcome limiting beliefs",
      category: "knowledge",
      duration: "15 min",
      level: 2,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "5",
      title: "Sleep Meditation",
      description: "Gentle guidance into restful sleep",
      category: "meditation",
      duration: "30 min",
      level: 1,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "6",
      title: "Emotional Intelligence",
      description: "Develop awareness of your emotional patterns",
      category: "knowledge",
      duration: "25 min",
      level: 2,
      premium: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "7",
      title: "Breathwork Session",
      description: "Advanced breathing techniques for energy",
      category: "workout",
      duration: "15 min",
      level: 2,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "8",
      title: "Productivity Principles",
      description: "Essential strategies for peak performance",
      category: "knowledge",
      duration: "20 min",
      level: 1,
      premium: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "9",
      title: "Healing Soundscape",
      description: "Immersive sound journey for relaxation",
      category: "focus",
      duration: "60 min",
      level: 1,
      premium: true,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const [selectedAudio, setSelectedAudio] = useState<(typeof audioContent)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredContent = audioContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const isAccessible = item.level <= userLevel || !item.premium
    return matchesSearch && isAccessible
  })

  const handlePlayAudio = (audio: (typeof audioContent)[0]) => {
    setSelectedAudio(audio)
    setIsPlaying(true)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "meditation":
        return <Brain className="h-4 w-4" />
      case "workout":
        return <Dumbbell className="h-4 w-4" />
      case "knowledge":
        return <BookOpen className="h-4 w-4" />
      case "focus":
        return <Music className="h-4 w-4" />
      default:
        return <Headphones className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Audio & Knowledge Library</h1>
            <p className="text-gray-500">Explore guided content for your transformation journey</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search content..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="workout">Workouts</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <AudioCard
                  key={item.id}
                  item={item}
                  onPlay={handlePlayAudio}
                  userLevel={userLevel}
                  paraCoins={paraCoins}
                />
              ))}
            </div>
          </TabsContent>

          {["meditation", "focus", "workout", "knowledge"].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredContent
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <AudioCard
                      key={item.id}
                      item={item}
                      onPlay={handlePlayAudio}
                      userLevel={userLevel}
                      paraCoins={paraCoins}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedAudio && (
          <Card className="fixed bottom-0 left-0 right-0 z-50 border-t">
            <CardContent className="p-4">
              <AudioPlayer
                audio={selectedAudio}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onClose={() => setSelectedAudio(null)}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

interface AudioCardProps {
  item: {
    id: string
    title: string
    description: string
    category: string
    duration: string
    level: number
    premium: boolean
    image: string
  }
  onPlay: (item: AudioCardProps["item"]) => void
  userLevel: number
  paraCoins: number
}

function AudioCard({ item, onPlay, userLevel, paraCoins }: AudioCardProps) {
  const isLocked = item.level > userLevel || (item.premium && paraCoins < 100)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "meditation":
        return <Brain className="h-4 w-4" />
      case "workout":
        return <Dumbbell className="h-4 w-4" />
      case "knowledge":
        return <BookOpen className="h-4 w-4" />
      case "focus":
        return <Music className="h-4 w-4" />
      default:
        return <Headphones className="h-4 w-4" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="h-8 w-8 mx-auto mb-2" />
              {item.level > userLevel ? (
                <p className="text-sm">Reach Level {item.level} to Unlock</p>
              ) : (
                <p className="text-sm">Requires 100 PARA Coins</p>
              )}
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{item.title}</h3>
          <Badge variant="outline">{item.duration}</Badge>
        </div>
        <p className="text-sm text-gray-500 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            {getCategoryIcon(item.category)}
            <span className="capitalize">{item.category}</span>
          </Badge>
          <Button size="sm" disabled={isLocked} onClick={() => onPlay(item)} className="flex items-center gap-1">
            <Play className="h-4 w-4" />
            Play
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


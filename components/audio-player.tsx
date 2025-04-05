"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react"

interface AudioPlayerProps {
  audio: {
    id: string
    title: string
    description: string
    category: string
    duration: string
    image: string
  }
  isPlaying: boolean
  onPlayPause: () => void
  onClose: () => void
}

export function AudioPlayer({ audio, isPlaying, onPlayPause, onClose }: AudioPlayerProps) {
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState(audio.duration)

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 0.5
        })

        // Update current time based on progress
        const durationInSeconds = parseDuration(audio.duration)
        const currentSeconds = Math.floor((progress / 100) * durationInSeconds)
        setCurrentTime(formatTime(currentSeconds))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, progress, audio.duration])

  // Parse duration string (e.g., "10 min") to seconds
  const parseDuration = (durationStr: string): number => {
    const match = durationStr.match(/(\d+)/)
    if (match) {
      const minutes = Number.parseInt(match[1], 10)
      return minutes * 60
    }
    return 0
  }

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-4">
      <img src={audio.image || "/placeholder.svg"} alt={audio.title} className="h-12 w-12 rounded-md object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h4 className="font-medium text-sm">{audio.title}</h4>
            <p className="text-xs text-gray-500">{audio.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{currentTime}</span>
            <span className="text-xs text-gray-500">/</span>
            <span className="text-xs text-gray-500">{audio.duration}</span>
          </div>
        </div>
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          className="w-full"
          onValueChange={(value) => setProgress(value[0])}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button onClick={onPlayPause} size="icon" className="h-10 w-10 rounded-full">
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2 w-32">
        <Volume2 className="h-4 w-4 text-gray-500" />
        <Slider value={[volume]} max={100} step={1} className="w-full" onValueChange={(value) => setVolume(value[0])} />
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}


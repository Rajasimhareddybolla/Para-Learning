"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface UpcomingEventsProps {
  limit?: number
}

export function UpcomingEvents({ limit }: UpcomingEventsProps) {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])

  const events = [
    {
      id: "event-1",
      title: "Weekly Reflection Circle",
      description: "Share insights and challenges from your journey with fellow members",
      date: "Friday, April 7",
      time: "3:00 PM - 4:00 PM EST",
      participants: 18,
      host: "Sarah Johnson",
      hostAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "event-2",
      title: "Expert AMA: Overcoming Plateaus",
      description: "Live Q&A with transformation expert Coach Marcus",
      date: "Monday, April 10",
      time: "1:00 PM - 2:00 PM EST",
      participants: 24,
      host: "Coach Marcus",
      hostAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "event-3",
      title: "Goal Setting Workshop",
      description: "Learn effective techniques for setting and achieving your goals",
      date: "Wednesday, April 12",
      time: "11:00 AM - 12:30 PM EST",
      participants: 32,
      host: "Dr. Jennifer K.",
      hostAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "event-4",
      title: "Community Challenge Kickoff",
      description: "Join the 21-day consistency challenge with fellow members",
      date: "Monday, April 17",
      time: "4:00 PM - 5:00 PM EST",
      participants: 45,
      host: "Community Team",
      hostAvatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const displayEvents = limit ? events.slice(0, limit) : events

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter((id) => id !== eventId))
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  return (
    <div className="space-y-4">
      {displayEvents.map((event) => (
        <Card key={event.id} className="hover:border-blue-200 transition-colors">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100">
                  {event.date.split(",")[0]}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{event.description}</p>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{event.participants} participants</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{event.host.charAt(0)}</AvatarFallback>
                    <AvatarImage src={event.hostAvatar} />
                  </Avatar>
                  <span className="text-sm">Hosted by {event.host}</span>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleRegister(event.id)}
                  className={cn(
                    registeredEvents.includes(event.id)
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700",
                  )}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {registeredEvents.includes(event.id) ? "Registered" : "Join"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


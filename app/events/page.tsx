"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, Video, Search, Filter, MapPin, ChevronRight, type ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function EventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedFormat, setSelectedFormat] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [createEventOpen, setCreateEventOpen] = useState<boolean>(false)

  const events = [
    {
      id: "event-1",
      title: "Weekly Reflection Circle",
      description: "Share insights and challenges from your journey with fellow members",
      date: "Friday, April 7",
      time: "3:00 PM - 4:00 PM EST",
      participants: 18,
      host: "Sarah Johnson",
      hostAvatar: "/Archive/1.JPG",
      category: "community",
      format: "virtual",
      location: "Zoom",
    },
    {
      id: "event-2",
      title: "Expert AMA: Overcoming Plateaus",
      description: "Live Q&A with transformation expert Coach Marcus",
      date: "Monday, April 10",
      time: "1:00 PM - 2:00 PM EST",
      participants: 24,
      host: "Coach Marcus",
      hostAvatar: "/Archive/2.jpg",
      category: "expert",
      format: "virtual",
      location: "Zoom",
    },
    {
      id: "event-3",
      title: "Goal Setting Workshop",
      description: "Learn effective techniques for setting and achieving your goals",
      date: "Wednesday, April 12",
      time: "11:00 AM - 12:30 PM EST",
      participants: 32,
      host: "Dr. Jennifer K.",
      hostAvatar: "/Archive/4.jpeg",
      category: "workshop",
      format: "virtual",
      location: "Google Meet",
    },
    {
      id: "event-4",
      title: "Community Challenge Kickoff",
      description: "Join the 21-day consistency challenge with fellow members",
      date: "Monday, April 17",
      time: "4:00 PM - 5:00 PM EST",
      participants: 45,
      host: "Community Team",
      hostAvatar: "/Archive/5.jpeg",
      category: "challenge",
      format: "virtual",
      location: "Zoom",
    },
    {
      id: "event-5",
      title: "Mindfulness Masterclass",
      description: "Deep dive into advanced meditation techniques",
      date: "Thursday, April 20",
      time: "2:00 PM - 3:30 PM EST",
      participants: 28,
      host: "Dr. Sarah Chen",
      hostAvatar: "/Archive/4.jpeg",
      category: "workshop",
      format: "virtual",
      location: "Zoom",
    },
    {
      id: "event-6",
      title: "Productivity Systems Workshop",
      description: "Build systems that make consistency effortless",
      date: "Tuesday, April 25",
      time: "1:00 PM - 2:00 PM EST",
      participants: 36,
      host: "James Wilson",
      hostAvatar: "/Archive/3.jpg",
      category: "workshop",
      format: "virtual",
      location: "Zoom",
    },
    {
      id: "event-7",
      title: "Local Meditation Meetup",
      description: "Join fellow members for an in-person guided meditation session",
      date: "Saturday, April 15",
      time: "10:00 AM - 11:30 AM EST",
      participants: 12,
      host: "Michael Lee",
      hostAvatar: "/Archive/3.jpg",
      category: "community",
      format: "in-person",
      location: "Central Park, New York",
    },
    {
      id: "event-8",
      title: "Wellness Retreat Weekend",
      description: "A weekend of mindfulness, movement, and connection",
      date: "April 29-30",
      time: "All day",
      participants: 20,
      host: "Wellness Team",
      hostAvatar: "/Archive/1.JPG",
      category: "retreat",
      format: "in-person",
      location: "Mountain View Retreat Center",
    },
  ]

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter((id) => id !== eventId))
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  const filteredEvents = events.filter((event) => {
    // Filter by search query
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.host.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory

    // Filter by format
    const matchesFormat = selectedFormat === "all" || event.format === selectedFormat

    return matchesSearch && matchesCategory && matchesFormat
  })

  const upcomingEvents = filteredEvents.filter((event) => {
    // Simple logic to determine if event is upcoming
    // In a real app, you'd compare dates properly
    return true
  })

  const myEvents = filteredEvents.filter((event) => {
    return registeredEvents.includes(event.id)
  })

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground">Join live sessions and connect with the community</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create a New Event</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to create a new event for the community.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="e.g., Meditation Workshop" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea id="event-description" placeholder="Describe what your event is about..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-time">Time</Label>
                      <Input id="event-time" type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event-category">Category</Label>
                      <Select defaultValue="community">
                        <SelectTrigger id="event-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="expert">Expert Session</SelectItem>
                          <SelectItem value="challenge">Challenge</SelectItem>
                          <SelectItem value="retreat">Retreat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-format">Format</Label>
                      <Select defaultValue="virtual">
                        <SelectTrigger id="event-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" placeholder="e.g., Zoom link or physical address" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-private" />
                    <Label htmlFor="event-private">Make this a private event (invite only)</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setCreateEventOpen(false)}
                    className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                  >
                    Create Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[300px] space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-between"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </div>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {showFilters && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category-filter">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="expert">Expert Session</SelectItem>
                        <SelectItem value="challenge">Challenge</SelectItem>
                        <SelectItem value="retreat">Retreat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format-filter">Format</Label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger id="format-filter">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Formats</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-filter">Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="date-filter-start" type="date" placeholder="From" />
                      <Input id="date-filter-end" type="date" placeholder="To" />
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                    onClick={() => {
                      // Reset filters
                      setSelectedCategory("all")
                      setSelectedFormat("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Calendar</CardTitle>
                <CardDescription>Your upcoming registered events</CardDescription>
              </CardHeader>
              <CardContent>
                {myEvents.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>You haven't registered for any events yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                        <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {event.date.split(" ")[1]}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date}, {event.time}
                          </p>
                        </div>
                      </div>
                    ))}

                    {myEvents.length > 3 && (
                      <Button variant="outline" className="w-full text-sm" asChild>
                        <a href="/events/my-events">
                          View All My Events
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full justify-start mb-4 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
                >
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger
                  value="my-events"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
                >
                  My Events ({myEvents.length})
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg"
                >
                  Past Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-0 space-y-4">
                {upcomingEvents.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No upcoming events match your filters.</p>
                    </CardContent>
                  </Card>
                ) : (
                  upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isRegistered={registeredEvents.includes(event.id)}
                      onRegister={() => handleRegister(event.id)}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="my-events" className="mt-0 space-y-4">
                {myEvents.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">You haven't registered for any events yet.</p>
                      <Button
                        className="mt-4 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                        onClick={() => document.querySelector('[data-state="inactive"][value="upcoming"]')?.click()}
                      >
                        Browse Upcoming Events
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  myEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isRegistered={true}
                      onRegister={() => handleRegister(event.id)}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-0 space-y-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Past events will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    participants: number
    host: string
    hostAvatar: string
    category: string
    format: string
    location: string
  }
  isRegistered: boolean
  onRegister: () => void
}

function EventCard({ event, isRegistered, onRegister }: EventCardProps) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "community":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Community</Badge>
      case "workshop":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Workshop</Badge>
      case "expert":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Expert Session</Badge>
      case "challenge":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Challenge</Badge>
      case "retreat":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Retreat</Badge>
      default:
        return <Badge>{category}</Badge>
    }
  }

  return (
    <Card className="hover:border-blue-200 transition-colors">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{event.title}</h3>
                {getCategoryBadge(event.category)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            </div>
          </div>

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
              <MapPin className="h-4 w-4 mr-1" />
              <span>{event.location}</span>
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

            <div className="flex items-center gap-2">

              <Button
                size="sm"
                onClick={onRegister}
                className={cn(
                  isRegistered
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700",
                )}
              >
                <Video className="h-4 w-4 mr-2" />
                {isRegistered ? "Registered" : "Register"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChevronUp(props: React.ComponentProps<typeof ChevronLeft>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

function ChevronDown(props: React.ComponentProps<typeof ChevronLeft>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


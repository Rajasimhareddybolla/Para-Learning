"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useHasMounted } from "@/hooks/useHasMounted"
import {
  AtSign,
  Bell,
  Bold,
  ChevronDown,
  Hash,
  ImageIcon,
  Italic,
  Link,
  List,
  Menu,
  MessageSquare,
  MoreVertical,
  PlusCircle,
  Search,
  Send,
  Settings,
  Smile,
  User,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMobile } from "@/hooks/use-mobile"

// Types
type Message = {
  id: string
  content: string
  sender: ChatUser
  timestamp: Date
  reactions?: Reaction[]
  attachments?: Attachment[]
  isEdited?: boolean
}

type Reaction = {
  emoji: string
  count: number
  users: string[]
}

type Attachment = {
  type: "image" | "file"
  url: string
  name: string
  size?: number
}

type ChatUser = {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away" | "dnd"
  lastSeen?: Date
}

type Channel = {
  id: string
  name: string
  description?: string
  isPrivate: boolean
  unreadCount?: number
  members: ChatUser[]
  type: "text" | "voice"
}

type Community = {
  id: string
  name: string
  channels: Channel[]
  members: ChatUser[]
  admins: string[]
}

// Mock data
const currentUser: ChatUser = {
  id: "user-1",
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=40&width=40",
  status: "online",
}

const users: ChatUser[] = [
  currentUser,
  {
    id: "user-2",
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: "user-3",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
  },
  {
    id: "user-4",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: "user-5",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "dnd",
  },
]

const channels: Channel[] = [
  {
    id: "channel-1",
    name: "general",
    description: "General discussion for the community",
    isPrivate: false,
    members: users,
    type: "text",
  },
  {
    id: "channel-2",
    name: "announcements",
    description: "Important announcements for all members",
    isPrivate: false,
    unreadCount: 3,
    members: users,
    type: "text",
  },
  {
    id: "channel-3",
    name: "help",
    description: "Get help with any issues",
    isPrivate: false,
    members: users,
    type: "text",
  },
  {
    id: "channel-4",
    name: "voice-chat",
    description: "Voice channel for the community",
    isPrivate: false,
    members: users,
    type: "voice",
  },
  {
    id: "channel-5",
    name: "team-alpha",
    description: "Private channel for Team Alpha",
    isPrivate: true,
    members: [users[0], users[1], users[2]],
    type: "text",
  },
]

const community: Community = {
  id: "community-1",
  name: "Tech Enthusiasts",
  channels: channels,
  members: users,
  admins: ["user-1", "user-2"],
}

const messages: Message[] = [
  {
    id: "msg-1",
    content: "Hey everyone! Welcome to our new community platform. I'm excited to have you all here.",
    sender: users[0],
    timestamp: new Date(Date.now() - 86400000),
    reactions: [
      { emoji: "👍", count: 3, users: ["user-2", "user-3", "user-4"] },
      { emoji: "🎉", count: 2, users: ["user-2", "user-5"] },
    ],
  },
  {
    id: "msg-2",
    content: "Thanks for setting this up, Alex! Looking forward to collaborating with everyone.",
    sender: users[1],
    timestamp: new Date(Date.now() - 82800000),
  },
  {
    id: "msg-3",
    content: "I have a question about the project timeline. When are we planning to launch the beta?",
    sender: users[2],
    timestamp: new Date(Date.now() - 43200000),
  },
  {
    id: "msg-4",
    content: "We're aiming for next month, but I'll share a detailed roadmap tomorrow.",
    sender: users[0],
    timestamp: new Date(Date.now() - 39600000),
  },
  {
    id: "msg-5",
    content: "Check out this mockup I created for the landing page!",
    sender: users[1],
    timestamp: new Date(Date.now() - 21600000),
    attachments: [
      {
        type: "image",
        url: "/placeholder.svg?height=300&width=500",
        name: "landing-page-mockup.png",
      },
    ],
  },
  {
    id: "msg-6",
    content: "Looks great! I especially like the color scheme.",
    sender: users[4],
    timestamp: new Date(Date.now() - 18000000),
  },
  {
    id: "msg-7",
    content: "I've updated the documentation with the latest API changes. Let me know if anything needs clarification.",
    sender: users[3],
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: "msg-8",
    content: "Thanks Sarah! I'll review it this afternoon.",
    sender: users[0],
    timestamp: new Date(Date.now() - 3600000),
  },
]

export default function CommunityMessaging() {
  const hasMounted = useHasMounted()
  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0])
  const [channelMessages, setChannelMessages] = useState<Message[]>(messages)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [membersOpen, setMembersOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const { register, handleSubmit, reset } = useForm<{ message: string }>()

  useEffect(() => {
    scrollToBottom()
  }, [channelMessages])

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
      setMembersOpen(false)
    } else {
      setSidebarOpen(true)
      setMembersOpen(true)
    }
  }, [isMobile])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    // Less than a day
    if (diff < 86400000) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Less than a week
    if (diff < 604800000) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      return days[date.getDay()]
    }

    // Otherwise show full date
    return date.toLocaleDateString()
  }

  const getStatusColor = (status: ChatUser["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const onSendMessage = (data: { message: string }) => {
    if (!data.message.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: data.message,
      sender: currentUser,
      timestamp: new Date(),
    }

    setChannelMessages([...channelMessages, newMessage])
    reset()
  }

  // Prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background mx-auto">
      {/* Mobile header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-10 flex items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center ml-2">
            <Hash className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="font-semibold">{activeChannel.name}</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMembersOpen(!membersOpen)}>
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out fixed inset-y-0 left-0 z-20 w-64 border-r bg-background md:relative md:translate-x-0`}
      >
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">{community.name}</h2>
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setSidebarOpen(false)}>
              <ChevronDown className="h-5 w-5" />
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="px-2 py-2">
            <div className="flex items-center justify-between px-2 py-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Channels</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create Channel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-[2px]">
              {channels.map((channel) => (
                <Button
                  key={channel.id}
                  variant={activeChannel.id === channel.id ? "secondary" : "ghost"}
                  className="w-full justify-start px-2"
                  onClick={() => setActiveChannel(channel)}
                >
                  {channel.type === "text" ? (
                    <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                  ) : (
                    <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="truncate">{channel.name}</span>
                  {channel.isPrivate && (
                    <svg className="ml-1 h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 10h-1V7c0-3.9-3.1-7-7-7S4 3.1 4 7v3H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zM5 7c0-3.3 2.7-6 6-6s6 2.7 6 6v3H5V7z" />
                    </svg>
                  )}
                  {channel.unreadCount && (
                    <Badge variant="secondary" className="ml-auto">
                      {channel.unreadCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between px-2 py-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Direct Messages</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>New Message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-[2px]">
              {users
                .filter((user) => user.id !== currentUser.id)
                .map((user) => (
                  <Button key={user.id} variant="ghost" className="w-full justify-start px-2">
                    <div className="relative mr-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${getStatusColor(user.status)} ring-1 ring-background`}
                      ></span>
                    </div>
                    <span className="truncate">{user.name}</span>
                  </Button>
                ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{currentUser.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(currentUser.status)}`}></span>
                  <span className="capitalize">{currentUser.status}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Channel header */}
        {!isMobile && (
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex items-center">
              <Hash className="mr-2 h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">{activeChannel.name}</h3>
              {activeChannel.description && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-5" />
                  <p className="text-sm text-muted-foreground">{activeChannel.description}</p>
                </>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Users className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Channel Settings</DropdownMenuItem>
                  <DropdownMenuItem>Manage Members</DropdownMenuItem>
                  <DropdownMenuItem>Create Invite</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className={`h-[calc(100vh-${isMobile ? "8rem" : "11rem"})]`}>
            <div className="flex flex-col gap-4 p-4">
              {channelMessages.map((message, index) => {
                // Check if this message is from the same user as the previous one and within 5 minutes
                const prevMessage = index > 0 ? channelMessages[index - 1] : null
                const isContinuation =
                  prevMessage &&
                  prevMessage.sender.id === message.sender.id &&
                  message.timestamp.getTime() - prevMessage.timestamp.getTime() < 300000

                return (
                  <div key={message.id} className={`flex ${isContinuation ? "mt-1 pt-0" : "pt-2"}`}>
                    {!isContinuation && (
                      <Avatar className="mr-4 mt-0.5 h-10 w-10">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex-1 ${isContinuation ? "pl-14" : ""}`}>
                      {!isContinuation && (
                        <div className="flex items-baseline">
                          <h4 className="font-semibold">{message.sender.name}</h4>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className="mt-1 break-words text-sm">
                        {message.content}
                        {message.isEdited && <span className="ml-1 text-xs text-muted-foreground">(edited)</span>}
                      </div>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, i) => (
                            <div key={i} className="rounded-md overflow-hidden max-w-md">
                              {attachment.type === "image" ? (
                                <img
                                  src={attachment.url || "/placeholder.svg"}
                                  alt={attachment.name}
                                  className="max-h-80 object-contain"
                                />
                              ) : (
                                <Card className="flex items-center p-2">
                                  <div className="mr-2 rounded-md bg-muted p-2">
                                    <ImageIcon className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{attachment.name}</p>
                                    {attachment.size && (
                                      <p className="text-xs text-muted-foreground">
                                        {Math.round(attachment.size / 1024)} KB
                                      </p>
                                    )}
                                  </div>
                                </Card>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {message.reactions.map((reaction, i) => (
                            <Badge key={i} variant="outline" className="flex items-center gap-1 py-0 text-xs">
                              <span>{reaction.emoji}</span>
                              <span>{reaction.count}</span>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reply</DropdownMenuItem>
                        <DropdownMenuItem>Add Reaction</DropdownMenuItem>
                        {message.sender.id === currentUser.id && <DropdownMenuItem>Edit Message</DropdownMenuItem>}
                        {message.sender.id === currentUser.id && (
                          <DropdownMenuItem className="text-red-500">Delete Message</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Message input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit(onSendMessage)}>
            <div className="relative">
              <Textarea
                {...register("message")}
                placeholder={`Message #${activeChannel.name}`}
                className="min-h-[80px] resize-none pr-12 pt-3"
              />
              <div className="absolute bottom-1 right-1 flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Emoji</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <AtSign className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mention</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Send className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Italic className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Link className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Members sidebar */}
      <div
        className={`${
          membersOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-200 ease-in-out fixed inset-y-0 right-0 z-20 w-64 border-l bg-background md:relative md:translate-x-0`}
      >
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-sm font-semibold">Members</h2>
          <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{activeChannel.members.length}</span>
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMembersOpen(false)}>
              <ChevronDown className="h-5 w-5" />
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="p-4">
            <Tabs defaultValue="online">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <TabsContent value="online" className="mt-4 space-y-4">
                {activeChannel.members
                  .filter((member) => member.status === "online" || member.status === "away" || member.status === "dnd")
                  .map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(member.status)} ring-1 ring-background`}
                        ></span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="all" className="mt-4 space-y-4">
                {activeChannel.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(member.status)} ring-1 ring-background`}
                      ></span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="pending" className="mt-4 space-y-4">
                <p className="text-center text-sm text-muted-foreground">No pending invites</p>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}


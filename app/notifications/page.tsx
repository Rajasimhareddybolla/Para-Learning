"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, MessageSquare, Award, UserPlus, Check, Trash2, Clock, Zap } from "lucide-react"
import { useUserStore } from "@/lib/stores/user-store"
import { cn } from "@/lib/utils"
import { generateReminder, generateReminders, ReminderData } from "@/lib/services/reminder-service"

export default function NotificationsPage() {
  const { clearNotifications, getUserContextForAI } = useUserStore()
  const [aiReminders, setAiReminders] = useState<ReminderData[]>([])
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      type: "message",
      title: "New message from Coach David",
      description: "How's your meditation practice going? I noticed you've been consistent for 5 days!",
      time: "2 hours ago",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Coach David",
    },
    {
      id: "notif-2",
      type: "event",
      title: "Upcoming Event: Weekly Reflection Circle",
      description: "Your registered event starts in 24 hours. Don't forget to join!",
      time: "5 hours ago",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Events Team",
    },
    {
      id: "notif-3",
      type: "achievement",
      title: "New Achievement Unlocked!",
      description: "You've earned the '7-Day Streak' badge. Keep up the great work!",
      time: "1 day ago",
      read: true,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "PARA System",
    },
    {
      id: "notif-4",
      type: "friend",
      title: "New Connection Request",
      description: "Sarah J. wants to connect with you on PARA.",
      time: "2 days ago",
      read: true,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Sarah J.",
    },
    {
      id: "notif-5",
      type: "message",
      title: "New message from Dr. Jennifer K.",
      description: "I've reviewed your progress and have some suggestions for your meditation practice.",
      time: "3 days ago",
      read: true,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Dr. Jennifer K.",
    },
  ])

  useEffect(() => {
    const fetchPersonalizedReminders = async () => {
      try {
        setLoading(true)
        const userContext = getUserContextForAI()
        
        // Get multiple reminders
        const reminders = await generateReminders(userContext)
        setAiReminders(reminders)

        // Add the AI reminders to notifications
        if (reminders && reminders.length > 0) {
          const newNotifications = reminders.map(reminder => ({
            id: reminder.task_id || `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            type: "reminder",
            title: `Reminder for ${reminder.time}`,
            description: reminder.engagement_notification,
            time: "Just now",
            read: false,
            avatar: "/placeholder.svg?height=40&width=40",
            name: "PARA AI Assistant",
            quote: reminder.motivation_quote,
          }));

          setNotifications(prev => [...newNotifications, ...prev])
        }
      } catch (error) {
        console.error("Error fetching personalized reminders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPersonalizedReminders()
  }, [getUserContextForAI])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
    clearNotifications()
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const unreadNotifications = notifications.filter((notif) => !notif.read)
  const readNotifications = notifications.filter((notif) => notif.read)
  const reminderNotifications = notifications.filter((notif) => notif.type === "reminder")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-violet-500" />
      case "achievement":
        return <Award className="h-5 w-5 text-amber-500" />
      case "friend":
        return <UserPlus className="h-5 w-5 text-green-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your activity and connections</p>
          </div>

          {unreadNotifications.length > 0 && (
            <Button variant="outline" onClick={markAllAsRead} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-4 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
            >
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
            >
              Unread ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
            >
              Reminders ({reminderNotifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0 space-y-4">
            {loading && (
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></div>
                    <p>Personalizing your notifications...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && notifications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You don't have any notifications yet.</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                  icon={getNotificationIcon(notification.type)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-0 space-y-4">
            {loading && (
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></div>
                    <p>Personalizing your notifications...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && unreadNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">You've read all your notifications!</p>
                </CardContent>
              </Card>
            ) : (
              unreadNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                  icon={getNotificationIcon(notification.type)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="reminders" className="mt-0 space-y-4">
            {loading && (
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></div>
                    <p>Generating personalized reminders...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && reminderNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">No reminders scheduled yet.</p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-blue-500 to-violet-600"
                    onClick={async () => {
                      setLoading(true)
                      try {
                        const userContext = getUserContextForAI()
                        const reminders = await generateReminders(userContext)

                        if (reminders && reminders.length > 0) {
                          const newNotifications = reminders.map(reminder => ({
                            id: reminder.task_id || `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                            type: "reminder",
                            title: `Reminder for ${reminder.time}`,
                            description: reminder.engagement_notification,
                            time: "Just now",
                            read: false,
                            avatar: "/placeholder.svg?height=40&width=40",
                            name: "PARA AI Assistant",
                            quote: reminder.motivation_quote,
                          }));

                          setNotifications(prev => [...newNotifications, ...prev])
                        }
                      } catch (error) {
                        console.error("Error generating reminders:", error)
                      } finally {
                        setLoading(false)
                      }
                    }}
                  >
                    Generate Reminders
                  </Button>
                </CardContent>
              </Card>
            ) : (
              reminderNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                  icon={getNotificationIcon(notification.type)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface NotificationCardProps {
  notification: {
    id: string
    type: string
    title: string
    description: string
    time: string
    read: boolean
    avatar: string
    name: string
    quote?: string
  }
  onMarkAsRead: () => void
  onDelete: () => void
  icon: React.ReactNode
}

function NotificationCard({ notification, onMarkAsRead, onDelete, icon }: NotificationCardProps) {
  return (
    <Card
      className={cn(
        "transition-colors hover:border-blue-200",
        !notification.read && "border-l-4 border-l-blue-500",
        notification.type === "reminder" && "border-l-4 border-l-red-500"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={notification.avatar} />
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {icon}
                  <h3 className="font-medium">{notification.title}</h3>
                  {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                  {notification.type === "reminder" && <Badge className="bg-red-500">Reminder</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                {notification.quote && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <p className="text-xs italic">{notification.quote}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
              </div>

              <div className="flex items-center gap-1">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMarkAsRead}
                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


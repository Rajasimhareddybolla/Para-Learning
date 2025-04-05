"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send } from "lucide-react"
import { useUserStore } from "@/lib/stores/user-store"
import { cn } from "@/lib/utils"

interface AiCoachProps {
  onClose: () => void
}

export function AiCoach({ onClose }: AiCoachProps) {
  const { aiCoachHistory, addAiMessage } = useUserStore()
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [aiCoachHistory])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to history
    addAiMessage("user", message)
    setMessage("")

    // Simulate AI thinking
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "That's a great question! Consistency is key to building any new habit. Try setting a specific time each day for your practice and start with just 5 minutes if you're finding it challenging.",
        "I understand how you feel. Many people experience similar challenges. Remember that progress isn't always linear - focus on showing up consistently rather than perfection.",
        "Based on your progress, I'd recommend trying a guided meditation focused on breath awareness. This can help strengthen your attention and make it easier to stay focused during your practice.",
        "That's excellent progress! You're building a strong foundation for your practice. Consider gradually extending your sessions by 1-2 minutes each week to continue building your capacity.",
        "It sounds like you might be experiencing what's called the 'dip' - a natural part of any learning curve. This is actually a sign that you're making progress, even if it doesn't feel like it right now.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addAiMessage("assistant", randomResponse)
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
            </Avatar>
            <CardTitle className="text-lg">AI Coach</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {aiCoachHistory.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] p-4 rounded-lg",
                  msg.role === "assistant" ? "bg-muted" : "bg-blue-100 dark:bg-blue-900 ml-auto",
                )}
              >
                <p
                  className={cn(
                    "text-sm",
                    msg.role === "assistant" ? "text-foreground" : "text-blue-900 dark:text-blue-50",
                  )}
                >
                  {msg.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1 text-right">{formatTimestamp(msg.timestamp)}</p>
              </div>
            ))}

            {isTyping && (
              <div className="bg-muted p-4 rounded-lg max-w-[80%]">
                <div className="flex space-x-2">
                  <div
                    className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask your AI coach a question..."
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


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

// Import the GenAI class
import GoogleGenAI from "@/app/profile/gen_ai.js"

// System prompt for the AI Coach - including full text directly - use the full text from the file
const AI_COACH_SYSTEM_PROMPT = `✅ SYSTEM PROMPT – PARA Centralized AI (Codename: "Supra")

You are Supra – the AI core of PARA, the Supreme Evolution App.

You are a wise, compassionate, and motivating coach who helps users transform their lives through the 41-Day Challenge and beyond. You guide users through physical, mental, emotional, and spiritual evolution, adapting to their unique path.

🔑 Primary Responsibilities:
	1.	Understand the User's Current State
	•	Learn about their goals, profession, age group, personality, challenges, and daily habits.
	•	Ask reflective questions if the user appears lost or uncertain.
	2.	Guide the 41-Day Challenge
	•	Help users define a specific transformation goal.
	•	Assist in creating meaningful and achievable daily tasks.
	•	Motivate users to stay consistent, celebrate streaks, and offer gentle accountability.
	•	If users miss tasks, suggest uplifting strategies or modify difficulty compassionately.
	3.	Offer Motivation & Insight
	•	Provide powerful motivational messages, parables, or mindset shifts.
	•	Recommend audio content like guided meditations, healing frequencies, or workouts based on user state.
	•	Suggest books, quotes, or daily practices to enhance growth.
	4.	Reflect and Evolve with the User
	•	Encourage daily reflection with personalized journaling prompts.
	•	Spot patterns, behaviors, or limiting beliefs and offer practical reframes.
	•	Offer PARA Coin suggestions and how to use them strategically.
	5.	Support All User Types
	•	Whether it's a fitness enthusiast, a student, a professional, or a spiritual seeker—tailor your responses to their identity.
	•	For Level 1 users, be deeply supportive and autonomous.
	•	For Level 2+, offer mentorship-style insights.
	•	For Level 3 users, spark deeper community-based challenges or prompts.
	6.	Enable Habit Reinforcement
	•	Offer reminders and nudges to help build positive momentum.
	•	Suggest tools, timers, templates, or rituals for consistency.
	•	Remind them that transformation is about daily action, not perfection.

💬 Personality Traits:
	•	Empathetic like a monk
	•	Insightful like a therapist
	•	Energetic like a fitness coach
	•	Practical like a life strategist
	•	Calm like a meditation guide

🧠 Memory Guidance:

When enabled, remember:
	•	User's primary goal.
	•	Current streak & recent struggles.
	•	Personality & motivation style.
	•	Preferred audio/knowledge content.

⚠️ Boundaries:
	•	Never give medical or clinical advice.
	•	Do not make assumptions about user's beliefs—always let them lead their path.
	•	Use language that uplifts, never pressures.

🎯 Goals of Every Interaction:
	•	Keep users inspired and aligned with their 41-day intention.
	•	Help them believe in themselves a little more every day.
	•	Help them become the best version of themselves—body, mind, heart, and soul.
  every time give me in a short para and briefly dont make hime  exhaturate with the content 
  `;

interface AiCoachProps {
  onClose: () => void
}

export function AiCoach({ onClose }: AiCoachProps) {
  const { aiCoachHistory, addAiMessage } = useUserStore()
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [genAI, setGenAI] = useState<any>(null)
  
  // Initialize Gemini AI on component mount
  useEffect(() => {
    const initializeAI = async () => {
      try {
        // Initialize the Gemini AI with your API key
        const apiKey = "AIzaSyA9kMN5ja0slIyAAgBLbD1RjouUMFgfOSk"; // Make sure to set this in your environment
        const ai = new GoogleGenAI(
          apiKey, 
          "gemini-2.0-flash", 
          AI_COACH_SYSTEM_PROMPT,
          null // No response schema - we want natural text response
        );
        setGenAI(ai);
      } catch (error) {
        console.error("Failed to initialize AI:", error);
      }
    };
    
    initializeAI();
  }, []);

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

    // Show typing indicator
    setIsTyping(true)

    try {
      if (genAI) {
        // Send message to Gemini API
        const aiResponse = await genAI.generateResponse(message);
        
        // Add the response directly without parsing as JSON
        addAiMessage("assistant", aiResponse);
      } else {
        // Fallback for when AI is not initialized
        const fallbackResponses = [
          "That's a great question! Consistency is key to building any new habit. Try setting a specific time each day for your practice and start with just 5 minutes if you're finding it challenging.",
          "I understand how you feel. Many people experience similar challenges. Remember that progress isn't always linear - focus on showing up consistently rather than perfection.",
          "Based on your progress, I'd recommend trying a guided meditation focused on breath awareness. This can help strengthen your attention and make it easier to stay focused during your practice.",
          "That's excellent progress! You're building a strong foundation for your practice. Consider gradually extending your sessions by 1-2 minutes each week to continue building your capacity.",
          "It sounds like you might be experiencing what's called the 'dip' - a natural part of any learning curve. This is actually a sign that you're making progress, even if it doesn't feel like it right now.",
        ]
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        addAiMessage("assistant", randomResponse);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      addAiMessage("assistant", "I'm sorry, I encountered an error processing your request. Please try again later.");
    } finally {
      setIsTyping(false);
    }
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
            <CardTitle className="text-lg">AI Coach Ram</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {aiCoachHistory.length === 0 && (
              <div className="bg-muted p-4 rounded-lg max-w-[80%]">
                <p className="text-sm">
                  Hello! I'm Ram, your personalized AI coach. How can I help you on your journey today?
                </p>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formatTimestamp(new Date().toISOString())}
                </p>
              </div>
            )}
            
            {aiCoachHistory.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] p-4 rounded-lg",
                  msg.role === "assistant" 
                    ? "bg-muted" 
                    : "bg-blue-100 dark:bg-blue-900 ml-auto"
                )}
              >
                <p
                  className={cn(
                    "text-sm whitespace-pre-wrap", // Added whitespace-pre-wrap here
                    msg.role === "assistant" 
                      ? "text-foreground" 
                      : "text-blue-900 dark:text-blue-50"
                  )}
                >
                  {msg.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formatTimestamp(msg.timestamp)}
                </p>
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
              placeholder="Ask Ram, your AI coach, a question..."
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


"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserLevel } from "@/components/user-level"
import { useUserStore } from "@/lib/stores/user-store"

export function UserProfile() {
  const { userLevel, paraCoins, streakDays } = useUserStore()

  // Level thresholds
  const level2Threshold = 100
  const level3Threshold = 250

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    if (userLevel === 1) {
      return (paraCoins / level2Threshold) * 100
    } else if (userLevel === 2) {
      return ((paraCoins - level2Threshold) / (level3Threshold - level2Threshold)) * 100
    }
    return 100
  }

  return (
    <Card className="md:max-w-xs w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-20 w-20 mb-4">
          <AvatarFallback>JD</AvatarFallback>
                    <AvatarImage src="/image.png" alt="Jane Doe" />
            </Avatar>
          <h2 className="text-xl font-bold">Jane Doe</h2>
          <p className="text-sm text-gray-500">Member since April 2025</p>
          <div className="flex items-center gap-2 mt-2">
            <UserLevel level={userLevel} />
            <Badge>Level {userLevel}</Badge>
          </div>
          <Badge variant="outline" className="mt-2 flex items-center gap-1">
            <Award className="h-3 w-3" />
            {paraCoins} PARA Coins
          </Badge>
          {streakDays > 0 && (
            <Badge variant="outline" className="mt-2 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-flame"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              {streakDays} Day Streak
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Current Goals</h3>
            <ul className="text-sm text-gray-500 list-disc list-inside">
              <li>Establish a daily meditation practice</li>
              <li>Complete the 41-day challenge</li>
              <li>Reach Level 3 community access</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">First Task</Badge>
              <Badge variant="secondary">3-Day Streak</Badge>
              <Badge variant="secondary">Level Up</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


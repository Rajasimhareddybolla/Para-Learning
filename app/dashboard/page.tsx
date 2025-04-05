"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Lock, Unlock, Headphones, Target, MessageCircle, X, Bell } from "lucide-react"
import { UserProfile } from "@/components/user-profile"
import { ChallengeProgress } from "@/components/challenge-progress"
import { TaskList } from "@/components/task-list"
import { RecommendedContent } from "@/components/recommended-content"
import { useUserStore } from "@/lib/stores/user-store"

export default function Dashboard() {
  const { userLevel, paraCoins, completedTasks, streakDays, challengeDay } = useUserStore()
  const [showAICoach, setShowAICoach] = useState(false)
  const [activeNotifications, setActiveNotifications] = useState(3)

  return (
    <div className="container mx-auto p-4">
      {/* Summary Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <UserProfile />

        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>41-Day Challenge</CardTitle>
            <CardDescription>Day {challengeDay} of 41</CardDescription>
          </CardHeader>
          <CardContent>
            <ChallengeProgress />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{completedTasks}</div>
                <div className="text-xs text-gray-500">Tasks Completed</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{streakDays}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{paraCoins}</div>
                <div className="text-xs text-gray-500">PARA Coins</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="tasks" className="flex items-center gap-1">
              <Target className="h-4 w-4" /> Tasks
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-1">
              <Headphones className="h-4 w-4" /> Content
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-1 relative">
              <Users className="h-4 w-4" /> Community
              {activeNotifications > 0 && (
                <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs absolute -top-2 -right-2">
                  {activeNotifications}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowAICoach(!showAICoach)}
            className="flex items-center gap-1"
          >
            <MessageCircle className="h-4 w-4" />
            AI Coach
          </Button>
        </div>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>Complete these tasks to earn PARA Coins</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="mr-2">Mark All Complete</Button>
              <Button>Add Custom Task</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Content</CardTitle>
              <CardDescription>Personalized resources for your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendedContent />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="mr-2">Save for Later</Button>
              <Button asChild>
                <a href="/library">Browse Library</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Community Access</CardTitle>
                  <CardDescription>Connect with mentors and peers</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  Notifications {activeNotifications > 0 && <Badge variant="destructive">{activeNotifications}</Badge>}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={userLevel >= 1 ? "default" : "outline"}>Level 1</Badge>
                    <span className="text-sm">AI Coach Access</span>
                    {userLevel >= 1 && <Unlock className="h-3 w-3 ml-auto text-green-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={userLevel >= 2 ? "default" : "outline"}>Level 2</Badge>
                    <span className="text-sm">Mentor Access</span>
                    {userLevel < 2 && <Lock className="h-3 w-3 ml-auto" />}
                    {userLevel >= 2 && <Unlock className="h-3 w-3 ml-auto text-green-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={userLevel >= 3 ? "default" : "outline"}>Level 3</Badge>
                    <span className="text-sm">Community Access</span>
                    {userLevel < 3 && <Lock className="h-3 w-3 ml-auto" />}
                    {userLevel >= 3 && <Unlock className="h-3 w-3 ml-auto text-green-500" />}
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <h3 className="text-sm font-medium">Recent Messages</h3>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium">Jane Doe</p>
                          <Badge variant="outline" className="ml-2 text-xs">Mentor</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          I noticed your progress on meditation. Would you like to discuss techniques?
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2h ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SC</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium">Sarah Chen</p>
                          <Badge variant="outline" className="ml-2 text-xs">Community</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Hey! Are you joining the group meditation session tomorrow?
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">5h ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/community">Open Community Hub</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating AI Coach */}
      {showAICoach && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          <div className="p-3 bg-primary text-primary-foreground flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <span className="font-medium text-sm">AI Coach</span>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5 text-primary-foreground" onClick={() => setShowAICoach(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-muted p-2 rounded-lg text-sm">
                <p className="font-medium mb-1">Good morning!</p>
                <p className="text-xs text-muted-foreground">
                  "Consistency is the key to transformation. You've been making great progress on your meditation
                  practice. Today, try to extend your session by just 2 minutes to gradually build your capacity."
                </p>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                What would you like to discuss today?
              </div>
            </div>
          </div>
          <div className="p-3 border-t bg-muted/50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your AI coach..."
                className="flex-1 text-sm p-2 rounded-md border"
              />
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


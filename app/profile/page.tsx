"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChallengeProgress } from "@/components/challenge-progress"
import { TaskList } from "@/components/task-list"
import { RecommendedContent } from "@/components/recommended-content"
import { useUserStore } from "@/lib/stores/user-store"
import { useTaskStore } from "@/lib/stores/task-store"
import { Award, Calendar, CheckCircle, MessageCircle, Plus, Target, Headphones, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AiCoach } from "@/components/ai-coach"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function ProfilePage() {
  const { userLevel, paraCoins, completedTasks, streakDays, challengeDay } = useUserStore()
  const { tasks, categories, addTask } = useTaskStore()
  const [showAICoach, setShowAICoach] = useState(false)
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newTaskCategory, setNewTaskCategory] = useState("mindfulness")
  const [newTaskCoins, setNewTaskCoins] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Calculate level progress
  const level2Threshold = 100
  const level3Threshold = 250
  const getProgressToNextLevel = () => {
    if (userLevel === 1) {
      return (paraCoins / level2Threshold) * 100
    } else if (userLevel === 2) {
      return ((paraCoins - level2Threshold) / (level3Threshold - level2Threshold)) * 100
    }
    return 100
  }

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask({
        id: Date.now().toString(),
        name: newTaskName,
        description: newTaskDescription,
        category: newTaskCategory,
        coins: newTaskCoins,
        completed: false,
        createdAt: new Date().toISOString(),
      })
      setNewTaskName("")
      setNewTaskDescription("")
      setDialogOpen(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-12">
        {/* Left Column - User Profile */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-500 to-violet-600"></div>
              <CardContent className="p-6 pt-0 -mt-12">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarFallback>JD</AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Jane Doe" />
                  </Avatar>
                  <h2 className="text-2xl font-bold mt-4">Jane Doe</h2>
                  <p className="text-sm text-muted-foreground">Member since April 2025</p>

                  <div className="flex items-center gap-2 mt-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                      Level {userLevel}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {paraCoins} Coins
                    </Badge>
                  </div>

                  <div className="w-full mt-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress to Level {userLevel + 1}</span>
                      <span className="font-medium">{Math.round(getProgressToNextLevel())}%</span>
                    </div>
                    <Progress
                      value={getProgressToNextLevel()}
                      className="h-2"
                      indicatorClassName="bg-gradient-to-r from-blue-500 to-violet-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Current Goals</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Establish a daily meditation practice</p>
                      <p className="text-xs text-muted-foreground">5 days streak</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Complete the 41-day challenge</p>
                      <p className="text-xs text-muted-foreground">Day {challengeDay} of 41</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Reach Level 3 community access</p>
                      <p className="text-xs text-muted-foreground">{userLevel}/3 levels completed</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">First Task</Badge>
                  <Badge variant="secondary">3-Day Streak</Badge>
                  <Badge variant="secondary">Level Up</Badge>
                  <Badge variant="secondary">Early Adopter</Badge>
                  <Badge variant="secondary">Meditation Master</Badge>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setShowAICoach(!showAICoach)}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
              variant={showAICoach ? "secondary" : "default"}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {showAICoach ? "Hide AI Coach" : "Talk to AI Coach"}
            </Button>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Challenge Progress Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>41-Day Challenge</CardTitle>
                  <CardDescription>Day {challengeDay} of 41 • Transform your habits</CardDescription>
                </div>
                <Badge variant="outline" className="px-3 py-1 text-base">
                  {Math.round((challengeDay / 41) * 100)}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChallengeProgress showDetails />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Card className="bg-gradient-to-br from-blue-50 to-violet-50 border-none">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{completedTasks}</div>
                    <div className="text-sm text-muted-foreground">Tasks Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">{streakDays}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-none">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">{paraCoins}</div>
                    <div className="text-sm text-muted-foreground">PARA Coins</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* AI Coach */}
          {showAICoach && <AiCoach onClose={() => setShowAICoach(false)} />}

          {/* Main Content Tabs */}
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="w-full justify-start mb-4 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="tasks"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
              >
                <Target className="h-4 w-4 mr-2" /> Today's Tasks
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg mr-2"
              >
                <Headphones className="h-4 w-4 mr-2" /> Recommended Content
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg"
              >
                <Calendar className="h-4 w-4 mr-2" /> Upcoming Events
              </TabsTrigger>
            </TabsList>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="mt-0">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Today's Tasks</CardTitle>
                    <CardDescription>Complete these tasks to earn PARA Coins</CardDescription>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Task</DialogTitle>
                        <DialogDescription>
                          Add a new task to your challenge. Tasks help you build consistent habits.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="task-name">Task Name</Label>
                          <Input
                            id="task-name"
                            placeholder="e.g., Morning Meditation"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="task-description">Description (Optional)</Label>
                          <Textarea
                            id="task-description"
                            placeholder="Describe your task..."
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="task-category">Category</Label>
                          <Select value={newTaskCategory} onValueChange={setNewTaskCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mindfulness">Mindfulness</SelectItem>
                              <SelectItem value="fitness">Fitness</SelectItem>
                              <SelectItem value="learning">Learning</SelectItem>
                              <SelectItem value="productivity">Productivity</SelectItem>
                              <SelectItem value="wellness">Wellness</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="task-coins">PARA Coins Reward</Label>
                          <Select
                            value={newTaskCoins.toString()}
                            onValueChange={(value) => setNewTaskCoins(Number.parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select coins reward" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Coins (Easy Task)</SelectItem>
                              <SelectItem value="10">10 Coins (Normal Task)</SelectItem>
                              <SelectItem value="15">15 Coins (Challenging Task)</SelectItem>
                              <SelectItem value="20">20 Coins (Difficult Task)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddTask}
                          className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                        >
                          Add Task
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <TaskList />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="mt-0">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recommended Content</CardTitle>
                    <CardDescription>Personalized resources for your journey</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/library" className="flex items-center">
                      Browse Library
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <RecommendedContent />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Upcoming Events Tab */}
            <TabsContent value="upcoming" className="mt-0">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Join live sessions with the community</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/events" className="flex items-center">
                      View All Events
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <UpcomingEvents limit={2} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


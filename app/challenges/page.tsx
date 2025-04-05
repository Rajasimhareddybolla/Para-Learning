"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, Plus, Target, Trash2, Brain, Heart, Dumbbell, Award } from "lucide-react"
import { ChallengeProgress } from "@/components/challenge-progress"
import { useUserStore } from "@/lib/stores/user-store"
import { useTaskStore } from "@/lib/stores/task-store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function Challenges() {
  const { userLevel, paraCoins, challengeDay } = useUserStore()
  const { tasks, categories, addTask, removeTask } = useTaskStore()
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newTaskCategory, setNewTaskCategory] = useState("mindfulness")
  const [newTaskCoins, setNewTaskCoins] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)

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
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">41-Day Challenge</h1>
            <p className="text-gray-500">Day {challengeDay} of 41</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-3 py-1">
              {paraCoins} PARA Coins
            </Badge>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Task
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
                  <Button onClick={handleAddTask}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Challenge Progress</CardTitle>
            <CardDescription>Track your journey through the 41-day transformation</CardDescription>
          </CardHeader>
          <CardContent>
            <ChallengeProgress showDetails />
          </CardContent>
        </Card>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
              <TabsTrigger value="fitness">Fitness</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            {tasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Target className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-center text-gray-500">
                    You haven't added any tasks yet. Create your first task to begin your challenge!
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>{/* Same dialog content as above */}</DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              tasks.map((task) => <TaskCard key={task.id} task={task} onDelete={() => removeTask(task.id)} />)
            )}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {tasks.filter((task) => task.category === category).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <p className="text-center text-gray-500">No {category} tasks yet. Add one to get started!</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add {category.charAt(0).toUpperCase() + category.slice(1)} Task
                        </Button>
                      </DialogTrigger>
                      <DialogContent>{/* Same dialog content as above */}</DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ) : (
                tasks
                  .filter((task) => task.category === category)
                  .map((task) => <TaskCard key={task.id} task={task} onDelete={() => removeTask(task.id)} />)
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Challenges</CardTitle>
            <CardDescription>Try these pre-designed challenges based on your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SuggestedChallenge
                title="Mental Clarity"
                description="Improve focus and reduce mental fog"
                icon={<Brain className="h-8 w-8" />}
                tasks={["10-minute morning meditation", "Journaling practice", "Digital detox hour"]}
              />
              <SuggestedChallenge
                title="Physical Vitality"
                description="Boost energy and physical wellbeing"
                icon={<Dumbbell className="h-8 w-8" />}
                tasks={["Morning stretching routine", "10,000 daily steps", "Strength training session"]}
              />
              <SuggestedChallenge
                title="Emotional Balance"
                description="Cultivate emotional resilience"
                icon={<Heart className="h-8 w-8" />}
                tasks={["Gratitude practice", "Emotional awareness check-in", "Acts of kindness"]}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface Task {
  id: string
  name: string
  description?: string
  category: string
  coins: number
  completed: boolean
  createdAt: string
}

interface TaskCardProps {
  task: Task
  onDelete: () => void
}

function TaskCard({ task, onDelete }: TaskCardProps) {
  const { completeTask } = useUserStore()
  const { toggleTaskCompletion } = useTaskStore()

  const handleToggleCompletion = () => {
    toggleTaskCompletion(task.id)
    if (!task.completed) {
      completeTask(task.coins)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mindfulness":
        return <Brain className="h-4 w-4" />
      case "fitness":
        return <Dumbbell className="h-4 w-4" />
      case "learning":
        return <BookIcon className="h-4 w-4" />
      case "productivity":
        return <Clock className="h-4 w-4" />
      case "wellness":
        return <Heart className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <button onClick={handleToggleCompletion} className="mt-1 flex-shrink-0">
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300" />
              )}
            </button>
            <div>
              <h3 className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>{task.name}</h3>
              {task.description && <p className="text-sm text-gray-500 mt-1">{task.description}</p>}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(task.category)}
                  <span className="capitalize">{task.category}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {task.coins} coins
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-15" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
    </svg>
  )
}

interface SuggestedChallengeProps {
  title: string
  description: string
  icon: React.ReactNode
  tasks: string[]
}

function SuggestedChallenge({ title, description, icon, tasks }: SuggestedChallengeProps) {
  const { addTask } = useTaskStore()

  const handleAddAllTasks = () => {
    tasks.forEach((taskName) => {
      addTask({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: taskName,
        category: title.toLowerCase().includes("mental")
          ? "mindfulness"
          : title.toLowerCase().includes("physical")
            ? "fitness"
            : "wellness",
        coins: 10,
        completed: false,
        createdAt: new Date().toISOString(),
      })
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
          <div className="w-full space-y-2 mb-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-primary" />
                <span className="text-sm">{task}</span>
              </div>
            ))}
          </div>
          <Button onClick={handleAddAllTasks} className="w-full">
            Add All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


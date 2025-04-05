"use client"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Brain, Dumbbell, BookOpen, Clock, Heart } from "lucide-react"
import { useUserStore } from "@/lib/stores/user-store"
import { useTaskStore } from "@/lib/stores/task-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TaskListProps {
  limit?: number
}

export function TaskList({ limit }: TaskListProps) {
  const { completeTask } = useUserStore()
  const { tasks, toggleTaskCompletion } = useTaskStore()

  const handleComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task && !task.completed) {
      toggleTaskCompletion(taskId)
      completeTask(task.coins)
    } else if (task && task.completed) {
      toggleTaskCompletion(taskId)
    }
  }

  const displayTasks = limit ? tasks.slice(0, limit) : tasks

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mindfulness":
        return <Brain className="h-4 w-4" />
      case "fitness":
        return <Dumbbell className="h-4 w-4" />
      case "learning":
        return <BookOpen className="h-4 w-4" />
      case "productivity":
        return <Clock className="h-4 w-4" />
      case "wellness":
        return <Heart className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-3">
      {displayTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No tasks yet. Add some tasks to get started!</p>
        </div>
      ) : (
        displayTasks.map((task) => (
          <Card
            key={task.id}
            className={cn("transition-all hover:border-blue-200", task.completed ? "bg-muted/30" : "hover:shadow-sm")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full h-8 w-8 p-0",
                    task.completed ? "bg-green-100 text-green-600" : "hover:bg-blue-100 hover:text-blue-600",
                  )}
                  onClick={() => handleComplete(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                      {task.name}
                    </h3>
                    <Badge variant="outline" className={cn("ml-2", task.completed ? "bg-green-50" : "bg-blue-50")}>
                      +{task.coins} coins
                    </Badge>
                  </div>

                  {task.description && (
                    <p
                      className={cn("text-sm mt-1", task.completed ? "text-muted-foreground" : "text-muted-foreground")}
                    >
                      {task.description}
                    </p>
                  )}

                  {task.category && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        {getCategoryIcon(task.category)}
                        <span className="capitalize">{task.category}</span>
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}


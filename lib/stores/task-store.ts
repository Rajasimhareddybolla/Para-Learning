"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Task {
  id: string
  name: string
  description?: string
  category: string
  coins: number
  completed: boolean
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  categories: string[]

  addTask: (task: Task) => void
  removeTask: (id: string) => void
  toggleTaskCompletion: (id: string) => void
  getTasksByCategory: (category: string) => Task[]
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: "task-1",
          name: "Morning Meditation",
          description: "10 minutes of mindful breathing",
          category: "mindfulness",
          coins: 10,
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "task-2",
          name: "Read 10 pages",
          description: "From personal development book",
          category: "learning",
          coins: 15,
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "task-3",
          name: "30-minute walk",
          description: "Outdoor walking for fresh air",
          category: "fitness",
          coins: 20,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
      categories: ["mindfulness", "fitness", "learning", "productivity", "wellness"],

      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, task],
        }))
      },

      removeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      toggleTaskCompletion: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
        }))
      },

      getTasksByCategory: (category) => {
        return get().tasks.filter((task) => task.category === category)
      },
    }),
    {
      name: "para-tasks-storage",
    },
  ),
)


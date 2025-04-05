"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  userLevel: number
  paraCoins: number
  completedTasks: number
  streakDays: number
  challengeDay: number
  lastActive: string | null
  notifications: number
  aiCoachHistory: {
    role: "user" | "assistant"
    content: string
    timestamp: string
  }[]
  joinedChallenges: string[] // Array to store IDs of joined challenges

  addParaCoins: (amount: number) => void
  completeTask: (coinReward: number) => void
  checkStreak: () => void
  advanceChallenge: () => void
  clearNotifications: () => void
  addAiMessage: (role: "user" | "assistant", content: string) => void
  joinChallenge: (challengeTitle: string) => void
  leaveChallenge: (challengeTitle: string) => void
  hasJoinedChallenge: (challengeTitle: string) => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userLevel: 4,
      paraCoins: 150,
      completedTasks: 12,
      streakDays: 7,
      challengeDay: 8,
      lastActive: null,
      notifications: 3,
      aiCoachHistory: [
        {
          role: "assistant",
          content: "Welcome back, Jane! How can I help you with your personal growth journey today?",
          timestamp: new Date().toISOString(),
        },
      ],
      joinedChallenges: [],

      addParaCoins: (amount) => {
        set((state) => {
          const newCoins = state.paraCoins + amount
          let newLevel = state.userLevel

          // Level up logic
          if (state.userLevel === 1 && newCoins >= 100) {
            newLevel = 2
          } else if (state.userLevel === 2 && newCoins >= 250) {
            newLevel = 3
          }

          return {
            paraCoins: newCoins,
            userLevel: newLevel,
          }
        })
      },

      completeTask: (coinReward) => {
        set((state) => {
          const newCoins = state.paraCoins + coinReward
          const newCompletedTasks = state.completedTasks + 1
          let newLevel = state.userLevel

          // Level up logic
          if (state.userLevel === 1 && newCoins >= 100) {
            newLevel = 2
          } else if (state.userLevel === 2 && newCoins >= 250) {
            newLevel = 3
          }

          return {
            paraCoins: newCoins,
            completedTasks: newCompletedTasks,
            userLevel: newLevel,
          }
        })

        // Check streak
        get().checkStreak()
      },

      checkStreak: () => {
        const today = new Date().toDateString()
        const lastActive = get().lastActive

        set((state) => {
          // If first activity or active today already
          if (!lastActive || lastActive === today) {
            return { lastActive: today }
          }

          // Check if last active was yesterday
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const wasYesterday = lastActive === yesterday.toDateString()

          if (wasYesterday) {
            // Maintain streak
            return {
              streakDays: state.streakDays + 1,
              lastActive: today,
            }
          } else {
            // Reset streak
            return {
              streakDays: 1,
              lastActive: today,
            }
          }
        })
      },

      advanceChallenge: () => {
        set((state) => {
          if (state.challengeDay < 41) {
            return { challengeDay: state.challengeDay + 1 }
          }
          return state
        })
      },

      clearNotifications: () => {
        set({ notifications: 0 })
      },

      addAiMessage: (role, content) => {
        set((state) => ({
          aiCoachHistory: [
            ...state.aiCoachHistory,
            {
              role,
              content,
              timestamp: new Date().toISOString(),
            },
          ],
        }))
      },

      joinChallenge: (challengeTitle) =>
        set((state) => ({
          joinedChallenges: [...state.joinedChallenges, challengeTitle],
        })),

      leaveChallenge: (challengeTitle) =>
        set((state) => ({
          joinedChallenges: state.joinedChallenges.filter(
            (title) => title !== challengeTitle,
          ),
        })),

      hasJoinedChallenge: (challengeTitle) =>
        get().joinedChallenges.includes(challengeTitle),
    }),
    {
      name: "para-user-storage",
    },
  ),
)


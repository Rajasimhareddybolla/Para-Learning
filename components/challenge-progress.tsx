"use client"

import { useUserStore } from "@/lib/stores/user-store"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChallengeProgressProps {
  showDetails?: boolean
}

export function ChallengeProgress({ showDetails = false }: ChallengeProgressProps) {
  const { challengeDay } = useUserStore()

  // Calculate progress percentage
  const progressPercentage = (challengeDay / 41) * 100

  // Generate milestone days
  const milestones = [7, 14, 21, 28, 35, 41]

  // Milestone descriptions
  const milestoneDescriptions = [
    "Habit Formation Beginning",
    "Momentum Building",
    "Halfway Point",
    "Consistency Established",
    "Almost There",
    "Challenge Complete",
  ]

  return (
    <div className="space-y-6">
      <Progress
        value={progressPercentage}
        className="h-3"
        indicatorClassName="bg-gradient-to-r from-blue-500 to-violet-600"
      />

      {showDetails && (
        <div className="relative">
          <div className="absolute -top-6 left-0 right-0 flex justify-between">
            <TooltipProvider>
              {milestones.map((day, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      style={{
                        left: `${(day / 41) * 100}%`,
                        transform: "translateX(-50%)",
                        position: "absolute",
                      }}
                    >
                      {challengeDay >= day ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                      <span className="text-xs mt-1 font-medium">Day {day}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{milestoneDescriptions[index]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  )
}


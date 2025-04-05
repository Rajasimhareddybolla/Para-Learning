import { Circle, Award, Users } from "lucide-react"

interface UserLevelProps {
  level: number
}

export function UserLevel({ level }: UserLevelProps) {
  if (level === 1) {
    return (
      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
        <Circle className="h-4 w-4 text-blue-500" />
      </div>
    )
  } else if (level === 2) {
    return (
      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
        <Award className="h-4 w-4 text-purple-500" />
      </div>
    )
  } else {
    return (
      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
        <Users className="h-4 w-4 text-green-500" />
      </div>
    )
  }
}


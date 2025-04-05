import Image from "next/image"
import Link from "next/link"
import { Video } from "@/lib/video-library"
import { Clock, PlayCircle } from "lucide-react"

interface VideoCardProps {
  video: Video;
  className?: string;
}

const typeIcons = {
  meditation: "🧘‍♂️",
  talk: "🎤",
  workout: "💪",
  focus: "🎯"
}

export function VideoCard({ video, className = "" }: VideoCardProps) {
  return (
    <Link href={`/library/${video.id}`} className={`block group ${className}`}>
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="h-12 w-12 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          {video.duration}
        </div>
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {typeIcons[video.type]}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>
      </div>
    </Link>
  )
} 
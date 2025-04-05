import { videoLibrary } from "@/lib/video-library"
import { VideoCard } from "@/components/video-card"
import { Search } from "lucide-react"

export default function FocusPage() {
  const focusSounds = videoLibrary.filter(video => video.type === 'focus')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Focus Sounds</h1>
          <p className="text-muted-foreground">
            Explore binaural beats and sounds to enhance concentration
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search focus sounds..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusSounds.map((sound) => (
            <VideoCard key={sound.id} video={sound} />
          ))}
        </div>
      </div>
    </div>
  )
} 
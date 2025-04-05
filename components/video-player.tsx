import { Video } from "@/lib/video-library"
import { getYouTubeEmbedUrl } from "@/lib/youtube-utils"

interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const embedUrl = getYouTubeEmbedUrl(video.youtubeId)
  
  return (
    <div className="space-y-6">
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <p className="text-gray-500">{video.description}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Transcript</h2>
          <div className="whitespace-pre-line text-sm text-gray-600">
            {video.transcript}
          </div>
        </div>
      </div>
    </div>
  )
} 
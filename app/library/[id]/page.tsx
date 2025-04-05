import { notFound } from "next/navigation"
import { VideoPlayer } from "@/components/video-player"
import { videoLibrary } from "@/lib/video-library"
import { ArrowLeft, Download, Share2, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default function VideoPage({ params }: VideoPageProps) {
  const video = videoLibrary.find(v => v.id === params.id)
  
  if (!video) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/library" className="inline-flex items-center text-sm mb-6 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer video={video} />
          
          <div className="flex items-center space-x-2 mt-6">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              Favorite
            </Button>
          </div>
        </div>

        <div>
          <div className="border rounded-xl p-6 sticky top-6">
            <h3 className="font-medium mb-3">Related Meditations</h3>
            <div className="space-y-4">
              {videoLibrary
                .filter(v => v.id !== video.id && v.category === video.category)
                .slice(0, 3)
                .map(relatedVideo => (
                  <Link 
                    key={relatedVideo.id} 
                    href={`/library/${relatedVideo.id}`}
                    className="block group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                        <img
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary">
                          {relatedVideo.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {relatedVideo.duration}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
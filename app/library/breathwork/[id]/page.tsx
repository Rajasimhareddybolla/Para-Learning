import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Clock, Download, Share2, Heart } from "lucide-react"
import Link from "next/link"
import { videoLibrary } from "@/lib/video-library"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default function BreathworkPage({ params }: PageProps) {
  const breathwork = videoLibrary.find(video => video.id === params.id)

  if (!breathwork) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/library/breathwork" className="inline-flex items-center text-sm mb-6 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Breathwork
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${breathwork.youtubeId}`}
              title={breathwork.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>

          <h1 className="text-3xl font-bold mb-2">{breathwork.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span className="flex items-center mr-4">
              <Clock className="mr-1 h-4 w-4" />
              {breathwork.duration}
            </span>
            <span>{breathwork.category}</span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
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

          <div className="prose max-w-none">
            <h2>About this breathwork session</h2>
            <p>{breathwork.description}</p>

            {breathwork.benefits && (
              <>
                <h2>Benefits</h2>
                <ul>
                  {breathwork.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}

            {breathwork.preparation && (
              <>
                <h2>How to prepare</h2>
                <ul>
                  {breathwork.preparation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </>
            )}

            {breathwork.instructor && (
              <>
                <h2>About the instructor</h2>
                <p className="font-medium">{breathwork.instructor}</p>
                <p>{breathwork.instructorBio}</p>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Related Breathwork Sessions</h3>
          <div className="space-y-4">
            {videoLibrary
              .filter(video => video.type === 'breathwork' && video.id !== breathwork.id)
              .slice(0, 3)
              .map(related => (
                <Link
                  key={related.id}
                  href={`/library/breathwork/${related.id}`}
                  className="block group"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {related.title}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {related.duration}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
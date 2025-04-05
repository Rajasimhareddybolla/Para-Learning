import { Button } from "@/components/ui/button"
import { ChevronRight, Headphones, BookOpen, Zap, Waves } from "lucide-react"
import CategoryCard from "@/components/category-card"
import FeaturedAudio from "@/components/featured-audio"
import { videoLibrary } from "@/lib/video-library"

export default function LibraryPage() {
  // Get the latest items from each category
  const featuredItems = [
    videoLibrary.find(video => video.id === "blissful-deep-relaxation"),
    videoLibrary.find(video => video.id === "full-body-hiit-beginners"),
    videoLibrary.find(video => video.id === "first-20-hours")
  ].filter(Boolean)

  const recentItems = [
    videoLibrary.find(video => video.id === "focus-meditation-with-music"),
    videoLibrary.find(video => video.id === "deep-focus-music"),
    videoLibrary.find(video => video.id === "learning-how-to-learn")
  ].filter(Boolean)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Audio & Knowledge Library</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Enhance your mind, body, and spirit with our curated audio collection
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            title="Guided Meditations"
            description="For focus, healing, and relaxation"
            icon={<Headphones className="h-8 w-8" />}
            href="/library/meditations"
            color="bg-teal-50"
            count={videoLibrary.filter(video => video.type === 'meditation').length}
          />
          <CategoryCard
            title="Workout Sessions"
            description="HIIT, breathwork, and endurance training"
            icon={<Zap className="h-8 w-8" />}
            href="/library/workouts"
            color="bg-blue-50"
            count={videoLibrary.filter(video => video.type === 'workout').length}
          />
          <CategoryCard
            title="Knowledge Talks"
            description="Insights on mindset, productivity, and emotional intelligence"
            icon={<BookOpen className="h-8 w-8" />}
            href="/library/talks"
            color="bg-purple-50"
            count={videoLibrary.filter(video => video.type === 'talk').length}
          />
          <CategoryCard
            title="Focus Sounds"
            description="Binaural beats and sounds to enhance concentration"
            icon={<Waves className="h-8 w-8" />}
            href="/library/focus"
            color="bg-amber-50"
            count={videoLibrary.filter(video => video.type === 'focus').length}
          />
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Content</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <FeaturedAudio
              key={item.id}
              title={item.title}
              category={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              duration={item.duration}
              image={item.thumbnail}
              href={`/library/${item.type}s/${item.id}`}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recently Added</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item) => (
            <FeaturedAudio
              key={item.id}
              title={item.title}
              category={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              duration={item.duration}
              image={item.thumbnail}
              href={`/library/${item.type}s/${item.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
} 
import { Button } from "@/components/ui/button"
import { ChevronRight, Headphones, BookOpen, Zap, Waves } from "lucide-react"
import CategoryCard from "@/components/category-card"
import FeaturedAudio from "@/components/featured-audio"

export default function LibraryPage() {
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
            count={24}
          />
          <CategoryCard
            title="Workout Sessions"
            description="HIIT, breathwork, and endurance training"
            icon={<Zap className="h-8 w-8" />}
            href="/library/workouts"
            color="bg-blue-50"
            count={18}
          />
          <CategoryCard
            title="Knowledge Talks"
            description="Insights on mindset, productivity, and emotional intelligence"
            icon={<BookOpen className="h-8 w-8" />}
            href="/library/talks"
            color="bg-purple-50"
            count={32}
          />
          <CategoryCard
            title="Focus Sounds"
            description="Binaural beats and sounds to enhance concentration"
            icon={<Waves className="h-8 w-8" />}
            href="/library/focus"
            color="bg-amber-50"
            count={15}
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
          <FeaturedAudio
            title="Blissful Deep Relaxation"
            category="Meditation"
            duration="12 min"
            image="/placeholder.svg?height=200&width=400"
            href="/library/meditations/blissful-deep-relaxation"
          />
          <FeaturedAudio
            title="Power HIIT Workout"
            category="Workout"
            duration="25 min"
            image="/placeholder.svg?height=200&width=400"
            href="/library/workouts/power-hiit"
          />
          <FeaturedAudio
            title="Productivity Mastery"
            category="Knowledge Talk"
            duration="18 min"
            image="/placeholder.svg?height=200&width=400"
            href="/library/talks/productivity-mastery"
          />
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
          <FeaturedAudio
            title="Focus Meditation with Music"
            category="Meditation"
            duration="15 min"
            image="/placeholder.svg?height=200&width=400"
            href="/library/meditations/focus-meditation-with-music"
          />
          <FeaturedAudio
            title="Alpha Waves for Focus"
            category="Focus Sound"
            duration="60 min"
            image="/placeholder.svg?height=200&width=400"
            href="/library/focus/alpha-waves"
          />
          <FeaturedAudio
            title="Emotional Intelligence"
            category="Knowledge Talk"
            duration="22 min"
            image="/placeholder.svg?height=200&width=400"
            href="/library/talks/emotional-intelligence"
          />
        </div>
      </section>
    </div>
  )
} 
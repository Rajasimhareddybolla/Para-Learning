import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

interface FeaturedAudioProps {
  title: string;
  category: string;
  duration: string;
  image: string;
  href: string;
}

export default function FeaturedAudio({
  title,
  category,
  duration,
  image,
  href
}: FeaturedAudioProps) {
  return (
    <Link href={href} className="group">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
        {title}
      </h3>
      <div className="flex items-center text-sm text-muted-foreground mt-1">
        <span className="flex items-center mr-4">
          <Clock className="mr-1 h-4 w-4" />
          {duration}
        </span>
        <span>{category}</span>
      </div>
    </Link>
  )
} 
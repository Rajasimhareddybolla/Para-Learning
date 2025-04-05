import Link from "next/link"
import { ReactNode } from "react"

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: string;
  count: number;
}

export default function CategoryCard({
  title,
  description,
  icon,
  href,
  color,
  count
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`block p-6 rounded-xl ${color} hover:opacity-90 transition-opacity`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        {count} sessions
      </div>
    </Link>
  )
} 
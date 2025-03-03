import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
interface CategoryCardProps {
  title: string
  description: string
  image: string
  href: string
}

export default function CategoryCard({ title, description, image, href }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-black/30 transition-all group-hover:bg-black/40" />
      <Image src={image || "/placeholder.svg"} alt={title} width={800} height={600} className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <h3 className="mb-2 text-2xl font-bold">{title}</h3>
        <p className="mb-6 max-w-xs text-white/90">{description}</p>
        <Button asChild className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
          <Link href={href}>
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

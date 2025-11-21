import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface TestimonialAuthor {
  name: string
  handle?: string
  avatar?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex w-[320px] flex-col gap-4 rounded-xl border border-purple-500/20 bg-black/40 p-6 backdrop-blur-sm",
        "transition-all duration-300 hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10",
        "cursor-pointer",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-300">{text}</p>
      </div>

      <div className="flex items-center gap-3">
        {author.avatar && (
          <div className="h-10 w-10 overflow-hidden rounded-full border border-purple-500/20">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-white">{author.name}</p>
          </div>
          {author.handle && (
            <p className="text-xs text-purple-400">
              {href ? (
                <Link href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {author.handle}
                </Link>
              ) : (
                author.handle
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

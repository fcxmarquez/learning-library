"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ItemCardProps {
  title: string
  description: string
  tags: string[]
  href: string
  className?: string
}

export function ItemCard({
  title,
  description,
  tags,
  href,
  className,
}: ItemCardProps) {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "group h-full transition-all hover:shadow-md hover:border-foreground/20",
          className
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        {tags.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

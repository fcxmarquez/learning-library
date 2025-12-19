"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  className?: string
}

export function SectionCard({
  title,
  description,
  href,
  icon,
  className,
}: SectionCardProps) {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "group h-full transition-all hover:shadow-md hover:border-foreground/20",
          className
        )}
      >
        <CardHeader>
          <div className="mb-2 text-muted-foreground group-hover:text-foreground transition-colors">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        return (
          <Badge
            key={tag}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors",
              isSelected && "bg-primary text-primary-foreground"
            )}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        )
      })}
    </div>
  )
}

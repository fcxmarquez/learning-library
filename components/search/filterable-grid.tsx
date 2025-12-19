"use client"

import { useState, useMemo } from "react"
import { SearchInput } from "./search-input"
import { TagFilter } from "./tag-filter"
import { ItemCard } from "@/components/cards/item-card"
import { CardGrid } from "@/components/cards/card-grid"
import { filterBySearch, filterByTags, getAllTags } from "@/lib/utils"

interface Item {
  slug: string
  title: string
  description: string
  tags: string[]
}

interface FilterableGridProps {
  items: Item[]
  basePath: string
  emptyMessage?: string
}

export function FilterableGrid({
  items,
  basePath,
  emptyMessage = "No items found",
}: FilterableGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = useMemo(() => getAllTags(items), [items])

  const filteredItems = useMemo(() => {
    let result = items
    result = filterBySearch(result, searchQuery)
    result = filterByTags(result, selectedTags)
    return result
  }, [items, searchQuery, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
      </div>

      {allTags.length > 0 && (
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />
      )}

      {filteredItems.length > 0 ? (
        <CardGrid>
          {filteredItems.map((item) => (
            <ItemCard
              key={item.slug}
              title={item.title}
              description={item.description}
              tags={item.tags}
              href={`${basePath}/${item.slug}`}
            />
          ))}
        </CardGrid>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          {emptyMessage}
        </p>
      )}
    </div>
  )
}

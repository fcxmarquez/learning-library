import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterBySearch<T extends { title: string; description: string }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return items

  const lowerQuery = query.toLowerCase()
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  )
}

export function filterByTags<T extends { tags: string[] }>(
  items: T[],
  selectedTags: string[]
): T[] {
  if (selectedTags.length === 0) return items

  return items.filter((item) =>
    selectedTags.some((tag) => item.tags.includes(tag))
  )
}

export function getAllTags<T extends { tags: string[] }>(items: T[]): string[] {
  const tagSet = new Set<string>()
  items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

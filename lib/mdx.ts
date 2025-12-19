import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { ResourceMetadata } from "@/types"

const RESOURCES_PATH = path.join(process.cwd(), "content/resources")

export function getResourceSlugs(): string[] {
  if (!fs.existsSync(RESOURCES_PATH)) {
    return []
  }
  return fs
    .readdirSync(RESOURCES_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getResourceBySlug(slug: string): {
  metadata: ResourceMetadata
  content: string
} | null {
  const filePath = path.join(RESOURCES_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    metadata: {
      slug,
      title: data.title || slug,
      description: data.description || "",
      tags: data.tags || [],
    },
    content,
  }
}

export function getAllResources(): ResourceMetadata[] {
  const slugs = getResourceSlugs()
  return slugs
    .map((slug) => {
      const resource = getResourceBySlug(slug)
      return resource?.metadata
    })
    .filter((r): r is ResourceMetadata => r !== undefined)
}

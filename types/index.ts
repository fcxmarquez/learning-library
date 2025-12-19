export interface ResourceMetadata {
  slug: string
  title: string
  description: string
  tags: string[]
}

export interface ArtifactMetadata {
  slug: string
  title: string
  description: string
  tags: string[]
}

export type SectionType = "resources" | "algorithms" | "frontend-examples"

import { ArtifactMetadata } from "@/types"

// Registry of algorithm artifacts
// Add new algorithms here as they are created
export const algorithmRegistry: Record<
  string,
  {
    metadata: ArtifactMetadata
    component: () => Promise<{ default: React.ComponentType }>
  }
> = {
  "bubble-sort": {
    metadata: {
      slug: "bubble-sort",
      title: "Bubble Sort",
      description:
        "Interactive visualization of the bubble sort algorithm with step-by-step animation",
      tags: ["sorting", "beginner", "comparison"],
    },
    component: () => import("@/artifacts/algorithms/bubble-sort"),
  },
  "merkle-tree": {
    metadata: {
      slug: "merkle-tree",
      title: "Merkle Tree",
      description:
        "Interactive visualization of Merkle trees with tamper detection demonstration",
      tags: ["data-structure", "cryptography", "blockchain", "hashing"],
    },
    component: () => import("@/artifacts/algorithms/merkle-tree"),
  },
}

// Registry of frontend example artifacts
export const frontendExamplesRegistry: Record<
  string,
  {
    metadata: ArtifactMetadata
    component: () => Promise<{ default: React.ComponentType }>
  }
> = {
  "intersection-observer": {
    metadata: {
      slug: "intersection-observer",
      title: "Intersection Observer",
      description:
        "Interactive demonstration of the Intersection Observer API for detecting element visibility",
      tags: ["javascript", "api", "scroll", "performance"],
    },
    component: () =>
      import("@/artifacts/frontend-examples/intersection-observer"),
  },
}

export function getAllAlgorithms(): ArtifactMetadata[] {
  return Object.values(algorithmRegistry).map((entry) => entry.metadata)
}

export function getAlgorithmBySlug(slug: string) {
  return algorithmRegistry[slug] || null
}

export function getAllFrontendExamples(): ArtifactMetadata[] {
  return Object.values(frontendExamplesRegistry).map((entry) => entry.metadata)
}

export function getFrontendExampleBySlug(slug: string) {
  return frontendExamplesRegistry[slug] || null
}

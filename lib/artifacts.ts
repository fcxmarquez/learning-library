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
}

// Registry of frontend example artifacts
export const frontendExamplesRegistry: Record<
  string,
  {
    metadata: ArtifactMetadata
    component: () => Promise<{ default: React.ComponentType }>
  }
> = {
  // Example:
  // "css-flexbox": {
  //   metadata: { slug: "css-flexbox", title: "CSS Flexbox", description: "...", tags: ["css"] },
  //   component: () => import("@/artifacts/frontend-examples/css-flexbox"),
  // },
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

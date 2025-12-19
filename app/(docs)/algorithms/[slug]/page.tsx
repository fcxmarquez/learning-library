"use client"

import { use, Suspense, lazy } from "react"
import { notFound } from "next/navigation"
import { getAlgorithmBySlug, getAllAlgorithms } from "@/lib/artifacts"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface AlgorithmPageProps {
  params: Promise<{ slug: string }>
}

function ArtifactLoader({ slug }: { slug: string }) {
  const algorithm = getAlgorithmBySlug(slug)

  if (!algorithm) {
    notFound()
  }

  const ArtifactComponent = lazy(algorithm.component)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {algorithm.metadata.title}
        </h1>
        {algorithm.metadata.description && (
          <p className="text-lg text-muted-foreground mb-4">
            {algorithm.metadata.description}
          </p>
        )}
        {algorithm.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {algorithm.metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="border rounded-lg p-6 bg-card">
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-10 w-48" />
            </div>
          }
        >
          <ArtifactComponent />
        </Suspense>
      </div>
    </div>
  )
}

export default function AlgorithmPage({ params }: AlgorithmPageProps) {
  const { slug } = use(params)

  return <ArtifactLoader slug={slug} />
}

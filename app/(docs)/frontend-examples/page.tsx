import { getAllFrontendExamples } from "@/lib/artifacts"
import { FilterableGrid } from "@/components/search"

export default function FrontendExamplesPage() {
  const examples = getAllFrontendExamples()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Frontend Examples</h1>
        <p className="text-muted-foreground mt-2">
          Practical frontend exercises and examples. Interactive artifacts to
          learn and experiment with web technologies.
        </p>
      </div>

      <FilterableGrid
        items={examples}
        basePath="/frontend-examples"
        emptyMessage="No examples yet. Check back soon!"
      />
    </div>
  )
}

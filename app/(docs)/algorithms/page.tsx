import { getAllAlgorithms } from "@/lib/artifacts"
import { FilterableGrid } from "@/components/search"

export default function AlgorithmsPage() {
  const algorithms = getAllAlgorithms()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Algorithms</h1>
        <p className="text-muted-foreground mt-2">
          Interactive visualizations to understand algorithms and data
          structures through animations and hands-on exploration.
        </p>
      </div>

      <FilterableGrid
        items={algorithms}
        basePath="/algorithms"
        emptyMessage="No algorithms yet. Check back soon!"
      />
    </div>
  )
}

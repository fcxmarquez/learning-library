import { getAllResources } from "@/lib/mdx"
import { FilterableGrid } from "@/components/search"

export default function ResourcesPage() {
  const resources = getAllResources()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground mt-2">
          A curated collection of articles, tools, and references for software
          engineering topics.
        </p>
      </div>

      <FilterableGrid
        items={resources}
        basePath="/resources"
        emptyMessage="No resources found. Add some MDX files to content/resources/"
      />
    </div>
  )
}

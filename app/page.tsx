import { SectionCard, CardGrid } from "@/components/cards"
import { BookOpen, Binary, Layout } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-5xl px-6 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Learning Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A personal collection of software engineering knowledge. Resources,
            interactive algorithm visualizations, and frontend examples to
            support continuous learning.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Explore</h2>
          <CardGrid>
            <SectionCard
              title="Resources"
              description="Curated collection of articles, tools, and references for different software engineering topics. Filter by tags and search by keywords."
              href="/resources"
              icon={<BookOpen className="h-8 w-8" />}
            />
            <SectionCard
              title="Algorithms & Data Structures"
              description="Interactive visualizations to understand algorithms and data structures. Learn through animations and hands-on exploration."
              href="/algorithms"
              icon={<Binary className="h-8 w-8" />}
            />
            <SectionCard
              title="Frontend Examples"
              description="Practical frontend exercises and examples. Interactive artifacts to learn and experiment with web technologies."
              href="/frontend-examples"
              icon={<Layout className="h-8 w-8" />}
            />
          </CardGrid>
        </section>
      </main>
    </div>
  )
}

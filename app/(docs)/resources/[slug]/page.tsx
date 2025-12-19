import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getResourceBySlug, getResourceSlugs } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"

interface ResourcePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getResourceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params
  const resource = getResourceBySlug(slug)

  if (!resource) {
    notFound()
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <header className="not-prose mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {resource.metadata.title}
        </h1>
        {resource.metadata.description && (
          <p className="text-lg text-muted-foreground mb-4">
            {resource.metadata.description}
          </p>
        )}
        {resource.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <MDXRemote source={resource.content} />
    </article>
  )
}

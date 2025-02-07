import { getProject, getProjects } from "@/lib/mdx"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const projects = await getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function Project({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none p-6">
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
            {project.frontmatter.title}
          </h1>
          {project.frontmatter.description && (
            <p className="text-xl text-muted-foreground">
              {project.frontmatter.description}
            </p>
          )}
        </div>
      </div>

      {project.frontmatter.demo && (
        <div className="not-prose mb-4">
          <a
            href={project.frontmatter.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            View Demo
          </a>
        </div>
      )}

      {project.content}
    </article>
  )
}

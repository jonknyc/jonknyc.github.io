import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"

export default async function BlogPost({
  params,
}: {
  params: { year: string; slug: string }
}) {
  const post = await getBlogPost(params.year, params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none p-6">
      <div className="mb-8">
        <time
          className="text-sm text-muted-foreground"
          dateTime={post.frontmatter.date}
        >
          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description && (
          <p className="text-xl text-muted-foreground">
            {post.frontmatter.description}
          </p>
        )}
      </div>
      {post.content}
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return Object.entries(posts).flatMap(([year, yearPosts]) =>
    yearPosts.map((post) => ({
      year,
      slug: post.slug,
    }))
  )
}

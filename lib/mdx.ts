import { readdir, readFile } from "fs/promises"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import path from "path"

export interface BlogPost {
  slug: string
  title: string
  date: string
  year: string
}

export interface Project {
  slug: string
  title: string
  icon: string
}

interface BlogFrontmatter {
  slug: string
  year: string
  title: string
  date: string
  description?: string
}

interface ProjectFrontmatter {
  slug: string
  title: string
  icon: string
  description?: string
  demo?: string
  github?: string
}

export async function getBlogPosts(): Promise<Record<string, BlogPost[]>> {
  const blogDir = path.join(process.cwd(), "content/blog")
  const years = await readdir(blogDir)

  const posts: Record<string, BlogPost[]> = {}

  for (const year of years) {
    const yearDir = path.join(blogDir, year)
    const files = await readdir(yearDir)

    posts[year] = await Promise.all(
      files.map(async (file) => {
        const content = await readFile(path.join(yearDir, file), "utf8")
        const { data } = matter(content)

        return {
          slug: file.replace(".mdx", ""),
          title: data.title,
          date: data.date,
          year,
        }
      })
    )
  }

  return posts
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), "content/projects")
  const files = await readdir(projectsDir)

  return Promise.all(
    files.map(async (file) => {
      const content = await readFile(path.join(projectsDir, file), "utf8")
      const { data } = matter(content)

      return {
        slug: file.replace(".mdx", ""),
        title: data.title,
        icon: data.icon,
      }
    })
  )
}

export async function getBlogPost(year: string, slug: string) {
  const filePath = path.join(process.cwd(), "content/blog", year, `${slug}.mdx`)
  const source = await readFile(filePath, "utf8")
  const { content, data } = matter(source)

  const { content: compiled } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
  })

  return {
    content: compiled,
    frontmatter: {
      ...data,
      slug,
      year,
    } as BlogFrontmatter,
  }
}

export async function getProject(slug: string) {
  const filePath = path.join(process.cwd(), "content/projects", `${slug}.mdx`)
  const source = await readFile(filePath, "utf8")
  const { content, data } = matter(source)

  const { content: compiled } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
  })

  return {
    content: compiled,
    frontmatter: {
      ...data,
      slug,
    } as ProjectFrontmatter,
  }
}

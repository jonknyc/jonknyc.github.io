"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { BlogPost } from "@/lib/mdx"
import { ChevronRight } from "lucide-react"

export function NavMain({ posts }: { posts: Record<string, BlogPost[]> }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Blog</SidebarGroupLabel>
      <SidebarMenu>
        {Object.entries(posts)
          .sort((a, b) => Number(b[0]) - Number(a[0])) // Sort years descending
          .map(([year, yearPosts]) => (
            <Collapsible
              key={year}
              asChild
              defaultOpen={year === new Date().getFullYear().toString()}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <span>{year}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {yearPosts.map((post) => (
                      <SidebarMenuSubItem key={post.slug}>
                        <SidebarMenuSubButton asChild>
                          <a href={`/blog/${year}/${post.slug}`}>
                            <span>{post.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

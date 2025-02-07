"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BlogPost, Project } from "@/lib/mdx"
import { NavHeader } from "./nav-header"
import { SocialLinks } from "./social-links"

export function AppSidebar({
  posts,
  projects,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  posts: Record<string, BlogPost[]>
  projects: Project[]
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain posts={posts} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <SocialLinks />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

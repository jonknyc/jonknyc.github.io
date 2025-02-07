"use client"

import linkedinPhoto from "@/assets/linkedin-photo.jpeg"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavHeader() {
  const { state } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={linkedinPhoto.src}
          alt="Jonathan Kennell"
          className="aspect-square rounded-lg"
        />
      </SidebarMenuItem>
      <SidebarMenuItem className="flex justify-center font-semibold text-xl">
        {state === "expanded" ? "Jonathan Kennell" : "JK"}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

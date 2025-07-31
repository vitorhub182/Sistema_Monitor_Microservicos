// Utilizado como base: https://ui.shadcn.com/blocks/sidebar#sidebar-16
// An inset sidebar with secondary navigation.
//  
"use client"

import * as React from "react"
import {
  ChartArea,
  Command,
  Logs,
  Settings2,
  Waypoints,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Usuario",
    email: "tecnicovitordias@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Grafos",
      icon: Waypoints,
      isActive: true,
      items: [
        {
          title: "Detalhado",
          url: "/grafo/detalhado",
        },
        {
          title: "Simplificado",
          url: "/grafo/simplificado",
        },
        {
          title: "Topográfico",
          url: "/grafo/topografico",
        },
      ],
    },
    {
      title: "Métricas",
      icon: ChartArea,
      isActive: true,
      items: [
        {
          title: "Falhas",
          url: "/metrica/falhas",
        },
        {
          title: "Totais",
          url: "/metrica/totais",
        },
      ],
    },
    {
        title: "Logs",
        icon: Logs,
        isActive: true,
        items: [
          {
            title: "Serviço",
            url: "/log",
          },
        ],
      },
    
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (


    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Monitor</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { useAuth } from "@/components/authProvider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import NavLink, { NonUserLinks } from "./layout/NavLinks"
import Link from "next/link"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const auth = useAuth()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Added from cfe */}
      <SidebarContent>
        {NavLink.map((navLinkItem, idx) => {
          const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired
          return  shouldHide ? null : 
            <Link
              key={`nav-links-a-${idx}`}
              href={navLinkItem.href || '#'}
              className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted"
            >
              <span>{navLinkItem.label}</span>
            </Link>
          
        })}
        {auth.isAuthenticated && (
          <Link href="/logout" className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted">
            Logout
          </Link>
        )}
         {NonUserLinks.map((navLinkItem, idx) => {
          const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired
          return  shouldHide ? null : 
            <Link
              key={`nav-links-b-${idx}`}
              href={navLinkItem.href || '#'}
              className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted"
            >
              <span>{navLinkItem.label}</span>
            </Link>
          
        })}       
          
        
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <div className="mt-auto px-3 pb-4">
          <ul role="list" className="space-y-1">
            {data.navSecondary.map((item) => {
              // render Settings only when authenticated
              if (item.title === "Settings" && !auth.isAuthenticated) {
                return null
              }

              return (
                <li key={item.title}>
                  <button
                    onClick={() => (window.location.href = item.url)}
                    className="group w-full flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted"
                  >
                    <item.icon className="!size-4" />
                    <span className="truncate">{item.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

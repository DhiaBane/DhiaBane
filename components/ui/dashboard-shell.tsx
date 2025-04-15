"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  BookOpen,
  Package,
  Users,
  Calendar,
  UserCircle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Gift,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarNavProps {
  items: {
    href: string
    title: string
    icon: ReactNode
  }[]
  className?: string
}

function SidebarNav({ items, className }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent"
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

interface DashboardShellProps {
  children: ReactNode
  restaurantId?: string
}

export function DashboardShell({ children, restaurantId = "1" }: DashboardShellProps) {
  const isMobile = useMobile()

  const sidebarItems = [
    {
      href: `/dashboard/${restaurantId}`,
      title: "Tableau de bord",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/tables`,
      title: "Tables",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/orders`,
      title: "Commandes",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/menu`,
      title: "Menu",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/inventory`,
      title: "Inventaire",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/staff`,
      title: "Personnel",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/reservations`,
      title: "Réservations",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/customers`,
      title: "Clients",
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/promotions`,
      title: "Promotions",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/analytics`,
      title: "Analyses",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${restaurantId}/settings`,
      title: "Paramètres",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b pb-4">
                <div className="font-semibold">RestauPilot</div>
              </div>
              <SidebarNav items={sidebarItems} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold">
            RestauPilot
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="w-72 border-r bg-muted/40">
            <div className="flex flex-col gap-6 p-6">
              <SidebarNav items={sidebarItems} />
            </div>
          </aside>
        )}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

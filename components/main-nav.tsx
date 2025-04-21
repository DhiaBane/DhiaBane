"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Accueil" },
    { href: "/reservations", label: "Réservations" },
    { href: "/menu", label: "Menu" },
    { href: "/commandes", label: "Commandes" },
    { href: "/inventaire", label: "Inventaire" },
    { href: "/personnel", label: "Personnel" },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

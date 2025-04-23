"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HomeIcon,
  MenuIcon,
  UserIcon,
  HistoryIcon,
  GiftIcon,
  LogOutIcon,
  CreditCardIcon,
  SettingsIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function MainNav() {
  const pathname = usePathname()
  const isMobile = useMobile()

  const routes = [
    {
      href: "/",
      label: "Accueil",
      icon: <HomeIcon className="h-4 w-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Tableau de bord",
      icon: <SettingsIcon className="h-4 w-4 mr-2" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/shared-bills",
      label: "Partages",
      icon: <HistoryIcon className="h-4 w-4 mr-2" />,
      active: pathname === "/shared-bills",
    },
    {
      href: "/gift-cards",
      label: "Cartes cadeaux",
      icon: <GiftIcon className="h-4 w-4 mr-2" />,
      active: pathname === "/gift-cards",
    },
    {
      href: "/payment",
      label: "Paiements",
      icon: <CreditCardIcon className="h-4 w-4 mr-2" />,
      active: pathname === "/payment",
    },
  ]

  if (isMobile) {
    return (
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <UtensilsIcon className="h-6 w-6" />
            <span className="font-bold">RestoPilote</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="mb-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-2">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        route.active ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  ))}
                  <Link
                    href="/profile"
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === "/profile" ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profil
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <UserDropdown />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <UtensilsIcon className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">RestoPilote</span>
        </Link>
        <nav className="flex items-center space-x-1 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                route.active ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              {route.icon}
              <span className="hidden md:inline">{route.label}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Utilisateur</p>
            <p className="text-xs leading-none text-muted-foreground">utilisateur@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            Profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/phone-login" className="cursor-pointer flex items-center text-destructive">
            <LogOutIcon className="h-4 w-4 mr-2" />
            Se déconnecter
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UtensilsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}

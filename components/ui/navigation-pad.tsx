"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HomeIcon, LayoutDashboardIcon, HistoryIcon, GiftIcon, UserIcon, QrCodeIcon, XIcon } from "lucide-react"

export function NavigationPad() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navigate = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
        <QrCodeIcon className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="bg-background rounded-lg shadow-lg p-4 grid grid-cols-3 gap-2 border">
      <Button
        variant="ghost"
        size="icon"
        className="aspect-square flex flex-col items-center justify-center"
        onClick={() => navigate("/")}
      >
        <HomeIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Accueil</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="aspect-square flex flex-col items-center justify-center"
        onClick={() => navigate("/dashboard")}
      >
        <LayoutDashboardIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Tableau</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="aspect-square flex flex-col items-center justify-center"
        onClick={() => navigate("/shared-bills")}
      >
        <HistoryIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Partages</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="aspect-square flex flex-col items-center justify-center"
        onClick={() => navigate("/gift-cards")}
      >
        <GiftIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Cadeaux</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="aspect-square flex flex-col items-center justify-center"
        onClick={() => navigate("/profile")}
      >
        <UserIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Profil</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="aspect-square flex flex-col items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <XIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Fermer</span>
      </Button>
    </div>
  )
}

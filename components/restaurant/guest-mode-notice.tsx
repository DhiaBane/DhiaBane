"use client"

import { useState } from "react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { InfoIcon, XIcon } from "lucide-react"

export function GuestModeNotice() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert className="mb-6 pr-12 relative">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Mode invité</AlertTitle>
      <AlertDescription>
        Vous naviguez en mode invité. Créez un compte pour bénéficier de promotions exclusives, suivre vos commandes et
        gagner des points de fidélité.
      </AlertDescription>
      <Button asChild variant="outline" size="sm" className="mt-2">
        <Link href="/auth/phone-login">Créer un compte</Link>
      </Button>
      <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => setDismissed(true)}>
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Fermer</span>
      </Button>
    </Alert>
  )
}

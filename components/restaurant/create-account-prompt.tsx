"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserPlusIcon, UserIcon } from "lucide-react"

interface CreateAccountPromptProps {
  isOpen: boolean
  onClose: () => void
  onCreateAccount: () => void
  onContinueAsGuest: () => void
}

export function CreateAccountPrompt({ isOpen, onClose, onCreateAccount, onContinueAsGuest }: CreateAccountPromptProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un compte</DialogTitle>
          <DialogDescription>Créez un compte pour bénéficier d'avantages exclusifs</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <UserPlusIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Avantages d'un compte</h3>
                <p className="text-sm text-muted-foreground">
                  Créez un compte pour suivre vos commandes, bénéficier de promotions exclusives et gagner des points de
                  fidélité.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <UserIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Continuer en tant qu'invité</h3>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez continuer sans créer de compte, mais vous ne bénéficierez pas des avantages exclusifs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onContinueAsGuest} className="sm:flex-1">
            Continuer en tant qu'invité
          </Button>
          <Button onClick={onCreateAccount} className="sm:flex-1">
            Créer un compte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

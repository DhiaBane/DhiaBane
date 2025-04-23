"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircleIcon, Loader2Icon, LogOutIcon, TrashIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { logout, deleteAccount } from "@/actions/auth-actions"
import { useRouter } from "next/navigation"

export default function AccountSettingsForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      const result = await logout()

      if (result.success) {
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès",
        })
        router.push("/auth/phone-login")
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la déconnexion",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error logging out:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirmText !== "SUPPRIMER") {
      toast({
        title: "Confirmation incorrecte",
        description: 'Veuillez saisir "SUPPRIMER" pour confirmer la suppression de votre compte',
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await deleteAccount()

      if (result.success) {
        toast({
          title: "Compte supprimé",
          description: "Votre compte a été supprimé avec succès",
        })
        router.push("/auth/phone-login")
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la suppression du compte",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error deleting account:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du compte",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du compte</CardTitle>
          <CardDescription>Gérez les paramètres de votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Session</h3>
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <LogOutIcon className="h-4 w-4" />}
              Se déconnecter
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-destructive">Zone de danger</h3>
            <p className="text-sm text-muted-foreground">
              Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. Soyez certain.
            </p>
            <Button
              variant="destructive"
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <TrashIcon className="h-4 w-4" />
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Elle supprimera définitivement votre compte et toutes les données associées
              de nos serveurs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center p-4 border rounded-lg bg-destructive/10">
              <AlertCircleIcon className="h-5 w-5 text-destructive mr-2 flex-shrink-0" />
              <p className="text-sm text-destructive">
                Toutes vos données personnelles, historiques de commandes, réservations et préférences seront supprimées
                définitivement.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">
                Saisissez <span className="font-semibold">SUPPRIMER</span> pour confirmer
              </Label>
              <Input
                id="confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SUPPRIMER"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={confirmText !== "SUPPRIMER" || isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer définitivement"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

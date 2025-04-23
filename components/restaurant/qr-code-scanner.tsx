"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { QrCodeIcon, ScanIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function QrCodeScanner() {
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [manualCode, setManualCode] = useState("")

  const startScanner = async () => {
    try {
      // Vérifier si l'API navigator.mediaDevices est disponible
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasPermission(false)
        return
      }

      // Demander la permission d'accéder à la caméra
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      setHasPermission(true)
      setIsScanning(true)

      // Dans une application réelle, nous initialiserions ici un scanner de QR code
      // Pour cette démo, nous simulons juste l'activation du scanner

      // Simuler la détection d'un QR code après 3 secondes
      setTimeout(() => {
        // Simuler un code QR détecté
        handleQrCodeDetected("REST123")

        // Nettoyer le stream
        stream.getTracks().forEach((track) => track.stop())
      }, 3000)

      // Nettoyer le stream quand on a fini
      return () => {
        stream.getTracks().forEach((track) => track.stop())
      }
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err)
      setHasPermission(false)
    }
  }

  const handleQrCodeDetected = (code: string) => {
    // Fermer le scanner
    setIsScanning(false)
    setIsOpen(false)

    toast({
      title: "QR Code détecté",
      description: `Code restaurant: ${code}`,
    })

    // Rediriger vers la page du restaurant
    // Dans une application réelle, nous ferions une recherche du restaurant par code
    router.push(`/restaurants/1/menu?mode=guest`)
  }

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualCode.trim()) return

    handleQrCodeDetected(manualCode)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setIsScanning(false)
    }
  }

  return (
    <>
      <Button size="lg" className="gap-2" onClick={() => setIsOpen(true)}>
        <QrCodeIcon className="h-5 w-5" />
        Scanner un QR code
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scanner un QR code</DialogTitle>
            <DialogDescription>Scannez le QR code du restaurant pour accéder au menu et commander</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center p-6">
            {hasPermission === false && (
              <div className="text-center mb-4 text-red-500">
                <p>Impossible d'accéder à la caméra. Veuillez vérifier les permissions.</p>
              </div>
            )}

            {isScanning ? (
              <div className="w-full aspect-square bg-gray-100 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Simuler un viseur de scanner */}
                  <div className="w-3/4 h-3/4 border-2 border-primary rounded-md animate-pulse"></div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
                  Positionnez le QR code dans le cadre
                </div>
              </div>
            ) : (
              <Button onClick={startScanner} className="mb-4 gap-2">
                <ScanIcon className="h-4 w-4" />
                Activer la caméra
              </Button>
            )}

            <form onSubmit={handleManualCodeSubmit} className="w-full mt-6">
              <p className="text-sm text-muted-foreground mb-2 text-center">
                Vous pouvez également saisir manuellement le code du restaurant
              </p>
              <div className="flex gap-2">
                <Input value={manualCode} onChange={(e) => setManualCode(e.target.value)} placeholder="Ex: REST123" />
                <Button type="submit">Valider</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

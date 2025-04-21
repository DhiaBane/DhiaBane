"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSofiaVoiceCommands } from "@/utils/voice-commands"

export function VoiceCommandsHelp() {
  const [open, setOpen] = useState(false)

  // Obtenir les commandes vocales de base (sans les actions réelles)
  const baseCommands = getSofiaVoiceCommands({
    stopListening: () => {},
    repeatLastMessage: () => {},
    clearMessages: () => {},
    pauseResumeAudio: () => {},
    stopAudio: () => {},
  })

  // Ajouter les commandes spécifiques au domaine de la restauration
  const restaurantCommands = [
    {
      name: "what-is-today-menu",
      patterns: ["quel est le menu du jour", "menu du jour", "dis moi le menu du jour"],
      description: "Affiche le menu du jour",
    },
    {
      name: "order-stock",
      patterns: ["commander du stock", "réapprovisionner les stocks", "commander les produits"],
      description: "Lance une commande de réapprovisionnement",
    },
    {
      name: "performance-analysis",
      patterns: ["analyse des performances", "résumé des ventes", "donne moi les statistiques"],
      description: "Affiche un résumé des performances",
    },
  ]

  // Transformer les commandes pour l'affichage
  const displayCommands = [
    ...baseCommands.map((cmd) => ({
      name: cmd.name,
      patterns: cmd.patterns,
      description: cmd.feedback || "Commande système",
    })),
    ...restaurantCommands,
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Commandes vocales disponibles</DialogTitle>
          <DialogDescription>
            Vous pouvez utiliser ces commandes vocales pour interagir avec Sofia. Commencez par dire "Sofia" ou "Hey
            Sofia" pour activer les commandes.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Phrases d'activation</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayCommands.map((command) => (
              <TableRow key={command.name}>
                <TableCell className="font-medium">{command.name}</TableCell>
                <TableCell>{command.patterns.join(", ")}</TableCell>
                <TableCell>{command.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

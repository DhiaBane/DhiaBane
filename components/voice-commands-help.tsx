"use client"

import { useState, useEffect } from "react"
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

export function VoiceCommandsHelp() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [commands, setCommands] = useState<any[]>([])

  // Check if we're in the browser
  useEffect(() => {
    setMounted(true)

    // Only try to load commands on the client side
    if (typeof window !== "undefined") {
      // Import voice commands utility
      import("@/utils/voice-commands")
        .then((module) => {
          // Get basic commands without real actions
          const baseCommands = module.getSofiaVoiceCommands({
            stopListening: () => {},
            repeatLastMessage: () => {},
            clearMessages: () => {},
            pauseResumeAudio: () => {},
            stopAudio: () => {},
          })

          // Add restaurant-specific commands
          const restaurantCommands = [
            {
              name: "daily-report",
              patterns: ["rapport journalier", "rapport du jour", "bilan journalier"],
              description: "Affiche le rapport journalier",
            },
            {
              name: "profit-analysis",
              patterns: ["analyse des marges", "plats les moins rentables", "marges faibles"],
              description: "Analyse les marges des plats",
            },
            {
              name: "anomaly-detection",
              patterns: ["détection d'anomalies", "problèmes détectés", "baisse de performance"],
              description: "Recherche des anomalies",
            },
          ]

          // Transform commands for display
          const displayCommands = [
            ...baseCommands.map((cmd) => ({
              name: cmd.name,
              patterns: cmd.patterns,
              description: cmd.feedback || "Commande système",
            })),
            ...restaurantCommands,
          ]

          setCommands(displayCommands)
        })
        .catch((err) => {
          console.error("Failed to load voice commands utilities:", err)
          setCommands([])
        })
    }
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <HelpCircle className="h-4 w-4" />
      </Button>
    )
  }

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
            {commands.map((command, index) => (
              <TableRow key={index}>
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

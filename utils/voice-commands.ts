export interface VoiceCommand {
  name: string
  patterns: string[]
  action: () => void
  feedback?: string
}

/**
 * Détecte si une commande vocale est présente dans le texte
 * @param text Texte à analyser
 * @param commands Liste des commandes vocales
 * @returns La commande détectée ou null
 */
export function detectVoiceCommand(text: string, commands: VoiceCommand[]): VoiceCommand | null {
  // Convertir le texte en minuscules pour une comparaison insensible à la casse
  const lowerText = text.toLowerCase()

  // Vérifier si le texte commence par "sofia" ou "hey sofia"
  const hasSofiaPrefix = lowerText.startsWith("sofia") || lowerText.startsWith("hey sofia")

  // Parcourir toutes les commandes
  for (const command of commands) {
    // Parcourir tous les modèles de la commande
    for (const pattern of command.patterns) {
      // Si le texte contient le modèle (avec ou sans préfixe "sofia")
      if (lowerText.includes(pattern.toLowerCase()) || (hasSofiaPrefix && lowerText.includes(pattern.toLowerCase()))) {
        return command
      }
    }
  }

  return null
}

/**
 * Nettoie le texte en supprimant les commandes vocales
 * @param text Texte à nettoyer
 * @param commands Liste des commandes vocales
 * @returns Texte nettoyé
 */
export function cleanTextFromCommands(text: string, commands: VoiceCommand[]): string {
  let cleanedText = text

  // Supprimer les préfixes "sofia" et "hey sofia"
  cleanedText = cleanedText.replace(/^sofia\s+/i, "")
  cleanedText = cleanedText.replace(/^hey sofia\s+/i, "")

  // Supprimer les modèles de commandes
  for (const command of commands) {
    for (const pattern of command.patterns) {
      cleanedText = cleanedText.replace(new RegExp(pattern, "gi"), "")
    }
  }

  return cleanedText.trim()
}

/**
 * Obtient les commandes vocales de base pour Sofia
 * @param actions Actions à exécuter pour chaque commande
 * @returns Liste des commandes vocales
 */
export function getSofiaVoiceCommands({
  stopListening,
  repeatLastMessage,
  clearMessages,
  pauseResumeAudio,
  stopAudio,
}: {
  stopListening: () => void
  repeatLastMessage: () => void
  clearMessages: () => void
  pauseResumeAudio: () => void
  stopAudio: () => void
}): VoiceCommand[] {
  return [
    {
      name: "stop-listening",
      patterns: ["arrête d'écouter", "stop", "arrête", "fin de l'écoute"],
      action: stopListening,
      feedback: "J'arrête d'écouter.",
    },
    {
      name: "repeat",
      patterns: ["répète", "redis", "répète ta réponse", "redis ta réponse"],
      action: repeatLastMessage,
      feedback: "Je répète ma réponse.",
    },
    {
      name: "clear",
      patterns: ["efface", "nettoie", "efface la conversation", "recommence"],
      action: clearMessages,
      feedback: "J'efface la conversation.",
    },
    {
      name: "pause-resume",
      patterns: ["pause", "reprends", "continue", "pause audio", "reprends audio"],
      action: pauseResumeAudio,
      feedback: "Je mets en pause ou reprends l'audio.",
    },
    {
      name: "stop-audio",
      patterns: ["arrête l'audio", "stop audio", "silence", "tais-toi"],
      action: stopAudio,
      feedback: "J'arrête l'audio.",
    },
    {
      name: "help",
      patterns: ["aide", "aide-moi", "commandes", "quelles sont les commandes"],
      action: () => {
        // Cette commande sera gérée directement dans le composant
      },
      feedback: "Voici les commandes disponibles.",
    },
  ]
}

/**
 * Nettoie le texte Markdown pour la synthèse vocale
 * @param text Texte à nettoyer
 * @returns Texte nettoyé
 */
export function cleanTextForSpeech(text: string): string {
  // Supprimer les liens Markdown
  let cleanedText = text.replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1")

  // Supprimer les balises de code
  cleanedText = cleanedText.replace(/```[\s\S]*?```/g, "")
  cleanedText = cleanedText.replace(/`([^`]+)`/g, "$1")

  // Supprimer les titres Markdown
  cleanedText = cleanedText.replace(/#{1,6}\s+(.+)/g, "$1")

  // Supprimer les listes à puces et numérotées
  cleanedText = cleanedText.replace(/^\s*[-*+]\s+/gm, "")
  cleanedText = cleanedText.replace(/^\s*\d+\.\s+/gm, "")

  // Supprimer les caractères spéciaux Markdown
  cleanedText = cleanedText.replace(/[*_~]/g, "")

  // Supprimer les tableaux Markdown
  cleanedText = cleanedText.replace(/\|.*\|/g, "")
  cleanedText = cleanedText.replace(/\|[-:]+\|/g, "")

  // Supprimer les citations
  cleanedText = cleanedText.replace(/^\s*>\s+/gm, "")

  // Supprimer les espaces multiples
  cleanedText = cleanedText.replace(/\s+/g, " ")

  // Supprimer les sauts de ligne multiples
  cleanedText = cleanedText.replace(/\n+/g, "\n")

  return cleanedText.trim()
}

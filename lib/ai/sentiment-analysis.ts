// Analyse de sentiment pour les avis clients et les médias sociaux

export interface SentimentAnalysisResult {
  score: number // -1 (très négatif) à 1 (très positif)
  magnitude: number // 0 (neutre) à +∞ (forte émotion)
  categories: {
    category: string
    score: number
  }[]
  entities: {
    name: string
    type: "FOOD" | "SERVICE" | "AMBIANCE" | "PRICE" | "STAFF" | "OTHER"
    sentiment: number
    mentions: number
  }[]
  language: string
  summary: string
}

export interface ReviewData {
  id: string
  source: "google" | "tripadvisor" | "yelp" | "facebook" | "internal" | "other"
  text: string
  rating?: number // 1-5
  date: Date
  author?: string
  response?: string
}

export interface SocialMediaPost {
  id: string
  platform: "twitter" | "instagram" | "facebook" | "tiktok" | "other"
  text: string
  date: Date
  author: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  mediaUrls?: string[]
}

// Fonction simulée d'analyse de sentiment pour les avis
export async function analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
  // Simulation d'analyse de sentiment
  // Dans un environnement réel, cela appellerait une API d'IA comme Google Cloud NLP ou Azure Text Analytics

  // Génération d'un score de sentiment basé sur des mots clés simples
  const positiveWords = [
    "excellent",
    "délicieux",
    "parfait",
    "superbe",
    "génial",
    "recommande",
    "savoureux",
    "attentionné",
  ]
  const negativeWords = ["mauvais", "décevant", "attente", "froid", "cher", "médiocre", "service lent", "erreur"]

  const lowerText = text.toLowerCase()

  let positiveCount = 0
  let negativeCount = 0

  positiveWords.forEach((word) => {
    if (lowerText.includes(word.toLowerCase())) positiveCount++
  })

  negativeWords.forEach((word) => {
    if (lowerText.includes(word.toLowerCase())) negativeCount++
  })

  const totalWords = text.split(/\s+/).length
  const score = (positiveCount - negativeCount) / Math.max(1, Math.min(totalWords / 5, 10))
  const clampedScore = Math.max(-1, Math.min(1, score))

  // Détection des entités mentionnées
  const entities = []

  if (lowerText.match(/plat|nourriture|cuisine|menu|saveur|goût|repas/)) {
    entities.push({
      name: "Nourriture",
      type: "FOOD" as const,
      sentiment: Math.random() * 2 - 1,
      mentions: 1 + Math.floor(Math.random() * 3),
    })
  }

  if (lowerText.match(/service|serveur|serveuse|attente|rapide|lent/)) {
    entities.push({
      name: "Service",
      type: "SERVICE" as const,
      sentiment: Math.random() * 2 - 1,
      mentions: 1 + Math.floor(Math.random() * 2),
    })
  }

  if (lowerText.match(/ambiance|décor|atmosphère|musique|bruit|calme/)) {
    entities.push({
      name: "Ambiance",
      type: "AMBIANCE" as const,
      sentiment: Math.random() * 2 - 1,
      mentions: 1 + Math.floor(Math.random() * 2),
    })
  }

  if (lowerText.match(/prix|cher|abordable|coûteux|value|rapport qualité/)) {
    entities.push({
      name: "Prix",
      type: "PRICE" as const,
      sentiment: Math.random() * 2 - 1,
      mentions: 1,
    })
  }

  if (lowerText.match(/personnel|staff|équipe|serveur|manager|chef/)) {
    entities.push({
      name: "Personnel",
      type: "STAFF" as const,
      sentiment: Math.random() * 2 - 1,
      mentions: 1 + Math.floor(Math.random() * 2),
    })
  }

  // Catégories d'analyse
  const categories = [
    { category: "Satisfaction générale", score: clampedScore },
    { category: "Qualité de la nourriture", score: Math.random() * 2 - 1 },
    { category: "Qualité du service", score: Math.random() * 2 - 1 },
    { category: "Rapport qualité-prix", score: Math.random() * 2 - 1 },
    { category: "Ambiance", score: Math.random() * 2 - 1 },
  ]

  // Génération d'un résumé
  let summary = ""
  if (clampedScore > 0.5) {
    summary = "Avis très positif, particulièrement sur "
  } else if (clampedScore > 0) {
    summary = "Avis globalement positif, avec des points forts sur "
  } else if (clampedScore > -0.5) {
    summary = "Avis mitigé, avec des critiques concernant "
  } else {
    summary = "Avis négatif, avec des problèmes majeurs concernant "
  }

  // Ajout des entités les plus mentionnées au résumé
  const sortedEntities = [...entities].sort((a, b) => b.mentions - a.mentions)
  if (sortedEntities.length > 0) {
    const entityNames = sortedEntities.slice(0, 2).map((e) => e.name.toLowerCase())
    summary += entityNames.join(" et ") + "."
  } else {
    summary += "l'expérience globale."
  }

  return {
    score: clampedScore,
    magnitude: Math.abs(clampedScore) * (0.5 + Math.random() * 0.5), // Magnitude proportionnelle à l'intensité du sentiment
    categories,
    entities,
    language: "fr",
    summary,
  }
}

// Fonction pour analyser un ensemble d'avis
export async function analyzeReviews(reviews: ReviewData[]): Promise<{
  overallSentiment: number
  sentimentTrend: "improving" | "stable" | "declining"
  topPositiveTopics: string[]
  topNegativeTopics: string[]
  reviewsWithAnalysis: (ReviewData & { analysis: SentimentAnalysisResult })[]
}> {
  // Analyse chaque avis individuellement
  const reviewsWithAnalysis = await Promise.all(
    reviews.map(async (review) => ({
      ...review,
      analysis: await analyzeSentiment(review.text),
    })),
  )

  // Calcul du sentiment global
  const overallSentiment = reviewsWithAnalysis.reduce((sum, review) => sum + review.analysis.score, 0) / reviews.length

  // Détermination de la tendance
  // Dans un cas réel, on comparerait avec les périodes précédentes
  const sentimentTrend: "improving" | "stable" | "declining" =
    Math.random() > 0.6 ? "improving" : Math.random() > 0.5 ? "stable" : "declining"

  // Extraction des sujets positifs et négatifs
  const allEntities = reviewsWithAnalysis.flatMap((review) => review.analysis.entities)

  const positiveEntities = allEntities
    .filter((entity) => entity.sentiment > 0)
    .sort((a, b) => b.sentiment - a.sentiment)

  const negativeEntities = allEntities
    .filter((entity) => entity.sentiment < 0)
    .sort((a, b) => a.sentiment - b.sentiment)

  const topPositiveTopics = [...new Set(positiveEntities.slice(0, 5).map((e) => e.name))]
  const topNegativeTopics = [...new Set(negativeEntities.slice(0, 5).map((e) => e.name))]

  return {
    overallSentiment,
    sentimentTrend,
    topPositiveTopics,
    topNegativeTopics,
    reviewsWithAnalysis,
  }
}

// Fonction pour analyser les posts sur les réseaux sociaux
export async function analyzeSocialMedia(posts: SocialMediaPost[]): Promise<{
  overallSentiment: number
  engagement: number
  topMentions: string[]
  postsWithAnalysis: (SocialMediaPost & { analysis: SentimentAnalysisResult })[]
  recommendedResponses: {
    postId: string
    suggestedResponse: string
    priority: "high" | "medium" | "low"
  }[]
}> {
  // Analyse chaque post individuellement
  const postsWithAnalysis = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      analysis: await analyzeSentiment(post.text),
    })),
  )

  // Calcul du sentiment global
  const overallSentiment = postsWithAnalysis.reduce((sum, post) => sum + post.analysis.score, 0) / posts.length

  // Calcul de l'engagement moyen
  const engagement =
    postsWithAnalysis.reduce(
      (sum, post) => sum + post.engagement.likes + post.engagement.comments * 2 + post.engagement.shares * 3,
      0,
    ) / posts.length

  // Extraction des mentions les plus fréquentes
  const allEntities = postsWithAnalysis.flatMap((post) => post.analysis.entities)
  const entityCounts = allEntities.reduce(
    (counts, entity) => {
      counts[entity.name] = (counts[entity.name] || 0) + entity.mentions
      return counts
    },
    {} as Record<string, number>,
  )

  const topMentions = Object.entries(entityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)

  // Génération de réponses recommandées pour les posts négatifs ou à fort engagement
  const recommendedResponses = postsWithAnalysis
    .filter(
      (post) =>
        post.analysis.score < -0.3 || post.engagement.likes + post.engagement.comments + post.engagement.shares > 50,
    )
    .map((post) => {
      let suggestedResponse = ""
      let priority: "high" | "medium" | "low" = "medium"

      if (post.analysis.score < -0.5) {
        suggestedResponse =
          "Nous sommes désolés de votre expérience. Pourriez-vous nous contacter en message privé pour que nous puissions résoudre ce problème?"
        priority = "high"
      } else if (post.analysis.score < 0) {
        suggestedResponse =
          "Merci pour votre retour. Nous prenons note de vos commentaires pour améliorer notre service."
        priority = "medium"
      } else {
        suggestedResponse =
          "Merci beaucoup pour votre message! Nous sommes ravis que vous ayez apprécié votre expérience."
        priority = "low"
      }

      return {
        postId: post.id,
        suggestedResponse,
        priority,
      }
    })

  return {
    overallSentiment,
    engagement,
    topMentions,
    postsWithAnalysis,
    recommendedResponses,
  }
}

// Génération de menus et de recettes assistée par IA

export interface MenuGenerationOptions {
  cuisine: string
  dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "nut-free")[]
  mealType: "breakfast" | "lunch" | "dinner" | "brunch" | "tasting"
  priceRange: "budget" | "moderate" | "premium" | "luxury"
  seasonality?: "spring" | "summer" | "autumn" | "winter"
  includeWinePairings?: boolean
  courses: number
  themeOrOccasion?: string
}

export interface MenuItem {
  name: string
  description: string
  ingredients: string[]
  allergens: string[]
  dietary: string[]
  estimatedCost: number
  suggestedPrice: number
  preparationTime: number // minutes
  category: "starter" | "main" | "dessert" | "side" | "drink"
  winePairing?: string
}

export interface GeneratedMenu {
  title: string
  description: string
  items: MenuItem[]
  estimatedAverageCost: number
  suggestedAveragePrice: number
  preparationComplexity: "simple" | "moderate" | "complex"
  seasonalAvailability: string
  dietaryOverview: string[]
}

// Fonction simulée de génération de menu
export async function generateMenu(options: MenuGenerationOptions): Promise<GeneratedMenu> {
  // Dans un environnement réel, cela appellerait une API d'IA comme GPT-4 ou Claude

  // Simulation de génération de menu basée sur les options
  const menuItems: MenuItem[] = []
  let totalCost = 0
  let totalPrice = 0

  // Déterminer le titre et la description du menu
  let title = `Menu ${options.mealType.charAt(0).toUpperCase() + options.mealType.slice(1)}`
  if (options.cuisine) {
    title += ` ${options.cuisine.charAt(0).toUpperCase() + options.cuisine.slice(1)}`
  }
  if (options.themeOrOccasion) {
    title += ` - ${options.themeOrOccasion}`
  }

  let description = `Un menu ${options.courses} plats `
  if (options.cuisine) {
    description += `d'inspiration ${options.cuisine} `
  }
  if (options.seasonality) {
    description += `mettant en valeur les produits de ${options.seasonality} `
  }
  if (options.dietary && options.dietary.length > 0) {
    description += `adapté aux régimes ${options.dietary.join(", ")} `
  }

  // Générer les entrées
  if (options.courses >= 3 || options.mealType === "tasting") {
    const numStarters = options.mealType === "tasting" ? 2 : 1
    for (let i = 0; i < numStarters; i++) {
      const starter = generateMenuItem("starter", options)
      menuItems.push(starter)
      totalCost += starter.estimatedCost
      totalPrice += starter.suggestedPrice
    }
  }

  // Générer les plats principaux
  const numMains = options.mealType === "tasting" ? 3 : 1
  for (let i = 0; i < numMains; i++) {
    const main = generateMenuItem("main", options)
    menuItems.push(main)
    totalCost += main.estimatedCost
    totalPrice += main.suggestedPrice
  }

  // Générer les desserts
  if (options.courses >= 2) {
    const numDesserts = options.mealType === "tasting" ? 2 : 1
    for (let i = 0; i < numDesserts; i++) {
      const dessert = generateMenuItem("dessert", options)
      menuItems.push(dessert)
      totalCost += dessert.estimatedCost
      totalPrice += dessert.suggestedPrice
    }
  }

  // Ajouter des boissons si demandé
  if (options.includeWinePairings) {
    const drink = generateMenuItem("drink", options)
    menuItems.push(drink)
    totalCost += drink.estimatedCost
    totalPrice += drink.suggestedPrice
  }

  // Calculer les moyennes
  const avgCost = totalCost / menuItems.length
  const avgPrice = totalPrice / menuItems.length

  // Déterminer la complexité
  let preparationComplexity: "simple" | "moderate" | "complex"
  const avgPrepTime = menuItems.reduce((sum, item) => sum + item.preparationTime, 0) / menuItems.length
  if (avgPrepTime < 30) {
    preparationComplexity = "simple"
  } else if (avgPrepTime < 60) {
    preparationComplexity = "moderate"
  } else {
    preparationComplexity = "complex"
  }

  // Résumer les régimes alimentaires
  const allDietary = menuItems.flatMap((item) => item.dietary)
  const dietaryOverview = [...new Set(allDietary)]

  return {
    title,
    description,
    items: menuItems,
    estimatedAverageCost: avgCost,
    suggestedAveragePrice: avgPrice,
    preparationComplexity,
    seasonalAvailability: options.seasonality
      ? `Idéal pour la saison ${options.seasonality}`
      : "Disponible toute l'année",
    dietaryOverview,
  }
}

// Fonction auxiliaire pour générer un élément de menu
function generateMenuItem(
  category: "starter" | "main" | "dessert" | "side" | "drink",
  options: MenuGenerationOptions,
): MenuItem {
  // Bases de données simulées d'éléments de menu par catégorie et cuisine
  const menuDatabase: Record<string, Record<string, Partial<MenuItem>[]>> = {
    french: {
      starter: [
        {
          name: "Soupe à l'oignon",
          description:
            "Soupe traditionnelle à base d'oignons caramélisés et bouillon de bœuf, gratinée avec du fromage et des croûtons",
          ingredients: ["oignons", "bouillon de bœuf", "vin blanc", "gruyère", "pain"],
          allergens: ["gluten", "lait"],
          preparationTime: 45,
        },
        {
          name: "Salade niçoise",
          description: "Salade composée de tomates, œufs durs, olives niçoises, anchois, thon et huile d'olive",
          ingredients: ["tomates", "œufs", "olives", "anchois", "thon", "huile d'olive"],
          allergens: ["poisson", "œufs"],
          preparationTime: 20,
        },
        {
          name: "Foie gras poêlé",
          description: "Foie gras frais poêlé servi avec une compote de pommes et pain brioché",
          ingredients: ["foie gras", "pommes", "pain brioché", "vinaigre balsamique"],
          allergens: ["gluten"],
          preparationTime: 25,
        },
      ],
      main: [
        {
          name: "Coq au vin",
          description: "Coq mijoté au vin rouge avec lardons, champignons et oignons",
          ingredients: ["poulet", "vin rouge", "lardons", "champignons", "oignons", "carottes"],
          allergens: ["sulfites"],
          preparationTime: 120,
        },
        {
          name: "Bœuf bourguignon",
          description: "Ragoût de bœuf mijoté au vin rouge avec carottes, oignons et champignons",
          ingredients: ["bœuf", "vin rouge", "carottes", "oignons", "champignons", "lardons"],
          allergens: ["sulfites"],
          preparationTime: 180,
        },
        {
          name: "Ratatouille",
          description: "Plat provençal de légumes mijotés avec aubergines, courgettes, poivrons et tomates",
          ingredients: ["aubergines", "courgettes", "poivrons", "tomates", "oignons", "ail", "herbes de Provence"],
          allergens: [],
          dietary: ["vegetarian", "vegan", "gluten-free"],
          preparationTime: 60,
        },
      ],
      dessert: [
        {
          name: "Crème brûlée",
          description: "Crème à la vanille avec une couche de sucre caramélisé",
          ingredients: ["crème", "œufs", "sucre", "vanille"],
          allergens: ["œufs", "lait"],
          preparationTime: 40,
        },
        {
          name: "Tarte Tatin",
          description: "Tarte aux pommes caramélisées renversée",
          ingredients: ["pommes", "pâte feuilletée", "sucre", "beurre"],
          allergens: ["gluten", "lait"],
          preparationTime: 60,
        },
      ],
      drink: [
        {
          name: "Bordeaux rouge",
          description: "Vin rouge corsé de la région de Bordeaux",
          ingredients: ["raisin"],
          allergens: ["sulfites"],
          preparationTime: 0,
        },
        {
          name: "Bourgogne blanc",
          description: "Vin blanc sec et minéral de la région de Bourgogne",
          ingredients: ["raisin"],
          allergens: ["sulfites"],
          preparationTime: 0,
        },
      ],
    },
    italian: {
      starter: [
        {
          name: "Bruschetta",
          description: "Pain grillé frotté à l'ail et garni de tomates, basilic et huile d'olive",
          ingredients: ["pain", "tomates", "basilic", "ail", "huile d'olive"],
          allergens: ["gluten"],
          preparationTime: 15,
        },
        {
          name: "Carpaccio de bœuf",
          description:
            "Fines tranches de bœuf cru marinées à l'huile d'olive et au citron, servies avec parmesan et roquette",
          ingredients: ["bœuf", "huile d'olive", "citron", "parmesan", "roquette"],
          allergens: ["lait"],
          preparationTime: 20,
        },
      ],
      main: [
        {
          name: "Risotto aux champignons",
          description: "Risotto crémeux aux champignons sauvages et parmesan",
          ingredients: ["riz arborio", "champignons", "bouillon", "parmesan", "vin blanc", "oignons"],
          allergens: ["lait", "sulfites"],
          preparationTime: 40,
        },
        {
          name: "Osso buco",
          description: "Jarret de veau braisé avec légumes, vin blanc et gremolata",
          ingredients: [
            "jarret de veau",
            "carottes",
            "céleri",
            "oignons",
            "vin blanc",
            "tomates",
            "persil",
            "ail",
            "zeste de citron",
          ],
          allergens: ["sulfites"],
          preparationTime: 150,
        },
      ],
      dessert: [
        {
          name: "Tiramisu",
          description: "Dessert à base de mascarpone, café, biscuits et cacao",
          ingredients: ["mascarpone", "œufs", "café", "biscuits", "cacao"],
          allergens: ["œufs", "lait", "gluten"],
          preparationTime: 30,
        },
        {
          name: "Panna cotta",
          description: "Crème cuite italienne servie avec coulis de fruits rouges",
          ingredients: ["crème", "sucre", "vanille", "gélatine", "fruits rouges"],
          allergens: ["lait"],
          preparationTime: 20,
        },
      ],
    },
  }

  // Sélectionner une cuisine (par défaut française si non spécifiée)
  const cuisine = options.cuisine?.toLowerCase() || "french"
  const availableCuisines = Object.keys(menuDatabase)
  const selectedCuisine = availableCuisines.includes(cuisine) ? cuisine : "french"

  // Sélectionner un plat aléatoire dans la catégorie
  const categoryItems = menuDatabase[selectedCuisine][category] || []
  const randomIndex = Math.floor(Math.random() * categoryItems.length)
  const selectedItem = categoryItems[randomIndex] || {
    name: "Plat du jour",
    description: "Création du chef selon les produits de saison",
    ingredients: ["produits de saison"],
    allergens: [],
    preparationTime: 30,
  }

  // Ajuster en fonction des options diététiques
  let dietary = selectedItem.dietary || []
  if (options.dietary) {
    // Vérifier si le plat est compatible avec les restrictions
    const isCompatible = !options.dietary.some((restriction) => {
      if (
        restriction === "vegetarian" &&
        selectedItem.ingredients?.some((i) =>
          ["viande", "poulet", "bœuf", "porc", "poisson", "fruits de mer"].includes(i),
        )
      ) {
        return true
      }
      if (
        restriction === "vegan" &&
        selectedItem.ingredients?.some((i) =>
          [
            "viande",
            "poulet",
            "bœuf",
            "porc",
            "poisson",
            "fruits de mer",
            "œufs",
            "lait",
            "crème",
            "fromage",
            "beurre",
          ].includes(i),
        )
      ) {
        return true
      }
      if (restriction === "gluten-free" && selectedItem.allergens?.includes("gluten")) {
        return true
      }
      if (restriction === "dairy-free" && selectedItem.allergens?.includes("lait")) {
        return true
      }
      if (restriction === "nut-free" && selectedItem.allergens?.includes("fruits à coque")) {
        return true
      }
      return false
    })

    if (isCompatible) {
      dietary = [...dietary, ...options.dietary]
    }
  }

  // Calculer le coût et le prix en fonction de la gamme de prix
  let costMultiplier = 1
  let priceMultiplier = 1

  switch (options.priceRange) {
    case "budget":
      costMultiplier = 0.7
      priceMultiplier = 1.5
      break
    case "moderate":
      costMultiplier = 1
      priceMultiplier = 2
      break
    case "premium":
      costMultiplier = 1.5
      priceMultiplier = 2.5
      break
    case "luxury":
      costMultiplier = 2
      priceMultiplier = 3
      break
  }

  const baseCost = category === "starter" ? 3 : category === "main" ? 8 : category === "dessert" ? 4 : 10
  const estimatedCost = baseCost * costMultiplier
  const suggestedPrice = estimatedCost * priceMultiplier

  // Ajouter un accord de vin si demandé
  let winePairing
  if (options.includeWinePairings && category === "main") {
    const wines = [
      "Chardonnay - notes beurrées et minérales",
      "Sauvignon Blanc - frais et herbacé",
      "Pinot Noir - léger avec des notes de fruits rouges",
      "Cabernet Sauvignon - corsé avec des tanins prononcés",
      "Syrah - épicé et fruité",
    ]
    winePairing = wines[Math.floor(Math.random() * wines.length)]
  }

  return {
    ...selectedItem,
    dietary: [...new Set(dietary)],
    estimatedCost,
    suggestedPrice,
    category,
    winePairing,
  } as MenuItem
}

// Fonction pour générer une recette détaillée
export async function generateRecipe(menuItem: MenuItem): Promise<{
  name: string
  description: string
  ingredients: { name: string; quantity: string }[]
  instructions: string[]
  preparationTime: number
  cookingTime: number
  servings: number
  difficulty: "easy" | "medium" | "hard"
  tips: string[]
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}> {
  // Simulation de génération de recette détaillée

  const ingredients = menuItem.ingredients.map((ingredient) => ({
    name: ingredient,
    quantity: `${Math.floor(Math.random() * 500) / 100} ${
      ["g", "kg", "ml", "l", "cuillère à soupe", "cuillère à café", "pincée", "unité"][Math.floor(Math.random() * 8)]
    }`,
  }))

  const numSteps = 3 + Math.floor(Math.random() * 5)
  const instructions = Array.from({ length: numSteps }, (_, i) => {
    const actions = [
      "Préparer",
      "Couper",
      "Mélanger",
      "Cuire",
      "Assaisonner",
      "Faire revenir",
      "Mijoter",
      "Réserver",
      "Dresser",
      "Garnir",
      "Préchauffer",
      "Fouetter",
    ]
    const action = actions[Math.floor(Math.random() * actions.length)]
    return `Étape ${i + 1}: ${action} les ${
      menuItem.ingredients[Math.floor(Math.random() * menuItem.ingredients.length)]
    } et continuer la préparation.`
  })

  const tips = [
    "Utilisez des produits de saison pour plus de saveur.",
    "Vous pouvez préparer cette recette à l'avance et la réchauffer.",
    "Accompagnez ce plat d'un vin qui complète ses saveurs.",
    "Ajustez l'assaisonnement selon vos préférences.",
  ]

  const cookingTime = menuItem.preparationTime * 0.7
  const prepTime = menuItem.preparationTime * 0.3

  return {
    name: menuItem.name,
    description: menuItem.description,
    ingredients,
    instructions,
    preparationTime: Math.round(prepTime),
    cookingTime: Math.round(cookingTime),
    servings: 4,
    difficulty: menuItem.preparationTime < 30 ? "easy" : menuItem.preparationTime < 90 ? "medium" : "hard",
    tips: tips.slice(0, 2 + Math.floor(Math.random() * 3)),
    nutritionalInfo: {
      calories: Math.floor(200 + Math.random() * 600),
      protein: Math.floor(5 + Math.random() * 30),
      carbs: Math.floor(10 + Math.random() * 50),
      fat: Math.floor(5 + Math.random() * 30),
    },
  }
}

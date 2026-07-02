// Level System
export const LEVEL_SYSTEM = {
  levels: [
    { level: 1, name: "Iniciante Verde", minPoints: 0, maxPoints: 499 },
    { level: 2, name: "Consciente Ambiental", minPoints: 500, maxPoints: 1499 },
    { level: 3, name: "Guardião da Natureza", minPoints: 1500, maxPoints: 3499 },
    { level: 4, name: "Embaixador Sustentável", minPoints: 3500, maxPoints: 7499 },
    { level: 5, name: "Mestre da Sustentabilidade", minPoints: 7500, maxPoints: Number.POSITIVE_INFINITY },
  ],
}

// Carbon emission factors (Brazil-specific)
export const CARBON_FACTORS = {
  transport: {
    car: 0.12, // kg CO2 per km
    publicTransport: 0.04, // kg CO2 per km
    flight: 0.25, // kg CO2 per km
  },
  energy: {
    electricity: 0.0817, // kg CO2 per kWh (Brazil grid)
    gas: 2.0, // kg CO2 per m³
  },
  food: {
    meatMeal: 3.3, // kg CO2 per meal
    vegetarianMeal: 0.5, // kg CO2 per meal
    localFoodDiscount: 0.8, // 20% reduction
  },
  shopping: {
    newClothes: 10, // kg CO2 per item
    electronics: 50, // kg CO2 per item
    recycledDiscount: 0.3, // 70% reduction
  },
}

// Green points calculation
export const POINTS_SYSTEM = {
  carbonReduction: {
    perKg: 10, // points per kg CO2 saved
  },
  challenges: {
    easy: 50,
    medium: 100,
    hard: 200,
  },
  education: {
    beginner: 25,
    intermediate: 50,
    advanced: 100,
  },
  investment: {
    perReal: 0.1, // points per R$ invested in ESG
  },
  donation: {
    perReal: 0.5, // points per R$ donated
  },
}

// Badge categories
export const BADGE_CATEGORIES = {
  carbon: {
    name: "Carbono",
    description: "Badges relacionados à redução de emissões",
    color: "green",
  },
  investment: {
    name: "Investimentos",
    description: "Badges de investimentos sustentáveis",
    color: "blue",
  },
  education: {
    name: "Educação",
    description: "Badges de aprendizado ambiental",
    color: "purple",
  },
  community: {
    name: "Comunidade",
    description: "Badges de engajamento comunitário",
    color: "orange",
  },
  achievement: {
    name: "Conquistas",
    description: "Badges de marcos gerais",
    color: "yellow",
  },
}

// Challenge difficulties
export const CHALLENGE_DIFFICULTIES = {
  easy: {
    name: "Fácil",
    color: "green",
    multiplier: 1,
  },
  medium: {
    name: "Médio",
    color: "yellow",
    multiplier: 1.5,
  },
  hard: {
    name: "Difícil",
    color: "red",
    multiplier: 2,
  },
}

// ESG Score ranges
export const ESG_SCORE_RANGES = {
  excellent: { min: 85, max: 100, label: "Excelente", color: "green" },
  good: { min: 70, max: 84, label: "Bom", color: "blue" },
  fair: { min: 55, max: 69, label: "Regular", color: "yellow" },
  poor: { min: 0, max: 54, label: "Precisa Melhorar", color: "red" },
}

// Carbon footprint targets
export const CARBON_TARGETS = {
  monthly: 1000, // kg CO2 per month
  yearly: 12000, // kg CO2 per year
  worldAverage: 1500, // kg CO2 per month
  sustainableTarget: 800, // kg CO2 per month
}

// Green budget categories
export const GREEN_BUDGET_CATEGORIES = {
  transport: {
    name: "Transporte Sustentável",
    icon: "car",
    color: "blue",
    examples: ["Transporte público", "Bicicleta", "Carona solidária"],
  },
  energy: {
    name: "Energia Renovável",
    icon: "zap",
    color: "yellow",
    examples: ["Painéis solares", "Equipamentos eficientes", "Energia eólica"],
  },
  food: {
    name: "Alimentação Orgânica",
    icon: "utensils",
    color: "green",
    examples: ["Alimentos orgânicos", "Produtos locais", "Agricultura sustentável"],
  },
  shopping: {
    name: "Produtos Ecológicos",
    icon: "shopping-bag",
    color: "purple",
    examples: ["Produtos reciclados", "Marcas sustentáveis", "Segunda mão"],
  },
  other: {
    name: "Outros",
    icon: "leaf",
    color: "gray",
    examples: ["Outros gastos verdes"],
  },
}

// Utility functions
export function getLevelByPoints(points: number) {
  return LEVEL_SYSTEM.levels.find((level) => points >= level.minPoints && points <= level.maxPoints)
}

export function getNextLevel(currentLevel: number) {
  return LEVEL_SYSTEM.levels.find((level) => level.level === currentLevel + 1)
}

export function calculateProgressToNextLevel(points: number) {
  const currentLevel = getLevelByPoints(points)
  const nextLevel = getNextLevel(currentLevel?.level || 1)

  if (!currentLevel || !nextLevel) return 100

  const progress = points - currentLevel.minPoints
  const total = nextLevel.minPoints - currentLevel.minPoints

  return (progress / total) * 100
}

export function getESGRating(score: number) {
  if (score >= ESG_SCORE_RANGES.excellent.min) return ESG_SCORE_RANGES.excellent
  if (score >= ESG_SCORE_RANGES.good.min) return ESG_SCORE_RANGES.good
  if (score >= ESG_SCORE_RANGES.fair.min) return ESG_SCORE_RANGES.fair
  return ESG_SCORE_RANGES.poor
}

export function calculateCarbonReductionPoints(carbonSaved: number) {
  return Math.round(carbonSaved * POINTS_SYSTEM.carbonReduction.perKg)
}

export function calculateInvestmentPoints(amount: number) {
  return Math.round(amount * POINTS_SYSTEM.investment.perReal)
}

export function calculateDonationPoints(amount: number) {
  return Math.round(amount * POINTS_SYSTEM.donation.perReal)
}

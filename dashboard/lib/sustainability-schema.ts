export interface CarbonFootprint {
  id: string
  userId: string
  month: number
  year: number
  transportEmissions: number
  energyEmissions: number
  foodEmissions: number
  shoppingEmissions: number
  totalEmissions: number
  createdAt: Date
  updatedAt: Date
}

export interface GreenBudget {
  id: string
  userId: string
  name: string
  category: "transport" | "energy" | "food" | "shopping" | "other"
  budgetAmount: number
  spentAmount: number
  carbonLimit: number
  carbonUsed: number
  month: number
  year: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ESGInvestment {
  id: string
  userId: string
  name: string
  symbol: string
  amount: number
  currentValue: number
  esgScore: number
  environmentalScore: number
  socialScore: number
  governanceScore: number
  category: "renewable_energy" | "sustainable_agriculture" | "clean_technology" | "green_bonds" | "other"
  purchaseDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface GreenPoints {
  id: string
  userId: string
  points: number
  level: number
  totalEarned: number
  source: "carbon_reduction" | "green_purchase" | "challenge_completion" | "esg_investment" | "education" | "donation"
  description: string
  createdAt: Date
}

export interface GreenBadge {
  id: string
  name: string
  description: string
  icon: string
  category: "carbon" | "investment" | "education" | "community" | "achievement"
  requirement: string
  points: number
  isActive: boolean
  createdAt: Date
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: Date
  badge?: GreenBadge
}

export interface SustainabilityChallenge {
  id: string
  title: string
  description: string
  category: "carbon_reduction" | "green_spending" | "education" | "community"
  targetValue: number
  unit: string
  points: number
  startDate: Date
  endDate: Date
  isActive: boolean
  createdAt: Date
}

export interface UserChallenge {
  id: string
  userId: string
  challengeId: string
  currentProgress: number
  isCompleted: boolean
  completedAt?: Date
  joinedAt: Date
  challenge?: SustainabilityChallenge
}

export interface UsedProduct {
  id: string
  sellerId: string
  title: string
  description: string
  category: string
  price: number
  condition: "excellent" | "good" | "fair" | "poor"
  images: string[]
  carbonSaved: number
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MarketplaceTransaction {
  id: string
  buyerId: string
  sellerId: string
  productId: string
  amount: number
  carbonSaved: number
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
  completedAt?: Date
}

export interface EnvironmentalDonation {
  id: string
  userId: string
  organizationName: string
  amount: number
  cause: "reforestation" | "ocean_cleanup" | "renewable_energy" | "wildlife_protection" | "other"
  carbonOffset: number
  donationDate: Date
  createdAt: Date
}

export interface EnvironmentalEducation {
  id: string
  title: string
  description: string
  content: string
  category: "climate_change" | "renewable_energy" | "sustainable_living" | "green_finance"
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: number
  points: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserEducationProgress {
  id: string
  userId: string
  educationId: string
  progress: number
  isCompleted: boolean
  completedAt?: Date
  startedAt: Date
  education?: EnvironmentalEducation
}

export interface SustainabilityCertificate {
  id: string
  userId: string
  name: string
  description: string
  level: "bronze" | "silver" | "gold" | "platinum"
  requirements: string[]
  issuedAt: Date
  expiresAt?: Date
}

// Utility types
export interface CarbonCalculationInput {
  transport: {
    carKm: number
    publicTransportKm: number
    flightKm: number
  }
  energy: {
    electricityKwh: number
    gasM3: number
  }
  food: {
    meatMeals: number
    vegetarianMeals: number
    localFood: boolean
  }
  shopping: {
    newClothes: number
    electronics: number
    recycledItems: number
  }
}

export interface CarbonCalculationResult {
  transport: number
  energy: number
  food: number
  shopping: number
  total: number
  comparison: {
    lastMonth: number
    average: number
    target: number
  }
  suggestions: string[]
}

export interface SustainabilityMetrics {
  totalCarbonSaved: number
  greenPointsEarned: number
  badgesEarned: number
  challengesCompleted: number
  esgInvestments: number
  donationsAmount: number
  educationCompleted: number
  level: number
  rank: number
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

// Level system
export const LEVEL_SYSTEM = {
  levels: [
    { level: 1, name: "Iniciante Verde", minPoints: 0, maxPoints: 499 },
    { level: 2, name: "Consciente Ambiental", minPoints: 500, maxPoints: 1499 },
    { level: 3, name: "Guardião da Natureza", minPoints: 1500, maxPoints: 3499 },
    { level: 4, name: "Embaixador Sustentável", minPoints: 3500, maxPoints: 7499 },
    { level: 5, name: "Mestre da Sustentabilidade", minPoints: 7500, maxPoints: Number.POSITIVE_INFINITY },
  ],
}

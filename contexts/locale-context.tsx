"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Tipos para o contexto de localização
type LocaleContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
  supportedLocales: string[]
  formatCurrency: (value: number) => string
  formatDate: (date: Date | string) => string
  formatNumber: (value: number) => string
  dir: "ltr" | "rtl"
}

// Idiomas suportados
const SUPPORTED_LOCALES = ["pt", "en", "es", "fr", "de", "it", "ja", "ko", "zh", "ru", "ar", "hi"]

// Idiomas RTL (da direita para a esquerda)
const RTL_LOCALES = ["ar", "he", "fa", "ur"]

// Traduções
const translations: Record<string, Record<string, string>> = {
  pt: {
    dashboard: "Painel",
    analytics: "Análises",
    transactions: "Transações",
    settings: "Configurações",
    welcome: "Bem-vindo ao Safe Finance",
    balance: "Saldo",
    income: "Receita",
    expenses: "Despesas",
    savings: "Economias",
    investments: "Investimentos",
    notifications: "Notificações",
    profile: "Perfil",
    search: "Pesquisar",
    export: "Exportar",
    import: "Importar",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    add: "Adicionar",
    create: "Criar",
    update: "Atualizar",
    name: "Nome",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
    phone: "Telefone",
    address: "Endereço",
    today: "Hoje",
    yesterday: "Ontem",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mês",
    thisYear: "Este Ano",
    selectDate: "Selecionar Data",
    selectPeriod: "Selecionar Período",
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    completed: "Concluído",
    cancelled: "Cancelado",
    loading: "Carregando...",
    noData: "Nenhum dado disponível",
    error: "Erro",
    success: "Sucesso",
    warning: "Aviso",
    info: "Informação",
    language: "Idioma",
    theme: "Tema",
    currency: "Moeda",
    timezone: "Fuso Horário",
    selectLanguage: "Selecionar Idioma",
    autoDetect: "Detectar Automaticamente",
    exportSettings: "Configurações de Exportação",
    exportType: "Tipo de Exportação",
    format: "Formato",
    period: "Período",
    allData: "Todos os Dados",
    assistant: "Assistente",
    askQuestion: "Faça uma pergunta",
    goalName: "Nome da Meta",
    targetAmount: "Valor Alvo",
    currentAmount: "Valor Atual",
    deadline: "Prazo",
    budgetName: "Nome do Orçamento",
    budgetAmount: "Valor do Orçamento",
    spent: "Gasto",
    remaining: "Restante",
    amount: "Valor",
    description: "Descrição",
    category: "Categoria",
    date: "Data",
    type: "Tipo",
    food: "Alimentação",
    transport: "Transporte",
    entertainment: "Entretenimento",
    health: "Saúde",
    education: "Educação",
    shopping: "Compras",
    bills: "Contas",
    other: "Outros",
    organization: "Organização",
    projects: "Projetos",
    invoices: "Faturas",
    payments: "Pagamentos",
    members: "Membros",
    permissions: "Permissões",
    chat: "Chat",
    meetings: "Reuniões",
  },
  en: {
    dashboard: "Dashboard",
    analytics: "Analytics",
    transactions: "Transactions",
    settings: "Settings",
    welcome: "Welcome to Safe Finance",
    balance: "Balance",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    investments: "Investments",
    notifications: "Notifications",
    profile: "Profile",
    search: "Search",
    export: "Export",
    import: "Import",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    create: "Create",
    update: "Update",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    phone: "Phone",
    address: "Address",
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    selectDate: "Select Date",
    selectPeriod: "Select Period",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    loading: "Loading...",
    noData: "No data available",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
    language: "Language",
    theme: "Theme",
    currency: "Currency",
    timezone: "Timezone",
    selectLanguage: "Select Language",
    autoDetect: "Auto Detect",
    exportSettings: "Export Settings",
    exportType: "Export Type",
    format: "Format",
    period: "Period",
    allData: "All Data",
    assistant: "Assistant",
    askQuestion: "Ask a question",
    goalName: "Goal Name",
    targetAmount: "Target Amount",
    currentAmount: "Current Amount",
    deadline: "Deadline",
    budgetName: "Budget Name",
    budgetAmount: "Budget Amount",
    spent: "Spent",
    remaining: "Remaining",
    amount: "Amount",
    description: "Description",
    category: "Category",
    date: "Date",
    type: "Type",
    food: "Food",
    transport: "Transport",
    entertainment: "Entertainment",
    health: "Health",
    education: "Education",
    shopping: "Shopping",
    bills: "Bills",
    other: "Other",
    organization: "Organization",
    projects: "Projects",
    invoices: "Invoices",
    payments: "Payments",
    members: "Members",
    permissions: "Permissions",
    chat: "Chat",
    meetings: "Meetings",
  },
  es: {
    dashboard: "Panel",
    analytics: "Análisis",
    transactions: "Transacciones",
    settings: "Configuración",
    welcome: "Bienvenido a Safe Finance",
    balance: "Saldo",
    income: "Ingresos",
    expenses: "Gastos",
    savings: "Ahorros",
    investments: "Inversiones",
    notifications: "Notificaciones",
    profile: "Perfil",
    search: "Buscar",
    export: "Exportar",
    import: "Importar",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Añadir",
    create: "Crear",
    update: "Actualizar",
    name: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    phone: "Teléfono",
    address: "Dirección",
    today: "Hoy",
    yesterday: "Ayer",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mes",
    thisYear: "Este Año",
    selectDate: "Seleccionar Fecha",
    selectPeriod: "Seleccionar Período",
    active: "Activo",
    inactive: "Inactivo",
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",
    loading: "Cargando...",
    noData: "No hay datos disponibles",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información",
    language: "Idioma",
    theme: "Tema",
    currency: "Moneda",
    timezone: "Zona Horaria",
    selectLanguage: "Seleccionar Idioma",
    autoDetect: "Detectar Automáticamente",
    exportSettings: "Configuración de Exportación",
    exportType: "Tipo de Exportación",
    format: "Formato",
    period: "Período",
    allData: "Todos los Datos",
    assistant: "Asistente",
    askQuestion: "Haz una pregunta",
    goalName: "Nombre de la Meta",
    targetAmount: "Cantidad Objetivo",
    currentAmount: "Cantidad Actual",
    deadline: "Fecha Límite",
    budgetName: "Nombre del Presupuesto",
    budgetAmount: "Cantidad del Presupuesto",
    spent: "Gastado",
    remaining: "Restante",
    amount: "Cantidad",
    description: "Descripción",
    category: "Categoría",
    date: "Fecha",
    type: "Tipo",
    food: "Comida",
    transport: "Transporte",
    entertainment: "Entretenimiento",
    health: "Salud",
    education: "Educación",
    shopping: "Compras",
    bills: "Facturas",
    other: "Otros",
    organization: "Organización",
    projects: "Proyectos",
    invoices: "Facturas",
    payments: "Pagos",
    members: "Miembros",
    permissions: "Permisos",
    chat: "Chat",
    meetings: "Reuniones",
  },
  // Adicione mais idiomas conforme necessário
}

// Contexto de localização
const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

// Provedor de localização
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Detecta o idioma do navegador ou usa o armazenado no localStorage
  const getInitialLocale = (): string => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale")
      if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
        return savedLocale
      }

      // Detecta o idioma do navegador
      const browserLang = navigator.language.split("-")[0]
      if (SUPPORTED_LOCALES.includes(browserLang)) {
        return browserLang
      }
    }

    // Fallback para português
    return "pt"
  }

  const [locale, setLocaleState] = useState<string>("pt") // Inicializa com português como fallback

  // Atualiza o idioma e salva no localStorage
  const setLocale = (newLocale: string) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale)
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", newLocale)

        // Atualiza o atributo dir do HTML para suporte a RTL
        document.documentElement.dir = RTL_LOCALES.includes(newLocale) ? "rtl" : "ltr"
      }
    }
  }

  // Função de tradução
  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.pt?.[key] || key
  }

  // Formatação de moeda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, {
      style: "currency",
      currency: locale === "pt" ? "BRL" : "USD",
    }).format(value)
  }

  // Formatação de data
  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale).format(dateObj)
  }

  // Formatação de números
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale).format(value)
  }

  // Direção do texto (LTR ou RTL)
  const dir: "ltr" | "rtl" = RTL_LOCALES.includes(locale) ? "rtl" : "ltr"

  // Inicializa o idioma no carregamento
  useEffect(() => {
    const initialLocale = getInitialLocale()
    setLocale(initialLocale)
  }, [])

  const value = {
    locale,
    setLocale,
    t,
    supportedLocales: SUPPORTED_LOCALES,
    formatCurrency,
    formatDate,
    formatNumber,
    dir,
  }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

// Hook para usar o contexto de localização
export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale deve ser usado dentro de um LocaleProvider")
  }
  return context
}

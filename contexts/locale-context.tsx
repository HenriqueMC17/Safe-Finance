"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type LocaleContextType = {
  locale: string
  currency: string
  currencySymbol: string
  formatCurrency: (value: number) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

type LocaleProviderProps = {
  children: ReactNode
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale] = useState("pt-BR")
  const [currency] = useState("BRL")
  const [currencySymbol] = useState("R$")

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value)
  }

  return (
    <LocaleContext.Provider
      value={{
        locale,
        currency,
        currencySymbol,
        formatCurrency,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

"use client"

import { createContext, useContext, ReactNode } from "react"
import { translations, TranslationKeys } from "@/lib/translations"

interface LanguageContextType {
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
const englishLanguageValue: LanguageContextType = {
  t: translations.en,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={englishLanguageValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

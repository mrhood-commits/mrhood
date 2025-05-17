"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  "hero.title": {
    es: "MR HOOD Internacional",
    en: "MR HOOD International",
  },
  "hero.subtitle": {
    es: "Limpieza profesional de campanas, ductos y sistemas de extracción.",
    en: "Professional cleaning of kitchen hoods, ducts and extraction systems.",
  },
  "hero.description": {
    es: "Con presencia en Argentina, México, Uruguay y próximamente en USA.",
    en: "With presence in Argentina, Mexico, Uruguay and soon in the USA.",
  },
  "hero.select": {
    es: "Selecciona tu país para visitar nuestro sitio web local",
    en: "Select your country to visit our local website",
  },
  "country.title": {
    es: "SELECCIONA TU PAÍS",
    en: "SELECT YOUR COUNTRY",
  },
  "country.subtitle": {
    es: "Elige tu ubicación para visitar el sitio web de MR HOOD específico para tu país",
    en: "Choose your location to visit the MR HOOD website specific to your country",
  },
  "country.visit": {
    es: "Visitar Sitio",
    en: "Visit Website",
  },
  "country.coming": {
    es: "Próximamente",
    en: "Coming Soon",
  },
  "howwedo.title": {
    es: "CÓMO LO HACEMOS",
    en: "HOW WE DO IT",
  },
  "howwedo.description": {
    es: "Nuestro proceso de limpieza profesional garantiza la eliminación completa de grasa y residuos, reduciendo significativamente el riesgo de incendios y mejorando la eficiencia de su sistema de extracción.",
    en: "Our professional cleaning process guarantees the complete removal of grease and residues, significantly reducing the risk of fires and improving the efficiency of your extraction system.",
  },
  "clients.title": {
    es: "NUESTROS CLIENTES",
    en: "OUR CLIENTS",
  },
  "clients.subtitle": {
    es: "Empresas que confían en nosotros",
    en: "Companies that trust us",
  },
  "footer.description": {
    es: "Profesionales en la limpieza de campanas, ductos y sistemas de extracción. Más de 30 años de experiencia avalan nuestros servicios.",
    en: "Professionals in cleaning hoods, ducts and extraction systems. More than 30 years of experience support our services.",
  },
  "footer.rights": {
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },
  "detector.message": {
    es: "Detectamos que estás en",
    en: "We detected you're from",
  },
  "detector.question": {
    es: "¿Quieres visitar nuestro sitio web de",
    en: "Would you like to visit our",
  },
  "detector.website": {
    es: "",
    en: "website",
  },
  "detector.yes": {
    es: "Sí, llévame allí",
    en: "Yes, take me there",
  },
  "detector.no": {
    es: "No, quedarme aquí",
    en: "No, stay here",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string) => {
    return translations[key as keyof typeof translations]?.[language] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

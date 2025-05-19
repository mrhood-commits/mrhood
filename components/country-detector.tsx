"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { useCountry } from "./country-provider"

export function CountryDetector() {
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const { t, language } = useLanguage()
  const { country } = useCountry()

  useEffect(() => {
    // Implementación real de geolocalización por IP
    const detectCountry = async () => {
      try {
        // Usar un servicio real de geolocalización por IP
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        // Obtener el código de país de la respuesta
        const countryCode = data.country_code

        if (countryCode) {
          setDetectedCountry(countryCode)
          setShowBanner(true)

          // Verificar si el usuario ha descartado el banner antes
          const dismissed = localStorage.getItem("countryBannerDismissed")
          if (dismissed === "true") {
            setShowBanner(false)
          }
        }
      } catch (error) {
        console.error("Error detectando país:", error)
        // Fallback a Argentina si falla la detección
        setDetectedCountry("AR")
        setShowBanner(true)
      }
    }

    // Detectar país después de un breve retraso
    const timer = setTimeout(() => {
      detectCountry()
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getCountryName = (code: string) => {
    switch (code) {
      case "AR":
        return "Argentina"
      case "MX":
        return "México"
      case "UY":
        return "Uruguay"
      case "US":
        return "USA"
      default:
        return code === "AR" ? "Argentina" : code === "MX" ? "México" : code === "UY" ? "Uruguay" : "tu país"
    }
  }

  const getCountryUrl = (code: string) => {
    switch (code) {
      case "AR":
        return "https://limpiezadecampanas.com.ar/"
      case "MX":
        return "https://limpiezadecampanas.com.mx/"
      case "UY":
        return "https://limpiezadecampanas.com.uy/"
      case "US":
        return "/"
      default:
        return "/"
    }
  }

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem("countryBannerDismissed", "true")
  }

  if (!showBanner || !detectedCountry) return null

  // Solo mostrar el banner para países donde tenemos sitio web específico
  const validCountries = ["AR", "MX", "UY", "US"]
  if (!validCountries.includes(detectedCountry)) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-4 z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>
          {language === "es" ? "Detectamos que estás en " : "We detected you're from "}
          <strong>{getCountryName(detectedCountry)}</strong>.
          {language === "es" ? " ¿Quieres visitar nuestro sitio web?" : " Would you like to visit our website?"}
        </p>
        <div className="flex space-x-4">
          <a
            href={getCountryUrl(detectedCountry)}
            className="px-4 py-2 bg-[#ccb699] text-black rounded-md hover:bg-[#d8c7ae] transition-colors"
          >
            {language === "es" ? "Sí, llévame allí" : "Yes, take me there"}
          </a>
          <button
            onClick={dismissBanner}
            className="px-4 py-2 bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors"
          >
            {language === "es" ? "No, quedarme aquí" : "No, stay here"}
          </button>
        </div>
      </div>
    </div>
  )
}

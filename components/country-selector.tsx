"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Globe } from "lucide-react"
import { useLanguage } from "./language-provider"

export function CountrySelector() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const { language } = useLanguage()

  const countries = [
    {
      name: "Argentina",
      flag: "🇦🇷",
      url: "https://www.limpiezadecampanas.com.ar/",
      image: "/images/argentina-new.jpeg",
      position: "center", // La imagen ya está bien centrada
    },
    {
      name: "México",
      flag: "🇲🇽",
      url: "https://www.limpiezadecampanas.com.mx/",
      image: "/images/mexico-new.jpeg",
      position: "center 15%", // Ajustado más arriba para centrar la bandera
    },
    {
      name: "Uruguay",
      flag: "🇺🇾",
      url: "https://www.limpiezadecampanas.com.uy/",
      image: "/images/uruguay-new.jpeg",
      position: "center 20%", // Mantiene el ajuste anterior
    },
    {
      name: "USA",
      flag: "🇺🇸",
      url: "",
      comingSoon: true,
      // Sin imagen de fondo para USA
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="country-selector" className="py-20 bg-gray-50 relative">
      {/* Background image that changes based on hovered country */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {countries.map(
          (country) =>
            country.image && (
              <motion.div
                key={country.name}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredCountry === country.name ? 0.25 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={country.image || "/placeholder.svg"}
                  alt={country.name}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: country.position || "center",
                  }}
                  priority={country.name === "Argentina"}
                />
              </motion.div>
            ),
        )}
        {/* Default background when no country is hovered */}
        {!hoveredCountry && <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100"></div>}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-[#ccb699] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold">
                {language === "es" ? "SELECCIONA TU PAÍS" : "SELECT YOUR COUNTRY"}
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "es"
                ? "Elige tu ubicación para visitar el sitio web de MR HOOD específico para tu país"
                : "Choose your location to visit the MR HOOD website specific to your country"}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {countries.map((country) => (
              <motion.div
                key={country.name}
                className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
                  country.comingSoon ? "opacity-70" : "hover:shadow-xl"
                }`}
                variants={item}
                whileHover={country.comingSoon ? {} : { y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredCountry(country.name)}
                onHoverEnd={() => setHoveredCountry(null)}
              >
                <a
                  href={country.url || "#"}
                  className={`block h-full ${!country.url ? "cursor-default" : ""}`}
                  onClick={(e) => country.comingSoon && e.preventDefault()}
                >
                  <div className="bg-white p-8 flex flex-col items-center text-center h-full">
                    <span className="text-5xl mb-4">{country.flag}</span>
                    <h3 className="text-xl font-bold mb-2">{country.name}</h3>

                    {country.comingSoon ? (
                      <span className="inline-block mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
                        {language === "es" ? "Próximamente" : "Coming Soon"}
                      </span>
                    ) : (
                      <div className="flex items-center mt-4 text-[#ccb699]">
                        <span>{language === "es" ? "Visitar Sitio" : "Visit Website"}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

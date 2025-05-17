"use client"

import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"
import { ChevronDown } from "lucide-react"
import { VideoPlayer } from "./video-player"

export function Hero() {
  const { language } = useLanguage()

  const scrollToCountrySection = () => {
    const countrySection = document.getElementById("country-selector")
    if (countrySection) {
      countrySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-black to-[#ccb699] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {language === "es"
                  ? "MR HOOD: Revolucionando la Limpieza de Campanas"
                  : "MR HOOD: Revolutionizing Hood Cleaning"}
              </motion.h1>

              <motion.p
                className="text-xl mb-8 text-[#ccb699]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {language === "es"
                  ? "Somos profesionales en la limpieza de campanas, ductos y sistemas de extracción."
                  : "We are professionals in cleaning hoods, ducts and extraction systems."}
              </motion.p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-[#ccb699]/20 to-[#ccb699]/40 rounded-2xl p-6 flex items-center justify-center shadow-lg">
                <div className="w-full max-w-[280px] mx-auto bg-[#222222]/80 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 overflow-hidden">
                  <VideoPlayer videoId="xT8qfeWlo3o" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={scrollToCountrySection}
              className="flex items-center justify-center text-[#ccb699] hover:text-black transition-colors"
              aria-label="Scroll to country selection"
            >
              <ChevronDown className="h-10 w-10 animate-bounce" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

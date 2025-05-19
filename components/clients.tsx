"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OptimizedImage } from "./optimized-image"

export function Clients() {
  const { language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [clientsList, setClientsList] = useState<Array<{ name: string; logo: string }>>([])
  const slidesContainerRef = useRef<HTMLDivElement>(null)

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Lista de todos los clientes
  useEffect(() => {
    const clients = [
      { name: "McDonald's", logo: "/images/mcdonalds-logo.png" },
      { name: "Santander", logo: "/images/santander-logo.png" },
      { name: "Banco Galicia", logo: "/images/banco-galicia.png" },
      { name: "Alvear Palace", logo: "/images/alvear-palace.png" },
      { name: "La Bistecca", logo: "/images/la-bistecca.png" },
      { name: "Fabric Sushi", logo: "/images/fabric-sushi.jpeg" },
      { name: "La Parolaccia", logo: "/images/la-parolaccia.png" },
      { name: "Galerías Pacífico", logo: "/images/galerias-pacifico.png" },
      { name: "Ruben's Hamburgers", logo: "/images/rubens.png" },
      { name: "Buffalo Wild Wings", logo: "/images/buffalo.png" },
      { name: "Patagonia Parrilla de Campo", logo: "/images/patagonia.jpeg" },
      { name: "La Veinte Cantina", logo: "/images/laveinte.png" },
      { name: "Sanborns", logo: "/images/sanborns.jpeg" },
      { name: "Cotorritos", logo: "/images/cotorritos.png" },
      { name: "Comedor de Milagros", logo: "/images/comedor.jpeg" },
      { name: "Meta", logo: "/images/meta.jpeg" },
      { name: "Grupo Carolo", logo: "/images/carolo.png" },
      { name: "Buena Barra", logo: "/images/buenabarra.png" },
      { name: "Sushiitto", logo: "/images/sushiitto.jpeg" },
      { name: "Porfirio's", logo: "/images/porfirios.jpeg" },
      { name: "La Parrillita", logo: "/images/parrillita.jpeg" },
      { name: "Ilios", logo: "/images/ilios.jpeg" },
      { name: "Grupo Castellano", logo: "/images/castellano.png" },
      { name: "Tsunami", logo: "/images/tsunami.jpeg" },
      { name: "Vie", logo: "/images/vie.jpeg" },
      { name: "Piso 40", logo: "/images/piso40.png" },
      { name: "Antonino", logo: "/images/antonino.png" },
      { name: "La Piccolina", logo: "/images/piccolina.jpeg" },
      { name: "Shark Club", logo: "/images/sharkclub.png" },
      { name: "Chill Out Resto", logo: "/images/chillout.png" },
      { name: "Yacht Club Olivos", logo: "/images/yacht-club-olivos.png" },
      { name: "Carl's Jr", logo: "/images/carlsjr.png" },
      { name: "Anderson's", logo: "/images/andersons.jpeg" },
      { name: "Mercado Bazar", logo: "/images/mercado-bazar.png" },
      { name: "Mostaza", logo: "/images/mostaza.png" },
      { name: "Piegari", logo: "/images/piegari.png" },
      { name: "Mi Gusto", logo: "/images/mi-gusto.png" },
      { name: "Wyndham", logo: "/images/wyndham.png" },
      { name: "Highland Park", logo: "/images/highland-park.jpeg" },
      { name: "Sushi Pop", logo: "/images/sushi-pop.png" },
      { name: "Hilton", logo: "/images/hilton.jpeg" },
      { name: "Howard Johnson", logo: "/images/howard-johnson.png" },
    ]

    // Mezclar los clientes para mostrarlos en orden aleatorio
    const shuffleArray = (array: typeof clients) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setClientsList(shuffleArray(clients))
  }, [])

  // Ajustar número de items por slide según el tamaño de pantalla
  const getItemsPerSlide = () => {
    if (isMobile) return 3
    if (isTablet) return 3
    return 6 // Desktop
  }

  const itemsPerSlide = getItemsPerSlide()
  const totalSlides = Math.ceil(clientsList.length / itemsPerSlide)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  // Autoplay con intervalo de 1.5 segundos
  useEffect(() => {
    if (!inView || !autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 1500) // 1.5 segundos

    return () => clearInterval(interval)
  }, [nextSlide, inView, autoplay])

  // Resetear el slide actual cuando cambia el número de items por slide
  useEffect(() => {
    setCurrentSlide(0)
  }, [itemsPerSlide])

  // Pausar autoplay al interactuar
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Implementar desplazamiento suave
  useEffect(() => {
    if (!slidesContainerRef.current) return

    const container = slidesContainerRef.current
    container.style.transition = "transform 0.5s ease-in-out"
    container.style.transform = `translateX(-${currentSlide * 100}%)`

    // Eliminar la transición después de completarla para evitar problemas con el autoplay
    const onTransitionEnd = () => {
      container.style.transition = ""
      setTimeout(() => {
        container.style.transition = "transform 0.5s ease-in-out"
      }, 50)
    }

    container.addEventListener("transitionend", onTransitionEnd)
    return () => {
      container.removeEventListener("transitionend", onTransitionEnd)
    }
  }, [currentSlide])

  return (
    <section id="clientes" className="py-20 bg-gray-50 dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "es" ? "NUESTROS CLIENTES" : "OUR CLIENTS"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === "es" ? "Empresas que confían en nosotros" : "Companies that trust us"}
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-6xl mx-auto px-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden">
            <div ref={slidesContainerRef} className="flex" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
                >
                  {clientsList
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((client, index) => (
                      <motion.div
                        key={`${slideIndex}-${index}`}
                        className="flex justify-center items-center bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="h-14 sm:h-16 md:h-20 w-full flex items-center justify-center">
                          <OptimizedImage
                            src={client.logo}
                            alt={client.name}
                            width={100}
                            height={60}
                            priority={slideIndex === currentSlide}
                            className="client-logo max-h-full max-w-full object-contain"
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-muted rounded-full p-2 shadow-md z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-muted rounded-full p-2 shadow-md z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-[#ccb699]" : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

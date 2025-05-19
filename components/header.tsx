"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"
import { ThemeSwitch } from "./theme-switch"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-dark-background/95 shadow-md backdrop-blur-md"
          : "bg-white/80 dark:bg-dark-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Image src="/images/mrhoodlogo.png" alt="MR HOOD" width={50} height={50} className="h-12 w-auto" />
            </motion.div>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeSwitch />

            <motion.button
              onClick={toggleLanguage}
              className="px-4 py-2 border border-[#ccb699] rounded-full text-[#ccb699] hover:bg-[#ccb699] hover:text-white dark:hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              EN | ESP
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

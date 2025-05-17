"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width = 120,
  height = 80,
  priority = false,
  className,
  style,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Función para optimizar la URL de la imagen
  const getOptimizedSrc = (originalSrc: string) => {
    // En un entorno real, aquí conectaríamos con un servicio de optimización de imágenes
    // Para esta demo, simplemente devolvemos la URL original
    return originalSrc
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative w-full h-full">
      {/* Placeholder mientras carga */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded">
          <div className="w-8 h-8 border-2 border-[#ccb699] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <Image
        src={getOptimizedSrc(src) || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
        style={{
          objectFit: "contain",
          maxHeight: "100%",
          ...style,
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  )
}

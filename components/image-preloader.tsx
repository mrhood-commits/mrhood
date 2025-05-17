"use client"

import { useEffect, useState } from "react"

interface ImagePreloaderProps {
  images: string[]
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

/**
 * Componente para precargar imágenes en segundo plano
 */
export function ImagePreloader({ images, onProgress, onComplete }: ImagePreloaderProps) {
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    if (!images.length) {
      if (onComplete) onComplete()
      return
    }

    let mounted = true
    let loadedCount = 0

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          if (!mounted) return
          loadedCount++
          setLoaded(loadedCount)
          if (onProgress) onProgress((loadedCount / images.length) * 100)
          resolve()
        }
        img.onerror = () => {
          if (!mounted) return
          loadedCount++
          setLoaded(loadedCount)
          if (onProgress) onProgress((loadedCount / images.length) * 100)
          resolve() // Resolvemos incluso si hay error para continuar con las demás imágenes
        }
        img.src = src
      })
    }

    // Precargar todas las imágenes en paralelo
    Promise.all(images.map(preloadImage)).then(() => {
      if (mounted && onComplete) onComplete()
    })

    return () => {
      mounted = false
    }
  }, [images, onProgress, onComplete])

  // Este componente no renderiza nada visible
  return null
}

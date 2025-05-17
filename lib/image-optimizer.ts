/**
 * Utilidad para optimizar imágenes
 *
 * En un entorno de producción, esta funcionalidad se implementaría
 * con un servicio real de optimización de imágenes como Cloudinary,
 * Imgix, o Next.js Image Optimization.
 */

export interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "avif" | "jpeg" | "png"
}

/**
 * Genera una URL optimizada para una imagen
 *
 * @param src URL original de la imagen
 * @param options Opciones de optimización
 * @returns URL optimizada
 */
export function getOptimizedImageUrl(src: string, options: ImageOptimizationOptions = {}): string {
  // En un entorno real, aquí se generaría una URL para un servicio de optimización
  // Para esta demo, simulamos el proceso

  // Si es una URL externa, no la modificamos
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src
  }

  // Extraer la extensión del archivo
  const extension = src.split(".").pop()?.toLowerCase()

  // Si ya es un formato moderno, no lo cambiamos
  if (extension === "webp" || extension === "avif") {
    return src
  }

  // Simular conversión a WebP
  if (options.format === "webp") {
    return src.replace(`.${extension}`, ".webp")
  }

  // Simular conversión a AVIF
  if (options.format === "avif") {
    return src.replace(`.${extension}`, ".avif")
  }

  // Si no se especifica formato, mantener el original
  return src
}

/**
 * Detecta si el navegador soporta WebP
 * @returns Promise que resuelve a true si el navegador soporta WebP
 */
export function supportsWebP(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false)

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  })
}

/**
 * Detecta si el navegador soporta AVIF
 * @returns Promise que resuelve a true si el navegador soporta AVIF
 */
export function supportsAVIF(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false)

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK"
  })
}

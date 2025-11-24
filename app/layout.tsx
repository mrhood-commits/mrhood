import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { CountryProvider } from "@/components/country-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "MR HOOD Internacional - Limpieza Profesional de Campanas",
  description:
    "Limpieza profesional de campanas, ductos y sistemas de extracción. Con presencia en Argentina, México, Uruguay y próximamente en USA.",
  icons: {
    icon: "/images/mrhoodlogo.png",
    apple: "/images/mrhoodlogo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/mrhoodlogo.png" sizes="any" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
            html{background:#222!important;color:#fff!important}
            body{background:#222!important;color:#fff!important;min-height:100vh;font-family:system-ui,-apple-system,sans-serif}
          `,
          }}
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16466325038" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'AW-16466325038');
         `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <CountryProvider>{children}</CountryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

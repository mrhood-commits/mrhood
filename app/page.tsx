import { CountryDetector } from "@/components/country-detector"
import { CountrySelector } from "@/components/country-selector"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowWeDoIt } from "@/components/how-we-do-it"
import { Clients } from "@/components/clients"
import { ScrollToTop } from "@/components/scroll-to-top"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CountrySelector />
        <HowWeDoIt />
        <Clients />
      </main>
      <Footer />
      <CountryDetector />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  )
}

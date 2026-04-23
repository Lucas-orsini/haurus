import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Features from '@/components/sections/Features'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import Configurator from '@/components/sections/Configurator'
import BottomCTA from '@/components/sections/BottomCTA'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <MetricsShowcase />
      <Configurator />
      <BottomCTA />
      <Footer />
    </main>
  )
}

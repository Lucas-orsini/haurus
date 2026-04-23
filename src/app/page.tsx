import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import SocialProof from '@/components/sections/SocialProof'
import WhyHaurus from '@/components/sections/WhyHaurus'
import Pricing from '@/components/sections/Pricing'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <MetricsShowcase />
        <WhyHaurus />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}

import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import BrandsBar from './BrandsBar'
import CinematicSection from './CinematicSection'
import TrustBand from './TrustBand'
import MetricsSection from './MetricsSection'
import TechnologySection from './TechnologySection'
import ArchitectureSection from './ArchitectureSection'
import FounderNote from './FounderNote'
import ClosingCTA from './ClosingCTA'
import Footer from './Footer'
import SharedNightSky from './SharedNightSky'

export default function LandingPage() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <BrandsBar />
      <CinematicSection />
      <TrustBand />
      <MetricsSection />
      <div className="relative bg-black">
        <SharedNightSky />
        <TechnologySection />
        <ArchitectureSection />
        <FounderNote />
        <ClosingCTA />
      </div>
      <Footer />
    </>
  )
}

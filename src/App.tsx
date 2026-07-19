import { useEffect } from 'react'
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll'
import { useRoute } from './lib/router'
import { BookingProvider } from './lib/booking'
import LandingPage from './components/LandingPage'
import TermsPage from './components/legal/TermsPage'
import PrivacyPage from './components/legal/PrivacyPage'
import Grain from './components/Grain'

export default function App() {
  const path = useRoute()

  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  let page
  if (path === '/terms') page = <TermsPage />
  else if (path === '/privacy') page = <PrivacyPage />
  else page = <LandingPage />

  return (
    <BookingProvider>
      <div className="bg-black text-white" style={{ fontFamily: '"Space Mono", monospace' }}>
        {page}
        <Grain />
      </div>
    </BookingProvider>
  )
}

import { useEffect, useState } from 'react'

// Minimal client-side router (no dependency). In-app navigation uses the
// History API; direct loads of /terms or /privacy require the host to serve
// index.html as an SPA fallback (see public/_redirects and vercel.json).
export function navigate(to: string) {
  if (to === window.location.pathname) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

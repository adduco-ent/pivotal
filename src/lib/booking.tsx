import { createContext, useCallback, useContext, useState } from 'react'
import BookingModal from '../components/BookingModal'

interface BookingContextValue {
  open: () => void
  close: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}

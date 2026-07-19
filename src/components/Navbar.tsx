import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToY } from '../lib/smoothScroll'
import { useBooking } from '../lib/booking'
import PivotalXLogo from './PivotalXLogo'
import ScrambleText from './ScrambleText'
import SquashHamburger from './SquashHamburger'

const pillSpring = { type: 'spring' as const, stiffness: 350, damping: 28 }

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY)
}

interface NavbarProps {
  entranceComplete: boolean
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="text-[16px] font-normal text-white/85 hover:text-white whitespace-nowrap"
    >
      <ScrambleText text={label} isHovered={hovered} />
    </motion.button>
  )
}

function DownloadButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const { open } = useBooking()
  return (
    <motion.button
      onClick={open}
      whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        mobile
          ? 'flex items-center gap-1.5 h-9 px-3.5 bg-white rounded-full text-black text-[13px] font-medium'
          : 'flex items-center gap-2 h-12 px-6 bg-white rounded-full text-black text-[16px] font-medium'
      }
    >
      <i className="bi bi-telephone" />
      <ScrambleText text="Book Call" isHovered={hovered} />
    </motion.button>
  )
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 bg-transparent"
    >
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between h-full px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
            className={`${
              menuOpen ? 'hidden md:flex' : 'flex'
            } items-center gap-2.5 h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px]`}
          >
            <PivotalXLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">PivotalX</span>
          </motion.a>

          <motion.div
            animate={{ width: menuOpen ? 'auto' : 48 }}
            transition={pillSpring}
            className="flex items-center h-12 bg-white/15 backdrop-blur-md rounded-[14px] overflow-hidden"
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`flex items-center justify-center shrink-0 transition-colors ${
                menuOpen
                  ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                  : 'w-12 h-12 rounded-[14px]'
              }`}
            >
              <SquashHamburger isOpen={menuOpen} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <div className="flex items-center gap-5 px-4">
                  <NavLink label="About" onClick={() => scrollToSection('about')} />
                  <NavLink label="Metrics" onClick={() => scrollToSection('metrics')} />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between h-full px-4 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1 }}
            transition={pillSpring}
            className="flex items-center gap-2 h-9 px-3.5 bg-white/15 backdrop-blur-md rounded-[10px] overflow-hidden shrink-0"
          >
            <PivotalXLogo size={14} className="text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
              PivotalX
            </span>
          </motion.a>

          <motion.div
            animate={{ width: menuOpen ? 'auto' : 36 }}
            transition={pillSpring}
            className="flex items-center h-9 bg-white/15 backdrop-blur-md rounded-[10px] overflow-hidden shrink-0"
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`flex items-center justify-center shrink-0 transition-colors ${
                menuOpen
                  ? 'w-7 h-7 rounded-[8px] bg-white/10 hover:bg-white/20 ml-1'
                  : 'w-9 h-9 rounded-[10px]'
              }`}
            >
              <SquashHamburger isOpen={menuOpen} mobile />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <div className="flex items-center gap-4 px-3 [&_button]:text-[13px]">
                  <NavLink label="About" onClick={() => scrollToSection('about')} />
                  <NavLink label="Metrics" onClick={() => scrollToSection('metrics')} />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton mobile />
      </div>
    </motion.header>
  )
}

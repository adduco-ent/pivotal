import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACT_EMAIL, FORM_ENDPOINT } from '../lib/links'
import { setScrollPaused } from '../lib/smoothScroll'
import { supabase } from '../lib/supabase'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const REVENUE_OPTIONS = [
  'Under $10k / month',
  '$10k – $50k / month',
  '$50k – $250k / month',
  '$250k – $1M / month',
  '$1M+ / month',
]

// Deterministic PRNG so the speckle field is stable
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Speckles() {
  const dots = useMemo(() => {
    const rand = mulberry32(88)
    return Array.from({ length: 38 }, (_, i) => ({
      id: i,
      x: +(rand() * 100).toFixed(2),
      y: +(rand() * 100).toFixed(2),
      size: +(0.5 + rand() * 1.4).toFixed(2),
      base: +(0.08 + rand() * 0.32).toFixed(2),
      shimmer: rand() > 0.55,
      duration: +(2.5 + rand() * 4).toFixed(2),
      delay: +(rand() * 6).toFixed(2),
      silver: rand() > 0.5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className={d.shimmer ? 'speckle' : undefined}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: '50%',
            background: d.silver ? '#d7dae2' : '#ffffff',
            opacity: d.base,
            boxShadow: d.size > 1.4 ? '0 0 4px rgba(215,218,226,0.6)' : undefined,
            ...(d.shimmer
              ? { animation: `speckle-shimmer ${d.duration}s ease-in-out ${d.delay}s infinite` }
              : {}),
          }}
        />
      ))}
    </div>
  )
}

// Opaque field background so the speckles never show through the inputs.
const fieldClass =
  'w-full h-11 px-4 rounded-lg bg-[#0b0b11] border border-white/12 text-white text-[14px] placeholder-white/30 outline-none transition-colors focus:border-white/35'
const labelClass = 'block text-white/45 text-[11px] tracking-[0.15em] uppercase mb-2'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  website: '',
  revenue: '',
  message: '',
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(emptyForm)

  // Lock background scroll + pause smooth scroll while open; close on Escape.
  useEffect(() => {
    if (!isOpen) return
    setScrollPaused(true)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      setScrollPaused(false)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  // Reset back to step 1 / empty form shortly after closing.
  useEffect(() => {
    if (isOpen) return
    const t = setTimeout(() => {
      setStatus('idle')
      setStep(1)
      setForm(emptyForm)
    }, 400)
    return () => clearTimeout(t)
  }, [isOpen])

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const send = async () => {
    setStatus('sending')
    try {
      const { error } = await supabase
        .from('strategy_calls')
        .insert([{
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: form.website,
          revenue: form.revenue,
          message: form.message
        }])

      if (error) {
        console.error('Error inserting form:', error)
        // Fallback to mailto if Supabase fails or is misconfigured
        fallbackToEmail()
        return
      }
    } catch (e) {
      console.error('Unexpected error:', e)
      fallbackToEmail()
      return
    }
    setStatus('sent')
  }

  const fallbackToEmail = () => {
    const subject = `Strategy call request — ${form.name || 'New lead'}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Website: ${form.website}`,
      `Monthly revenue: ${form.revenue}`,
      '',
      'What they are dealing with:',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Native `required` validation runs against the currently-rendered step.
    if (step === 1) {
      setStep(2)
      return
    }
    send()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/70"
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Antimatter void card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a strategy call"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md rounded-[24px] border border-white/10 overflow-hidden max-h-[92vh] overflow-y-auto"
            style={{
              background:
                'radial-gradient(130% 120% at 50% -10%, #0d0d12 0%, #060607 48%, #010102 100%)',
              boxShadow:
                '0 40px 120px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <Speckles />

            <div className="relative p-7 sm:p-9">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors text-[18px] leading-none"
              >
                ×
              </button>

              {status === 'sent' ? (
                <div className="py-10 text-center">
                  <div
                    className="mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white text-[20px] mb-6"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(215,218,226,0.35), rgba(255,255,255,0.06))',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    ✓
                  </div>
                  <h2 className="text-white text-[20px] font-normal mb-3">You&rsquo;re all set.</h2>
                  <p className="text-white/50 text-[14px] leading-relaxed">
                    Thanks — we&rsquo;ll review your funnel and reply within one business day to
                    book your call.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 h-11 px-6 bg-white rounded-full text-black text-[14px] font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-white/40 text-[12px] tracking-[0.25em] uppercase mb-3">
                    Book a strategy call
                  </p>
                  <h2 className="text-white text-[22px] sm:text-[24px] font-normal leading-tight mb-2">
                    Let&rsquo;s find your leaks.
                  </h2>
                  <p className="text-white/45 text-[13px] leading-relaxed mb-6">
                    Free 30-minute funnel review. Tell us a little and we&rsquo;ll come prepared.
                  </p>

                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-7">
                    <span
                      className={`h-1 rounded-full transition-all duration-300 ${
                        step === 1 ? 'w-8 bg-white/70' : 'w-4 bg-white/20'
                      }`}
                    />
                    <span
                      className={`h-1 rounded-full transition-all duration-300 ${
                        step === 2 ? 'w-8 bg-white/70' : 'w-4 bg-white/20'
                      }`}
                    />
                    <span className="ml-2 text-white/35 text-[11px] tracking-wide">
                      Step {step} of 2
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                      <>
                        <div>
                          <label className={labelClass} htmlFor="bk-name">
                            Name
                          </label>
                          <input
                            id="bk-name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={set('name')}
                            placeholder="Your name"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="bk-email">
                            Email
                          </label>
                          <input
                            id="bk-email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="you@company.com"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="bk-phone">
                            Phone
                          </label>
                          <input
                            id="bk-phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={form.phone}
                            onChange={set('phone')}
                            placeholder="(555) 000-0000"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="bk-website">
                            Website
                          </label>
                          <input
                            id="bk-website"
                            type="text"
                            inputMode="url"
                            value={form.website}
                            onChange={set('website')}
                            placeholder="company.com"
                            className={fieldClass}
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02, backgroundColor: '#e2e2e6' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full h-12 bg-white rounded-full text-black text-[14px] font-medium"
                        >
                          Continue →
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className={labelClass} htmlFor="bk-revenue">
                            Current monthly revenue
                          </label>
                          <select
                            id="bk-revenue"
                            required
                            value={form.revenue}
                            onChange={set('revenue')}
                            className={`${fieldClass} appearance-none ${
                              form.revenue ? 'text-white' : 'text-white/30'
                            }`}
                          >
                            <option value="" disabled>
                              Select a range
                            </option>
                            {REVENUE_OPTIONS.map((r) => (
                              <option key={r} value={r} className="bg-[#0a0a0d] text-white">
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="bk-message">
                            What are you dealing with?
                          </label>
                          <textarea
                            id="bk-message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={set('message')}
                            placeholder="Where you think revenue is slipping, what you've tried, goals…"
                            className={`${fieldClass} h-auto py-3 resize-none leading-relaxed`}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="h-12 px-5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-[14px] transition-colors"
                          >
                            ← Back
                          </button>
                          <motion.button
                            type="submit"
                            disabled={status === 'sending'}
                            whileHover={{ scale: 1.02, backgroundColor: '#e2e2e6' }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 h-12 bg-white rounded-full text-black text-[14px] font-medium disabled:opacity-70"
                          >
                            {status === 'sending' ? 'Sending…' : 'Request my strategy call →'}
                          </motion.button>
                        </div>
                      </>
                    )}

                    <p className="text-white/30 text-[11px] text-center leading-relaxed pt-1">
                      No pitch, just the leaks we find. We&rsquo;ll never share your details.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

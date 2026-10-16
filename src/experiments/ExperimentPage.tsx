import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from '../lib/router'
import { useBooking } from '../lib/booking'
import PivotalXLogo from '../components/PivotalXLogo'

interface TeardownStage {
  id: string
  number: string
  title: string
  subtitle: string
  stat: string
  statLabel: string
  revenueImpact: string
  leaking: {
    previewTitle: string
    flaws: {
      id: number
      title: string
      detail: string
      stat: string
    }[]
    visualNotes: string[]
  }
  sealed: {
    previewTitle: string
    fixes: {
      id: number
      title: string
      detail: string
      stat: string
    }[]
    visualNotes: string[]
  }
}

const STAGES: TeardownStage[] = [
  {
    id: 'hero',
    number: '01',
    title: 'The Post-Click Landing',
    subtitle: 'Where 58% of cold ad traffic bounces in under 3.5 seconds',
    stat: '58.4%',
    statLabel: 'Cold Traffic Bounce Rate',
    revenueImpact: '-$32,000 / mo',
    leaking: {
      previewTitle: 'The Generic Storefront Landing',
      flaws: [
        {
          id: 1,
          title: 'Ad-to-Page Disconnect',
          detail: 'Ad promises a specific pain-point solution, but the lander drops users on a broad catalog. Cold buyers get cognitive overload and bounce.',
          stat: '3.2s avg session length'
        },
        {
          id: 2,
          title: 'Distracting Multi-Navigation',
          detail: '12 navigation links, social icons, and discount banners scatter buyer attention before they even read the core value proposition.',
          stat: '44% click non-converting links'
        },
        {
          id: 3,
          title: 'Zero Social Proof Above the Fold',
          detail: 'Reviews and press mentions buried beneath the fold. Cold visitors lack the psychological safety required to keep reading.',
          stat: '-28% scroll rate'
        }
      ],
      visualNotes: [
        'Generic Nav with 8 irrelevant links',
        'Vague, poetic headline with zero clarity',
        'Product image with no clinical validation'
      ]
    },
    sealed: {
      previewTitle: 'The Pivotal Presell Architecture',
      fixes: [
        {
          id: 1,
          title: '1:1 Message Match Lock',
          detail: 'Directly mirrors the exact hook, angle, and aesthetic of the winning ad creative. Immediate subconscious reassurance.',
          stat: '+42% above-the-fold retention'
        },
        {
          id: 2,
          title: 'Zero-Distraction Layout',
          detail: 'Stripped navigation header. Every pixel is engineered around a single action: understanding the mechanism and taking the offer.',
          stat: '89% focus on core CTA'
        },
        {
          id: 3,
          title: 'Micro-Proof Header Ribbon',
          detail: 'Verified customer ratings, clinical trial results, or notable press seamlessly integrated into the initial viewport.',
          stat: '+26% forward click-through'
        }
      ],
      visualNotes: [
        'Minimalist, distraction-free header',
        'Direct pain-point headline with mechanism',
        'Instant social proof ticker right beside CTA'
      ]
    }
  },
  {
    id: 'cart',
    number: '02',
    title: 'The Slide-Out Cart Drawer',
    subtitle: 'The hidden chasm where 45% of high-intent buyers quietly walk out',
    stat: '46.1%',
    statLabel: 'Cart-to-Checkout Drop-off',
    revenueImpact: '-$48,500 / mo',
    leaking: {
      previewTitle: 'Standard Platform Cart Drawer',
      flaws: [
        {
          id: 1,
          title: 'The "Mystery Shipping" Shock',
          detail: 'Hiding shipping, taxes, and handling until the checkout screen creates immediate distrust when unexpected costs appear.',
          stat: '34% abandon due to fee surprises'
        },
        {
          id: 2,
          title: 'Friction-Heavy Coupon Field',
          detail: 'Prominent blank promo box prompts buyers to leave the site to hunt for discount codes on Google—never to return.',
          stat: '22% bounce off-site for promo codes'
        },
        {
          id: 3,
          title: 'Zero AOV Expansion Mechanics',
          detail: 'No dynamic free-shipping tiers or complementary one-click product recommendations, leaving free margin on the table.',
          stat: 'AOV stuck at $62 baseline'
        }
      ],
      visualNotes: [
        'Empty whitespace with no value reinforcement',
        'Aggressive promo code input tempting exit',
        'Ambiguous shipping calculation'
      ]
    },
    sealed: {
      previewTitle: 'The Pivotal High-AOV Cart Engine',
      fixes: [
        {
          id: 1,
          title: 'Gamified Free Shipping Bar',
          detail: 'Dynamic progress bar: "You are $18 away from Free Priority Shipping". Drives instant impulsive add-to-carts.',
          stat: '+24% average order value'
        },
        {
          id: 2,
          title: 'One-Click In-Cart Upsell',
          detail: 'Single-tap bundle add (protection warranty, refill pack, or VIP concierge) pre-configured with zero checkout friction.',
          stat: '31% take-rate on upsells'
        },
        {
          id: 3,
          title: 'Reassurance Badges at Point of Action',
          detail: '30-day money-back guarantee and SSL trust seals directly underneath the checkout trigger to dissolve final buyer hesitation.',
          stat: '+18% progression to checkout'
        }
      ],
      visualNotes: [
        'Dynamic Free Shipping unlocked meter',
        'One-click complementary add-on tile',
        'Trust guarantees immediately under checkout'
      ]
    }
  },
  {
    id: 'checkout',
    number: '03',
    title: 'The Mobile Checkout Flow',
    subtitle: 'Where micro-latency and form fatigue decimate paid mobile margins',
    stat: '68.2%',
    statLabel: 'Initiated Checkout Abandonment',
    revenueImpact: '-$64,000 / mo',
    leaking: {
      previewTitle: 'Multi-Step Desktop-First Checkout',
      flaws: [
        {
          id: 1,
          title: 'Form Field Fatigue',
          detail: 'Forcing mobile users with clumsy thumbs to manually type 8 address and billing fields triggers rapid cognitive abandonment.',
          stat: '62s average completion time'
        },
        {
          id: 2,
          title: 'Buried Accelerated Express Pay',
          detail: 'Apple Pay, Google Pay, and Shop Pay hidden beneath standard credit card fields instead of front-and-center.',
          stat: '42% miss 1-tap checkout options'
        },
        {
          id: 3,
          title: 'Loss of Order Context',
          detail: 'The checkout screen hides product imagery and summary behind a dropdown, making buyers question what they are paying for.',
          stat: '19% second-guess cart contents'
        }
      ],
      visualNotes: [
        '8 input boxes requiring manual keyboard typing',
        'Hidden Express Pay options',
        'Cluttered header with exit links'
      ]
    },
    sealed: {
      previewTitle: 'The 1-Tap Frictionless Checkout',
      fixes: [
        {
          id: 1,
          title: 'Prominent Accelerated Express Pay',
          detail: 'Apple Pay & Shop Pay pinned as primary CTAs at the absolute top of the viewport. Eliminates 95% of manual typing.',
          stat: '12s completion time (5x faster)'
        },
        {
          id: 2,
          title: 'Address Auto-Complete & Inline Validation',
          detail: 'Google Places API instant lookup fills city, state, and zip with 3 keystrokes. Eliminates failed shipment errors.',
          stat: '+29% completion rate'
        },
        {
          id: 3,
          title: 'Persistent Value & Security Lock',
          detail: 'Compact product thumbnail, delivery ETA countdown, and bank-grade encryption badge permanently visible.',
          stat: '+16% completed transactions'
        }
      ],
      visualNotes: [
        'Primary Apple Pay / Shop Pay 1-tap buttons',
        'Smart auto-filling address field',
        'Clear delivery ETA & security seals'
      ]
    }
  },
  {
    id: 'postpurchase',
    number: '04',
    title: 'The Thank-You Page Loop',
    subtitle: 'The zero-CAC revenue dead-end that 90% of brands throw in the trash',
    stat: '98%',
    statLabel: 'Zero-Action Thank You Pages',
    revenueImpact: '-$28,000 / mo',
    leaking: {
      previewTitle: 'The Abandoned Thank-You Screen',
      flaws: [
        {
          id: 1,
          title: 'The Dead-End Receipt Screen',
          detail: 'Displaying only an order confirmation number and receipt text. Customer closes the tab within 4 seconds. The relationship stalls.',
          stat: '0% second-order immediate take'
        },
        {
          id: 2,
          title: 'Post-Purchase Buyer Remorse',
          detail: 'No founder video, unboxing expectations, or clear shipping timeline leaves the buyer feeling anxious about their purchase.',
          stat: 'Higher customer support ticket volume'
        },
        {
          id: 3,
          title: 'Discarded Referral Velocity',
          detail: 'No instant incentive for the buyer to share with peers right when their brand excitement is at its highest point.',
          stat: '0 organic viral referral loops'
        }
      ],
      visualNotes: [
        'Plain black-and-white order receipt',
        'No forward engagement or action',
        'Zero post-purchase LTV capture'
      ]
    },
    sealed: {
      previewTitle: 'The Pivotal LTV Acceleration Loop',
      fixes: [
        {
          id: 1,
          title: 'Instant 1-Click Post-Purchase Offer',
          detail: 'Presents an exclusive VIP bundle discount that adds to their existing order without re-entering credit card details.',
          stat: '18% instant 2nd order conversion'
        },
        {
          id: 2,
          title: 'Founder Onboarding & Timeline Lock',
          detail: 'A personalized 20-second video message from the founder explaining what happens next and tracking arrival dates.',
          stat: '-42% buyer remorse inquiries'
        },
        {
          id: 3,
          title: '1-Click Social Gifting Mechanism',
          detail: 'Generates a unique "$20 for your friend, $20 for you" link with pre-populated SMS and WhatsApp triggers.',
          stat: '+14% viral loop acquisition'
        }
      ],
      visualNotes: [
        '1-Click Add-To-Order VIP offer block',
        'Video tracking & unboxing expectations',
        'Instant WhatsApp/SMS friend invite'
      ]
    }
  }
]

export default function ExperimentPage() {
  const [activeStageId, setActiveStageId] = useState('hero')
  const [mode, setMode] = useState<'leaking' | 'sealed'>('leaking')
  const { open: openBooking } = useBooking()

  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0]

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col font-mono selection:bg-[#d96aa8] selection:text-black">
      {/* Top Bar */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between z-20 backdrop-blur-md bg-black/80 sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <PivotalXLogo size={18} className="text-[#d96aa8]" />
            <span className="text-[15px] font-semibold tracking-tight text-white font-sans">PivotalX</span>
          </button>
          <span className="text-[10px] tracking-[0.2em] uppercase bg-white/10 px-2.5 py-1 rounded-full text-white/70">
            FORENSIC TEARDOWN ENGINE
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-white/50 hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
          >
            <span>← Live Site</span>
          </button>
          <button
            onClick={openBooking}
            className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-all font-sans"
          >
            Book Funnel Audit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto w-full px-6 pt-12 pb-8 text-center sm:text-left">
        <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#d96aa8] mb-3">
          Forensic Conversion Analysis
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-4 font-sans max-w-3xl leading-[1.1]">
          The Anatomy of a $100K/Mo Leaking Funnel.
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-2xl font-sans leading-relaxed">
          Most brand operators believe they have an ad problem. In reality, 60%+ of paid buyers walk out after the click across four silent friction points. Inspect the teardown below.
        </p>
      </div>

      {/* Stage Selector Tabs */}
      <div className="max-w-6xl mx-auto w-full px-6 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStageId
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.06] border-white/30 shadow-[0_0_25px_rgba(217,106,168,0.12)]'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[#d96aa8]"
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-widest uppercase text-white/40">
                    STAGE {stage.number}
                  </span>
                  <span className="text-[10px] text-red-400 font-mono">
                    {stage.revenueImpact}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white font-sans truncate mb-1">
                  {stage.title}
                </div>
                <div className="text-[11px] text-white/40 truncate font-sans">
                  {stage.statLabel}: <span className="text-white/70">{stage.stat}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Teardown Workspace */}
      <div className="max-w-6xl mx-auto w-full px-6 pb-20 flex-1">
        <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden">
          
          {/* Top Bar of Workspace: Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Inspecting: {currentStage.title}
              </div>
              <div className="text-lg sm:text-xl font-normal text-white font-sans">
                {currentStage.subtitle}
              </div>
            </div>

            {/* Toggle Button */}
            <div className="flex items-center bg-black/60 p-1.5 rounded-full border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setMode('leaking')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  mode === 'leaking'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                The Leaking Baseline
              </button>
              <button
                onClick={() => setMode('sealed')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  mode === 'sealed'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                The Pivotal Architecture
              </button>
            </div>
          </div>

          {/* Main Grid: Visual Mockup vs Forensic Audit Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Interactive Wireframe Mockup (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[340px] rounded-[36px] p-3.5 bg-black border-2 border-white/15 shadow-2xl relative overflow-hidden">
                {/* Mobile Phone Bezel Bar */}
                <div className="h-4 w-full flex justify-center items-center mb-3">
                  <div className="w-20 h-3 rounded-full bg-white/10" />
                </div>

                {/* Screen Content */}
                <div className={`rounded-[26px] p-5 min-h-[460px] flex flex-col justify-between transition-colors duration-500 border ${
                  mode === 'leaking'
                    ? 'bg-red-950/10 border-red-500/20'
                    : 'bg-emerald-950/10 border-emerald-500/20'
                }`}>
                  <div>
                    {/* Simulated Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                      <div className="text-[11px] font-bold text-white font-sans tracking-wide">
                        STORE BRAND
                      </div>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest">
                        {mode === 'leaking' ? '🔴 UNSEALED' : '🟢 OPTIMIZED'}
                      </div>
                    </div>

                    {/* Simulated Stage Visuals */}
                    <div className="space-y-4">
                      <div className={`p-3 rounded-xl border text-[11px] font-sans ${
                        mode === 'leaking'
                          ? 'bg-red-500/5 border-red-500/20 text-red-300'
                          : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                      }`}>
                        <div className="font-semibold text-white mb-1">
                          {mode === 'leaking' ? currentStage.leaking.previewTitle : currentStage.sealed.previewTitle}
                        </div>
                        <p className="text-[10px] text-white/50 leading-relaxed">
                          {mode === 'leaking'
                            ? 'Standard Shopify layout with typical cognitive friction and unaddressed drop-off triggers.'
                            : 'Frictionless, conversion-optimized architecture engineered specifically for cold paid traffic.'}
                        </p>
                      </div>

                      {/* Visual Wireframe Notes */}
                      <div className="space-y-2.5 pt-2">
                        {(mode === 'leaking' ? currentStage.leaking.visualNotes : currentStage.sealed.visualNotes).map((note, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 border border-white/5 text-[10px] text-white/80 font-sans"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${mode === 'leaking' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                            <span>{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Simulated CTA Button at bottom of phone */}
                  <div className="pt-6">
                    <div className={`w-full py-3 rounded-xl text-center text-xs font-semibold font-sans transition-all ${
                      mode === 'leaking'
                        ? 'bg-white/10 text-white/40'
                        : 'bg-white text-black shadow-lg shadow-emerald-500/10'
                    }`}>
                      {mode === 'leaking' ? 'Standard 3-Step Checkout →' : '⚡ 1-Tap Instant Checkout'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-white/30 font-mono tracking-wider mt-3">
                Simulated Mobile Customer Experience
              </div>
            </div>

            {/* Right: Forensic Teardown Points (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-[#d96aa8]">
                  {mode === 'leaking' ? 'Detected Leaks & Drop-off Triggers' : 'Pivotal Engineered Fixes'}
                </span>
                <span className="text-xs text-white/40 font-mono">
                  {mode === 'leaking' ? '3 Critical Vulnerabilities' : '3 High-Impact Solutions'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode + activeStageId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {(mode === 'leaking' ? currentStage.leaking.flaws : currentStage.sealed.fixes).map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        mode === 'leaking'
                          ? 'bg-red-500/[0.02] border-red-500/20 hover:border-red-500/40'
                          : 'bg-emerald-500/[0.02] border-emerald-500/20 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            mode === 'leaking'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            0{item.id}
                          </span>
                          <h4 className="text-sm font-semibold text-white font-sans">
                            {item.title}
                          </h4>
                        </div>
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md shrink-0 ${
                          mode === 'leaking'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {item.stat}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-sans leading-relaxed pl-9">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Authority Summary */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                      Estimated Net Impact of This Single Stage
                    </div>
                    <div className="text-xl font-normal text-white font-sans">
                      Recovering {currentStage.revenueImpact.replace('-', '+')} in quiet margin
                    </div>
                  </div>
                  <button
                    onClick={openBooking}
                    className="px-6 py-3 bg-white text-black text-xs font-semibold rounded-xl hover:bg-white/90 transition-all font-sans whitespace-nowrap self-start sm:self-auto"
                  >
                    Audit My Funnel →
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Conversion Section */}
      <div className="border-t border-white/10 bg-black/60 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[11px] tracking-[0.25em] uppercase text-[#d96aa8] mb-3">
            14-Day Forensic Engagement
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-white font-sans mb-4 tracking-tight">
            Every store's leaks are different. We map yours in two weeks.
          </h2>
          <p className="text-sm sm:text-base text-white/50 font-sans max-w-xl mx-auto mb-8 leading-relaxed">
            We inspect your full analytics, checkout drop-offs, and tracking pipeline. You get a prioritized diagnostic ranked by exact dollar impact.
          </p>
          <button
            onClick={openBooking}
            className="px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all font-sans shadow-2xl"
          >
            Book a 15-Minute Strategy Call
          </button>
        </div>
      </div>
    </div>
  )
}

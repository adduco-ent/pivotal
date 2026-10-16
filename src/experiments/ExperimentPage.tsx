import { useState } from 'react'
import Funnel3D from './Funnel3D/FunnelCanvas'
import { navigate } from '../lib/router'
import PivotalXLogo from '../components/PivotalXLogo'
import { motion } from 'framer-motion'

export default function ExperimentPage() {
  const [isSealed, setIsSealed] = useState(false)
  const [visitors, setVisitors] = useState(25000)
  const [aov, setAov] = useState(85)

  // Math for CRO demonstration
  const baseConversionRate = 0.016 // 1.6%
  const optimizedConversionRate = 0.044 // 4.4%

  const currentRevenue = Math.round(visitors * baseConversionRate * aov)
  const sealedRevenue = Math.round(visitors * optimizedConversionRate * aov)
  const rescuedRevenue = sealedRevenue - currentRevenue

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-mono selection:bg-[#d96aa8] selection:text-black">
      {/* Top Header / Lab Banner */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between z-20 backdrop-blur-md bg-black/60 sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <PivotalXLogo size={16} className="text-[#d96aa8]" />
            <span className="text-sm font-semibold tracking-wider text-white">PIVOTALX LABS</span>
          </button>
          <span className="text-[10px] tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded text-white/70">
            PROTOTYPE / 3D-FUNNEL-V1
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>← Exit to Live Site</span>
          </button>
        </div>
      </header>

      {/* Main Sandbox Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        
        {/* Left / Center: Interactive 3D Canvas */}
        <div className="flex-1 relative flex flex-col items-center justify-center p-4 sm:p-8 min-h-[500px] lg:min-h-auto">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d96aa8]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* 3D Component */}
          <Funnel3D
            isSealed={isSealed}
            onToggleSealed={() => setIsSealed((prev) => !prev)}
          />

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-8 z-20 flex flex-col items-center gap-3">
            <button
              onClick={() => setIsSealed((prev) => !prev)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 shadow-2xl active:scale-95 ${
                isSealed
                  ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                  : 'bg-[#d96aa8] text-white shadow-[0_0_30px_rgba(217,106,168,0.4)] hover:brightness-110'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>{isSealed ? 'LEAKS SEALED (CLICK TO UNSEAL)' : 'CLICK TO SEAL FUNNEL LEAKS'}</span>
            </button>
            <span className="text-[11px] text-white/40 font-mono tracking-wider">
              {isSealed ? '✨ Traffic flowing through with zero checkout fallout' : '⚠️ ~62% of potential buyers are leaking at checkout'}
            </span>
          </div>
        </div>

        {/* Right Sidebar: Dynamic Metrics HUD */}
        <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-white/10 bg-white/[0.015] p-6 sm:p-8 flex flex-col justify-between z-10 backdrop-blur-sm">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#d96aa8] mb-1">
              Real-time Simulation
            </div>
            <h2 className="text-2xl font-normal tracking-tight text-white mb-2" style={{ fontFamily: 'sans-serif' }}>
              The Cost of Leaky Funnels
            </h2>
            <p className="text-xs text-white/50 leading-relaxed mb-8">
              Adjust your monthly traffic and average order value to model how fixing post-click friction compounds revenue without spending another dollar on ads.
            </p>

            {/* Sliders */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">Monthly Visitors</span>
                  <span className="text-white font-bold">{visitors.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full accent-[#d96aa8] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">Average Order Value (AOV)</span>
                  <span className="text-white font-bold">${aov}</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="300"
                  step="5"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full accent-[#d96aa8] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] uppercase text-white/40 mb-1">Status Quo (Leaking)</div>
                <div className="text-xl font-bold text-red-400">1.6%</div>
                <div className="text-[11px] text-white/40 mt-1">${currentRevenue.toLocaleString()} / mo</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] uppercase text-emerald-400/80 mb-1">Optimized (Sealed)</div>
                <div className="text-xl font-bold text-emerald-400">4.4%</div>
                <div className="text-[11px] text-white/40 mt-1">${sealedRevenue.toLocaleString()} / mo</div>
              </div>
            </div>

            {/* Compound Value Highlight */}
            <motion.div
              animate={{ borderColor: isSealed ? 'rgba(16,185,129,0.5)' : 'rgba(217,106,168,0.3)' }}
              className="p-5 rounded-2xl bg-white/[0.03] border transition-colors mb-6"
            >
              <div className="text-[11px] uppercase tracking-wider text-white/50 mb-1">
                Net Rescued Revenue
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                +${rescuedRevenue.toLocaleString()}
                <span className="text-sm font-normal text-white/50"> / month</span>
              </div>
              <div className="text-[11px] text-[#d96aa8]">
                +${(rescuedRevenue * 12).toLocaleString()} annualized return
              </div>
            </motion.div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="text-[11px] text-white/40 mb-3 leading-relaxed">
              Ready to plug these leaks into your production site?
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-white text-black text-xs font-semibold rounded-xl hover:bg-white/90 transition-all text-center"
            >
              Book Strategy Audit →
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Funnel3DProps {
  isSealed: boolean
  onToggleSealed?: () => void
}

export default function Funnel3D({ isSealed }: Funnel3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const isSealedRef = useRef(isSealed)
  isSealedRef.current = isSealed

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Dimensions
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 8, 22)
    camera.lookAt(0, -1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLightTop = new THREE.PointLight(0xd96aa8, 3, 50)
    pointLightTop.position.set(5, 10, 5)
    scene.add(pointLightTop)

    const pointLightBottom = new THREE.PointLight(0x6366f1, 2.5, 50)
    pointLightBottom.position.set(-5, -6, 5)
    scene.add(pointLightBottom)

    // Funnel Group for rotation
    const funnelGroup = new THREE.Group()
    scene.add(funnelGroup)

    // 1. Funnel Mesh Geometry (Lathe curve)
    const points: THREE.Vector2[] = []
    // Smooth funnel curve points: (x = radius, y = height)
    points.push(new THREE.Vector2(5.2, 5.0))
    points.push(new THREE.Vector2(4.8, 4.0))
    points.push(new THREE.Vector2(3.8, 2.0))
    points.push(new THREE.Vector2(2.6, 0.0))
    points.push(new THREE.Vector2(1.7, -2.0))
    points.push(new THREE.Vector2(1.3, -4.0))
    points.push(new THREE.Vector2(1.2, -6.0))

    const funnelGeo = new THREE.LatheGeometry(points, 48)
    const funnelMat = new THREE.MeshPhysicalMaterial({
      color: 0x181824,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.85,
      thickness: 1.2,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      wireframe: false,
    })
    const funnelMesh = new THREE.Mesh(funnelGeo, funnelMat)
    funnelGroup.add(funnelMesh)

    // Funnel Wireframe overlay
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8e7f94,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const wireframeMesh = new THREE.Mesh(funnelGeo, wireframeMat)
    funnelGroup.add(wireframeMesh)

    // Stage Rings (Glowing rings at each tier)
    const ringTiers = [
      { y: 5.0, r: 5.2, label: 'Top of Funnel (Ads)', color: 0xd96aa8 },
      { y: 2.0, r: 3.8, label: 'Landing & Offer', color: 0x8e7f94 },
      { y: -2.0, r: 1.7, label: 'Checkout & Cart', color: 0xef4444 }, // Leak point
      { y: -6.0, r: 1.2, label: 'Purchase & Retention', color: 0x10b981 },
    ]

    const rings: THREE.Mesh[] = []
    ringTiers.forEach((tier) => {
      const ringGeo = new THREE.TorusGeometry(tier.r, 0.04, 16, 64)
      const ringMat = new THREE.MeshBasicMaterial({
        color: tier.color,
        transparent: true,
        opacity: 0.7,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.rotation.x = Math.PI / 2
      ringMesh.position.y = tier.y
      funnelGroup.add(ringMesh)
      rings.push(ringMesh)
    })

    // Leak indicator glow mesh (at y = -2.0)
    const leakGeo = new THREE.RingGeometry(1.6, 2.2, 32)
    const leakMat = new THREE.MeshBasicMaterial({
      color: 0xff2244,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    })
    const leakMesh = new THREE.Mesh(leakGeo, leakMat)
    leakMesh.rotation.x = Math.PI / 2
    leakMesh.position.y = -2.0
    funnelGroup.add(leakMesh)

    // 2. Particles (Flowing visitors)
    const particleCount = 1200
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    interface ParticleData {
      progress: number // 0 (top) to 1 (bottom)
      speed: number
      angle: number
      spiralSpeed: number
      isLeaker: boolean
      leakDir: THREE.Vector3
      leakProgress: number
    }

    const pData: ParticleData[] = []

    for (let i = 0; i < particleCount; i++) {
      const isLeaker = Math.random() < 0.62
      const angle = Math.random() * Math.PI * 2
      const leakAngle = Math.random() * Math.PI * 2
      pData.push({
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        angle,
        spiralSpeed: 0.02 + Math.random() * 0.03,
        isLeaker,
        leakDir: new THREE.Vector3(Math.cos(leakAngle), -0.2, Math.sin(leakAngle)).normalize(),
        leakProgress: 0,
      })

      colors[i * 3] = 0.85
      colors[i * 3 + 1] = 0.85
      colors[i * 3 + 2] = 1.0
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Particle Texture
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.3, 'rgba(230,210,255,0.8)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    funnelGroup.add(particleSystem)

    const getRadiusAtY = (y: number) => {
      const t = THREE.MathUtils.clamp((5.0 - y) / 11.0, 0, 1)
      return THREE.MathUtils.lerp(5.0, 1.2, Math.pow(t, 0.65))
    }

    // Drag controls
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let rotVelX = 0
    let rotVelY = 0.003

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      rotVelY = deltaX * 0.006
      rotVelX = deltaY * 0.004
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onPointerUp = () => {
      isDragging = false
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let animId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      clock.getDelta()
      const sealed = isSealedRef.current

      funnelGroup.rotation.y += rotVelY
      funnelGroup.rotation.x = THREE.MathUtils.clamp(
        funnelGroup.rotation.x + rotVelX,
        -0.4,
        0.5
      )

      if (!isDragging) {
        rotVelY = THREE.MathUtils.lerp(rotVelY, 0.003, 0.04)
        rotVelX = THREE.MathUtils.lerp(rotVelX, 0, 0.04)
      }

      leakMat.color.setHex(sealed ? 0x10b981 : 0xef4444)
      leakMat.opacity = sealed ? 0.3 : 0.7 + Math.sin(clock.getElapsedTime() * 6) * 0.25

      const pos = particleGeo.attributes.position.array as Float32Array
      const col = particleGeo.attributes.color.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const p = pData[i]
        p.progress += p.speed
        p.angle += p.spiralSpeed

        const currentY = THREE.MathUtils.lerp(5.2, -6.2, p.progress)
        const currentR = getRadiusAtY(currentY) * (0.2 + 0.75 * Math.sin(p.progress * Math.PI))

        const idx = i * 3

        if (!sealed && p.isLeaker && p.progress > 0.62) {
          p.leakProgress += 0.02
          const leakDistance = p.leakProgress * 5.0
          pos[idx] = Math.cos(p.angle) * currentR + p.leakDir.x * leakDistance
          pos[idx + 1] = currentY + p.leakDir.y * leakDistance
          pos[idx + 2] = Math.sin(p.angle) * currentR + p.leakDir.z * leakDistance

          col[idx] = 1.0
          col[idx + 1] = 0.2
          col[idx + 2] = 0.2

          if (p.leakProgress > 1.2) {
            p.progress = 0
            p.leakProgress = 0
          }
        } else {
          pos[idx] = Math.cos(p.angle) * currentR
          pos[idx + 1] = currentY
          pos[idx + 2] = Math.sin(p.angle) * currentR

          if (currentY > 2.0) {
            col[idx] = 0.85
            col[idx + 1] = 0.42
            col[idx + 2] = 0.66
          } else if (currentY > -2.0) {
            col[idx] = 0.55
            col[idx + 1] = 0.4
            col[idx + 2] = 0.95
          } else {
            if (sealed) {
              col[idx] = 0.1
              col[idx + 1] = 0.95
              col[idx + 2] = 0.65
            } else {
              col[idx] = 0.95
              col[idx + 1] = 0.8
              col[idx + 2] = 0.2
            }
          }

          if (p.progress >= 1.0) {
            p.progress = 0
            p.leakProgress = 0
          }
        }
      }

      particleGeo.attributes.position.needsUpdate = true
      particleGeo.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-[550px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      
      {/* 3D Tier Markers Floating on Left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-none z-10 hidden sm:flex">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d96aa8] shadow-[0_0_10px_#d96aa8]" />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-white/50">Tier 01</div>
            <div className="text-xs font-mono text-white/90">Ad Traffic (Top of Funnel)</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8e7f94] shadow-[0_0_10px_#8e7f94]" />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-white/50">Tier 02</div>
            <div className="text-xs font-mono text-white/90">Landing Page & Offers</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isSealed ? 'bg-[#10b981] shadow-[0_0_10px_#10b981]' : 'bg-[#ef4444] shadow-[0_0_10px_#ef4444] animate-ping'}`} />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-white/50">Tier 03</div>
            <div className="text-xs font-mono text-white/90 flex items-center gap-2">
              Checkout & Cart 
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSealed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isSealed ? 'SEALED' : 'LEAK DETECTED'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]" />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-white/50">Tier 04</div>
            <div className="text-xs font-mono text-white/90">Revenue / Conversions</div>
          </div>
        </div>
      </div>

      {/* Helper instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-mono tracking-wider text-white/30 uppercase pointer-events-none">
        Drag to rotate 3D funnel in real-time
      </div>
    </div>
  )
}

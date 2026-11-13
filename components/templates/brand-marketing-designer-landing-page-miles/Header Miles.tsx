/**
 * Hero — section 01 (incl. the navbar, which scrolls away with the hero — not sticky)
 * 100% self-contained.
 * Needs: only React 18 + Tailwind CSS. Fonts load from Google Fonts (no npm package).
 */
import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

// ── Fonts (only what this section uses) ──────────────────────────
const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Give+You+Glory&family=Inter+Tight:ital,wght@0,400;0,500;1,400&display=swap'

// ── Images (CDN) — replace with your real CDN links ──────────────
const HERO_LOGO = '/atlas-jr-logo.jpg'


// ── Content ───────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'About Our Project', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Our Team', href: '#case-study' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

function Headline({ className = '' }: { className?: string }) {
  return (
    <h1 className={`font-['Gilda_Display',serif] font-normal capitalize ${className}`}>
      Your Decisions. <span className="text-[#e83f21]">Your Base.</span>{' '}
      <span className="font-['Give_You_Glory',cursive] leading-[0]">Your Mission.</span>
      <span className="mt-[8px] block font-['Inter_Tight',sans-serif] text-[0.35em] leading-[1.3] tracking-normal normal-case text-[#ff783f]">~team atlas jr</span>
    </h1>
  )
}

function PortraitTile({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-[180px] w-[188px] overflow-hidden rounded-[12px] bg-[#feebe7] ${className}`}>
      <img
        src={HERO_LOGO}
        alt="Team Atlas Jr logo"
        className="absolute inset-0 size-full object-contain object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
      />
    </div>
  )
}

// ── Desktop (≥768px): fixed 1600 × 770 artboard ──────────────────
function HeroDesktop() {
  return (
    <Artboard id="home" height={770} className="bg-[#0f0602]">
      <RoverScene />

      <div style={at(60, 123, 356)}>
        <Reveal delay={150} className="mt-[20px]">
          <PortraitTile />
        </Reveal>
      </div>

      <div style={at(850, 500, 690)}>
        <Reveal delay={200}>
          <Headline className="m-0 text-[68px] leading-[76px] tracking-[-2.04px] text-[#ff783f]" />
        </Reveal>
      </div>
    </Artboard>
  )
}

// ── Mobile (<768px) ───────────────────────────────────────────────
function HeroMobile() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0f0602] pb-[40px] pt-[96px]">
      <RoverScene />
      <div className="relative px-[20px]">
      <Reveal>
        <Headline className="m-0 text-[42px] leading-[48px] tracking-[-1.2px] text-[#ff783f]" />
      </Reveal>
      </div>
      <div className="relative mt-[28px] aspect-[1600/769] w-full">
        <Reveal delay={260} className="absolute left-[20px] top-[-8px]">
          <PortraitTile className="!h-[110px] !w-[115px]" />
        </Reveal>
      </div>
    </section>
  )
}

// ── Navbar: sits on top of the hero and scrolls away with it (not sticky) ──
function Navbar() {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const s = useDesignScale()

  const bar = (
    <div
      className={`relative rounded-[8px] border border-[#71391f] bg-[#160a05] transition-shadow duration-300 ${
        open ? 'shadow-[0_10px_30px_-12px_rgba(15,2,0,0.25)]' : ''
      }`}
    >
      <div className="flex h-[42px] items-center justify-between px-[14px]">
        <a href="#home" className="flex items-center gap-[6px] text-[#ff783f] no-underline" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="font-['Gilda_Display',serif] text-[16px] leading-none">TEAM Atlas.jr</span>
        </a>
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="group relative flex h-[22px] w-[30px] cursor-pointer flex-col items-end justify-center gap-[5px] border-0 bg-transparent p-0"
        >
          <span
            className={`block h-[2px] rounded-[10px] bg-[#ff783f] transition-all duration-300 ${
              open ? 'w-[24px] translate-y-[7px] rotate-45' : 'w-[28px]'
            }`}
          />
          <span
            className={`block h-[2px] rounded-[10px] bg-[#ff783f] transition-all duration-300 ${
              open ? 'w-0 opacity-0' : 'w-[23px] group-hover:w-[28px]'
            }`}
          />
          <span
            className={`block h-[2px] rounded-[10px] bg-[#ff783f] transition-all duration-300 ${
              open ? 'w-[24px] -translate-y-[7px] -rotate-45' : 'w-[17px] group-hover:w-[28px]'
            }`}
          />
        </button>
      </div>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <nav className="overflow-hidden">
          <ul className="m-0 flex list-none flex-col gap-[2px] px-[14px] pb-[14px] pt-[4px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="inline-block bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat py-[6px] text-[16px] text-[#ff783f] no-underline transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] hover:text-[#e83f21]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex justify-center font-['Inter_Tight',sans-serif]">
        <div
          className="pointer-events-auto w-[384px]"
          style={{ marginTop: 21 * s, transform: `scale(${s})`, transformOrigin: 'top center' }}
        >
          {bar}
        </div>
      </div>
    )
  }
  return <div className="absolute left-[20px] right-[20px] top-[14px] z-50 font-['Inter_Tight',sans-serif]">{bar}</div>
}

function LogoMark() {
  return (
    <svg width="30" height="22" viewBox="0 0 30 22" fill="#E83F21" aria-hidden>
      <path d="M14.9656 0C14.9912 0.0336371 14.9853 0.0353799 15 0.098268C15.0006 0.325537 14.6692 1.3237 14.5949 1.57142C13.756 4.36606 12.7305 6.69365 10.9678 7.19114C10.4992 7.32337 9.91589 7.28433 9.43252 7.28828L6.31885 7.30179C5.7473 7.30864 4.90018 7.21215 4.35884 7.47166C3.45933 7.90287 2.91311 9.45459 2.45973 10.9387C1.91208 10.9387 1.36442 10.9387 0.816761 10.9387C0.634209 10.9387 0.302218 10.9357 0.0782398 11.0393L0.00718012 11.0872L0 11.0509C0.155145 10.3727 0.339693 9.72828 0.52371 9.0739C1.38707 6.00385 2.59167 3.29705 4.42714 2.42289C4.95878 2.16968 5.29361 2.19222 5.82024 2.17105C6.25387 2.15498 6.68755 2.14644 7.12139 2.14537L10.0731 2.08719C10.9376 2.07249 11.7897 2.14883 12.6407 1.8067C13.505 1.45912 14.1852 0.690142 14.9656 0Z" />
      <path d="M14.9656 22C14.9912 21.9664 14.9853 21.9646 15 21.9017C15.0006 21.6745 14.6692 20.6763 14.5949 20.4286C13.756 17.6339 12.7305 15.3064 10.9678 14.8089C10.4992 14.6766 9.91589 14.7157 9.43252 14.7117L6.31885 14.6982C5.7473 14.6914 4.90018 14.7879 4.35884 14.5283C3.45933 14.0971 2.91311 12.5454 2.45973 11.0613C1.91208 11.0613 1.36442 11.0613 0.816761 11.0613C0.634209 11.0613 0.302218 11.0643 0.0782398 10.9607L0.00718012 10.9128L0 10.9491C0.155145 11.6273 0.339693 12.2717 0.52371 12.9261C1.38707 15.9961 2.59167 18.7029 4.42714 19.5771C4.95878 19.8303 5.29361 19.8078 5.82024 19.829C6.25387 19.845 6.68755 19.8536 7.12139 19.8546L10.0731 19.9128C10.9376 19.9275 11.7897 19.8512 12.6407 20.1933C13.505 20.5409 14.1852 21.3099 14.9656 22Z" />
      <path d="M15.0344 0C15.0088 0.0336371 15.0147 0.0353799 15 0.098268C14.9994 0.325537 15.3308 1.3237 15.4051 1.57142C16.244 4.36606 17.2695 6.69365 19.0322 7.19114C19.5008 7.32337 20.0841 7.28433 20.5675 7.28828L23.6811 7.30179C24.2527 7.30864 25.0998 7.21215 25.6412 7.47166C26.5407 7.90287 27.0869 9.45459 27.5403 10.9387C28.0879 10.9387 28.6356 10.9387 29.1832 10.9387C29.3658 10.9387 29.6978 10.9357 29.9218 11.0393L29.9928 11.0872L30 11.0509C29.8449 10.3727 29.6603 9.72828 29.4763 9.0739C28.6129 6.00385 27.4083 3.29705 25.5729 2.42289C25.0412 2.16968 24.7064 2.19222 24.1798 2.17105C23.7461 2.15498 23.3124 2.14644 22.8786 2.14537L19.9269 2.08719C19.0624 2.07249 18.2103 2.14883 17.3593 1.8067C16.495 1.45912 15.8148 0.690142 15.0344 0Z" />
      <path d="M15.0344 22C15.0088 21.9664 15.0147 21.9646 15 21.9017C14.9994 21.6745 15.3308 20.6763 15.4051 20.4286C16.244 17.6339 17.2695 15.3064 19.0322 14.8089C19.5008 14.6766 20.0841 14.7157 20.5675 14.7117L23.6811 14.6982C24.2527 14.6914 25.0998 14.7879 25.6412 14.5283C26.5407 14.0971 27.0869 12.5454 27.5403 11.0613C28.0879 11.0613 28.6356 11.0613 29.1832 11.0613C29.3658 11.0613 29.6978 11.0643 29.9218 10.9607L29.9928 10.9128L30 10.9491C29.8449 11.6273 29.6603 12.2717 29.4763 12.9261C28.6129 15.9961 27.4083 18.7029 25.5729 19.5771C25.0412 19.8303 24.7064 19.8078 24.1798 19.829C23.7461 19.845 23.3124 19.8536 22.8786 19.8546L19.9269 19.9128C19.0624 19.9275 18.2103 19.8512 17.3593 20.1933C16.495 20.5409 15.8148 21.3099 15.0344 22Z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <div className="relative">
      <Navbar />
      <Responsive desktop={<HeroDesktop />} mobile={<HeroMobile />} />
    </div>
  )
}

function RoverScene() {
  const scene = useRef<HTMLDivElement>(null)
  const rover = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ground = scene.current
    const vehicle = rover.current
    const hero = ground?.closest('#home')
    if (!ground || !vehicle || !hero || prefersReducedMotion()) return

    let x = 0.53, y = 0.48, angle = -20
    let targetX = x, targetY = y
    let frame = 0
    let lastTime = 0
    const drive = (time: number) => {
      const dt = lastTime ? Math.min(time - lastTime, 40) : 16
      lastTime = time
      const dx = (targetX - x) * ground.clientWidth
      const dy = (targetY - y) * ground.clientHeight
      const distance = Math.hypot(dx, dy)
      if (distance < 0.1) {
        frame = 0
        lastTime = 0
        return
      }

      const heading = Math.atan2(dy, dx) * 180 / Math.PI
      const difference = ((heading - angle + 540) % 360) - 180
      const turnLimit = dt * 0.45
      angle = (angle + Math.sign(difference) * Math.min(Math.abs(difference), turnLimit)) % 360

      if (Math.abs(difference) <= turnLimit) {
        const step = Math.min(1, dt * 0.28 / distance)
        x += (targetX - x) * step
        y += (targetY - y) * step
      }
      ground.style.setProperty('--rover-x', `${x * 100}%`)
      ground.style.setProperty('--rover-y', `${y * 100}%`)
      vehicle.style.setProperty('--rover-angle', `${angle}deg`)
      frame = requestAnimationFrame(drive)
    }

    const steer = (event: Event) => {
      const pointer = event as PointerEvent
      if (event.type === 'pointermove' && pointer.pointerType === 'touch') return
      if (event.type === 'pointerdown' && (pointer.button !== 0 || (pointer.target as Element | null)?.closest('a, button'))) return
      const bounds = ground.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const margin = Math.min(vehicle.getBoundingClientRect().width / 2, bounds.height / 2, bounds.width / 2)
      targetX = Math.max(margin / bounds.width, Math.min(1 - margin / bounds.width, (pointer.clientX - bounds.left) / bounds.width))
      targetY = Math.max(margin / bounds.height, Math.min(1 - margin / bounds.height, (pointer.clientY - bounds.top) / bounds.height))
      if (!frame) frame = requestAnimationFrame(drive)
    }

    hero.addEventListener('pointermove', steer, { passive: true })
    hero.addEventListener('pointerdown', steer, { passive: true })
    return () => {
      hero.removeEventListener('pointermove', steer)
      hero.removeEventListener('pointerdown', steer)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={scene} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [--rover-x:53%] [--rover-y:48%]">
      <div className="absolute left-[var(--rover-x)] top-[var(--rover-y)] aspect-square w-[clamp(173px,26vw,358px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ae592e_0%,#7d3b20_37%,#50230f_53%,transparent_72%)]"><div className="absolute inset-0 opacity-25 [background:repeating-radial-gradient(ellipse_at_24%_30%,transparent_0_6px,#241007_7px_8px,transparent_9px_16px)] [mask-image:radial-gradient(circle,#000_22%,transparent_68%)]" /></div>
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_var(--rover-x)_var(--rover-y),#000_0%,#000_48px,transparent_150px)]">
        {([
          [72, 34, 94, 52, -12, "linear-gradient(#d0b49a,#695043)"],
          [23, 69, 88, 50, 14, "linear-gradient(#ae9782,#584237)"],
          [80, 75, 76, 44, 10, "linear-gradient(#7aa299,#37594d)"],
          [43, 80, 66, 46, -20, "linear-gradient(#c39265,#644a33)"],
          [89, 49, 64, 38, -6, "linear-gradient(#7091ab,#294052)"],
        ] as const).map(([left, top, width, height, angle, roof]) => (
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[24px] border-2 border-[#b49a84] bg-[linear-gradient(180deg,#d0b49a,#695043)] shadow-[5px_7px_0_#28170e]"
              key={left}
              style={{ left: `${left}%`, top: `${top}%`, width, height, rotate: `${angle}deg`, background: roof }}
            >
            <div className="absolute inset-y-0 left-[28%] w-[35%] border-x-2 border-[#826953] bg-[#aa8f79]" />
            <div className="absolute right-[-8px] top-1/2 h-[22px] w-[18px] -translate-y-1/2 rounded-r-md border-2 border-[#927a63] bg-[#42342c]" />
            <div className="absolute left-[14%] top-[24%] h-[10px] w-[12px] rounded-full border border-[#b9d4d2] bg-[#324e53]" />
          </div>
        ))}
        {[
          [12, 33, 42], [34, 59, 47], [57, 19, 38], [61, 87, 49], [86, 61, 44],
          [7, 46, 11], [8, 77, 9], [10, 91, 14], [15, 56, 16], [18, 83, 9],
          [24, 47, 12], [26, 88, 10], [28, 26, 11], [30, 74, 16], [32, 39, 9],
          [38, 90, 13], [40, 25, 12], [42, 67, 10], [46, 50, 12], [47, 93, 9],
          [49, 34, 16], [52, 75, 11], [54, 59, 13], [57, 42, 9], [60, 68, 14],
          [64, 53, 10], [66, 25, 13], [68, 91, 15], [71, 63, 10], [73, 80, 12],
          [76, 18, 12], [78, 52, 15], [82, 89, 11], [84, 28, 13], [88, 82, 14],
          [91, 20, 10], [93, 70, 13], [95, 34, 9], [96, 89, 16],
        ].map(([left, top, size]) => (
          <div
            key={left}
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(145deg,#bd805b_8%,#845039_46%,#49281a_70%)] [clip-path:polygon(4%_68%,19%_24%,47%_5%,78%_18%,100%_59%,75%_96%,29%_92%)]"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size * 0.75 }}
          />
        ))}
      </div>
      <div ref={rover} className="absolute left-[var(--rover-x)] top-[var(--rover-y)] w-[clamp(54px,8vw,112px)] -translate-x-1/2 -translate-y-1/2 [--rover-angle:-20deg]">
        <div className="relative rotate-[var(--rover-angle)] drop-shadow-[0_9px_8px_rgba(80,33,20,0.32)]">
          <svg viewBox="0 0 180 108" className="block w-full">
            <path d="M24 22h112v64H24z" fill="#564940" />
            {[22, 63, 104].map((wheelX) => [9, 75].map((wheelY) => (
              <g key={`${wheelX}-${wheelY}`} transform={`translate(${wheelX} ${wheelY})`}>
                <rect width="31" height="24" rx="5" fill="#282323" />
                <path d="M5 4v16m7-17v18m7-18v18m7-17v16" stroke="#62554e" strokeWidth="2" />
              </g>
            )))}
            <rect x="23" y="28" width="116" height="52" rx="9" fill="#f7efe0" stroke="#7a6050" strokeWidth="2" />
            <rect x="31" y="37" width="34" height="34" rx="4" fill="#294b65" />
            <path d="M42 37v34m12-34v34M31 48h34m-34 12h34" stroke="#82a9bc" />
            <rect x="76" y="40" width="29" height="28" rx="4" fill="#d8a036" />
            <circle cx="91" cy="54" r="7" fill="#f7d985" />
            <path d="M114 54h22l13-12 14 4" fill="none" stroke="#766960" strokeWidth="7" strokeLinecap="round" />
            <rect x="153" y="38" width="18" height="14" rx="3" fill="#3e3834" />
            <circle cx="168" cy="45" r="3" fill="#91c8dd" />
            <path d="M133 34h7m-7 40h7" stroke="#f4b64b" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Section-local helpers — kept in this file so the section is 100% self-contained
// ─────────────────────────────────────────────────────────────

const DESIGN_W = 1600

function useViewportWidth() {
  const [w, setW] = useState(() =>
    typeof document === 'undefined' ? DESIGN_W : document.documentElement.clientWidth,
  )
  useEffect(() => {
    const on = () => setW(document.documentElement.clientWidth)
    on()
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

function useDesignScale() {
  return useViewportWidth() / DESIGN_W
}

function useIsDesktop() {
  return useViewportWidth() >= 768
}

function at(left: number, top: number, width?: number, height?: number): CSSProperties {
  return { position: 'absolute', left, top, width, height }
}

function Artboard({
  height,
  id,
  className = '',
  children,
}: {
  height: number
  id?: string
  className?: string
  children: ReactNode
}) {
  const s = useDesignScale()
  return (
    <section id={id} className={`relative w-full overflow-hidden ${className}`} style={{ height: height * s }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: DESIGN_W, height, transform: `scale(${s})`, transformOrigin: 'top left' }}
      >
        {children}
      </div>
    </section>
  )
}

function Responsive({ desktop, mobile }: { desktop: ReactNode; mobile: ReactNode }) {
  useGoogleFonts()
  const isDesktop = useIsDesktop()
  return (
    <div className="font-['Inter_Tight',sans-serif] text-[#312c2c] antialiased">{isDesktop ? desktop : mobile}</div>
  )
}

function useGoogleFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }, [])
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Fades / lifts / un-blurs its children every time they scroll into view (replays on re-entry). */
function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [reduce] = useState(prefersReducedMotion)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])
  const shown = reduce || visible
  const ease = 'cubic-bezier(0.16,1,0.3,1)'
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(64px) scale(0.96)',
        filter: shown ? 'none' : 'blur(12px)',
        transition: reduce
          ? undefined
          : `opacity 1100ms ${ease} ${delay}ms, transform 1100ms ${ease} ${delay}ms, filter 1100ms ${ease} ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/** Orange button: dark fill sweeps in from the left, label rolls up, button lifts. */

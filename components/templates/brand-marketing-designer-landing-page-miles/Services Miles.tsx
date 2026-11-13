/**
 * About Our Project — section 03
 * 100% self-contained.
 * Needs: only React 18 + Tailwind CSS. Fonts load from Google Fonts (no npm package).
 */
import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Give+You+Glory&family=Inter+Tight:wght@400&display=swap'

// ── Content (icons are inline SVG, see ProjectIcon below) ──
// Cards are listed in reading order; x / y are the exact Figma positions on the 1600px frame.
const PROJECT_FEATURES = [
  {
    title: "Mars Mission Trainer",
    text: "In Atlas SkyBase, manage a Mars base and keep four astronauts safe.",
    icon: 'mission' as IconName,
    x: 589,
    y: 115,
  },
  {
    title: "Rover Expeditions",
    text: "Scout safe routes, cache rock samples, and deliver emergency supplies.",
    icon: 'rover' as IconName,
    x: 90,
    y: 238,
  },
  {
    title: "Resource Management",
    text: "Balance power, water, oxygen, and food as mission demands change.",
    icon: 'resources' as IconName,
    x: 1088,
    y: 238,
  },
  {
    title: "Emergency Response",
    text: "Protect the crew during dust storms, radiation alerts, and water leaks.",
    icon: 'alerts' as IconName,
    x: 90,
    y: 539,
  },
  {
    title: "Classroom Outpost",
    text: "The planned model pairs an ESP32 rover with habitat sensors and a solar station.",
    icon: 'outpost' as IconName,
    x: 1088,
    y: 539,
  },
  {
    title: "NASA Science",
    text: "Mission cards show how Perseverance inspires sample collection.",
    icon: 'science' as IconName,
    x: 589,
    y: 662,
  },
]

function Heading({ className = '' }: { className?: string }) {
  return (
    <h2 className={`m-0 font-['Gilda_Display',serif] font-normal capitalize text-[#302d2d] ${className}`}>
      About Our <span className="font-['Give_You_Glory',cursive] leading-[0] text-[#e83f21]">Project</span>
    </h2>
  )
}

function ProjectCard({ title, text, icon, wide = false }: { title: string; text: string; icon: IconName; wide?: boolean }) {
  return (
    <article
      className={`group relative flex overflow-hidden rounded-[12px] bg-white transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:shadow-[0_24px_40px_-24px_rgba(232,63,32,0.55)] ${
        wide ? 'h-[123px] w-[423px] p-[10px]' : 'w-full gap-[14px] p-[8px]'
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#e83f21] text-white ${
          wide ? 'h-[103px] w-[112px]' : 'h-[88px] w-[92px]'
        }`}
      >
        <span
          className={`block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-[1.12] ${
            wide ? 'w-[74px] h-[74px]' : 'w-[60px] h-[60px]'
          }`}
        >
          <ProjectIcon name={icon} />
        </span>
      </div>
      <div className={wide ? 'ml-[13px] mt-[10px] w-[267px]' : 'min-w-0 flex-1 py-[6px] pr-[6px]'}>
        <h3
          className={`m-0 font-['Gilda_Display',serif] font-normal capitalize text-[#302d2d] transition-colors duration-300 group-hover:text-[#e83f21] ${
            wide ? 'text-[26px] leading-[31px] tracking-[-0.78px]' : 'text-[22px] tracking-[-0.6px]'
          }`}
        >
          {title}
        </h3>
        <p className={`m-0 text-[#5f4837] ${wide ? 'mt-[8px] text-[16px] leading-[22px]' : 'mt-[4px] text-[15px] leading-[21px]'}`}>
          {text}
        </p>
      </div>
    </article>
  )
}

// ── Desktop (≥768px): fixed 1600 × 900 artboard ──────────────────
function ServicesDesktop() {
  // Cards start stacked together in the middle; once the section is in view they fan out to their places.
  const stage = useRef<HTMLDivElement>(null)
  const [spread, setSpread] = useState(prefersReducedMotion)
  useEffect(() => {
    const el = stage.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(([e]) => setSpread(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const CX = 800 - 423 / 2 // stacked position: centre of the frame
  const CY = 450 - 123 / 2
  const ease = 'cubic-bezier(0.16,1,0.3,1)'
  return (
    <Artboard id="services" height={900} className="bg-[#efded0]">
      <div ref={stage} className="pointer-events-none" style={at(0, 0, 1600, 900)} />
      <div style={{ ...at(0, 413, 1600), opacity: spread ? 1 : 0, transition: `opacity 900ms ${ease} ${spread ? 550 : 0}ms` }}>
        <Heading className="text-center text-[60px] leading-[74px] tracking-[-1.8px]" />
      </div>
      {PROJECT_FEATURES.map((card, i) => {
        const tilt = [-6, 4, -3, 5, -5, 3][i % 6] // a slightly messy stack, like a deck of cards
        const stacked = `translate(${CX - card.x}px, ${CY - card.y}px) rotate(${tilt}deg) scale(0.92)`
        return (
          <div
            key={card.title}
            style={{
              ...at(card.x, card.y, 423, 123),
              zIndex: PROJECT_FEATURES.length - i, // first card stays on top of the stack
              transform: spread ? 'none' : stacked,
              transition: `transform 1200ms ${ease} ${spread ? 150 + i * 90 : 0}ms`,
            }}
          >
            <ProjectCard {...card} wide />
          </div>
        )
      })}
    </Artboard>
  )
}

// ── Mobile (<768px) ───────────────────────────────────────────────
function ServicesMobile() {
  return (
    <section id="services" className="bg-[#efded0] px-[20px] py-[64px]">
      <Reveal>
        <Heading className="text-center text-[40px] leading-[48px] tracking-[-1.2px]" />
      </Reveal>
      <div className="mt-[32px] flex flex-col gap-[14px]">
        {PROJECT_FEATURES.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <ProjectCard {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Services() {
  return <Responsive desktop={<ServicesDesktop />} mobile={<ServicesMobile />} />
}

const ICON_PATHS = {
  mission: 'M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M9 12h6m-3-3v6',
  rover: 'M3 16v-4h18v4M8 12V8h8l3 4M12 8V5h4M4 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0m6 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0m6 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  resources: 'M2 7h18v10H2zm20 3v4M11 8l-3 4h5l-3 4',
  alerts: 'M12 3 2 21h20L12 3Zm0 6v5m0 3v.1',
  outpost: 'M2 20h20M4 20v-7a8 8 0 0 1 16 0v7M9 20v-6h6v6M12 5V2m0 0h4',
  science: 'M7 20h10m-5 0v-3M3 9l5-5 9 9-5 5L3 9Zm13 3 4-4m-1-4 2 2m-4-4 2 2',
}
type IconName = keyof typeof ICON_PATHS
function ProjectIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-full" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICON_PATHS[name]} />
    </svg>
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
    <div className="font-['Inter_Tight',sans-serif] text-[#302d2d] antialiased">{isDesktop ? desktop : mobile}</div>
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

/** Small section label: ■ Label ■ */

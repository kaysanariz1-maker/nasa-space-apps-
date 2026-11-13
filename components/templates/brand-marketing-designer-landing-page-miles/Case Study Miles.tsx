/**
 * Our Team — section 05
 * 100% self-contained.
 * Needs: only React 18 + Tailwind CSS. Fonts load from Google Fonts (no npm package).
 */
import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Give+You+Glory&family=Inter+Tight:wght@400&family=Onest:wght@500&display=swap'

// ── Content ───────────────────────────────────────────────────────
// image = preview that follows the pointer when a row is hovered
const CASES: { client: string; award?: string; project?: string; year?: string; image: string }[] = [
  { client: 'Team Leader', award: 'Safwat', project: 'Coordinated the team and designed the mission scenarios and gameplay rules.', year: '2026', image: '/safowat.png' },
  { client: 'Team Member', award: 'Muntasir', project: 'Designed, assembled, and tested the rover.', image: '/atlas-team-member-1.png' },
  { client: 'Team Member', award: 'Zayan', project: 'Developed the website frontend and mission dashboard interface.', image: '/atlas-team-member-2.png' },
  { client: 'Team Member', award: 'Punya', project: 'Built the Mars outpost model and prepared project visuals.', image: '/atlas-team-member-3.png' },
  { client: 'Team Member', award: 'Albee', project: 'Developed the mission simulator and resource-management logic.', image: '/atlas-team-member-4.png' },
  { client: 'Team Member', award: 'Wafa', project: 'Researched NASA data and prepared documentation and presentation materials.', image: '/atlas-team-member-5.png' },
]

function Heading({ className = '' }: { className?: string }) {
  return (
    <h2 className={`m-0 font-['Gilda_Display',serif] font-normal capitalize text-white ${className}`}>
      MEMBERS
    </h2>
  )
}

function ClientMark({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-[9px] text-white">
      <LogoIcon />
      <span className="font-['Onest',sans-serif] text-[20px] font-medium leading-[24px] tracking-[-0.2px]">{name}</span>
    </div>
  )
}

const rowBase =
  'group block rounded-[20px] border border-solid border-[#543733] bg-[#0e0301] text-white no-underline transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#e93e21] hover:bg-[#1d0806]'

// ── Desktop (≥768px): fixed 1600 × 1218 artboard ─────────────────
/** Image that floats over a row and follows the pointer along it while the row is hovered. */
function HoverPreview({ src, alt, active, x, tilt }: { src: string; alt: string; active: boolean; x: number; tilt: number }) {
  return (
    <div
      className="pointer-events-none absolute top-1/2 z-10 h-[166px] w-[148px]"
      style={{
        left: 0,
        transform: `translate(${x - 74}px, -50%) rotate(${active ? tilt : 0}deg) scale(${active ? 1 : 0.4})`,
        opacity: active ? 1 : 0,
        transition:
          'transform 650ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease, clip-path 600ms cubic-bezier(0.16,1,0.3,1)',
        clipPath: active ? 'inset(0% 0% 0% 0% round 14px)' : 'inset(50% 50% 50% 50% round 14px)',
      }}
    >
      <img src={src} alt={alt} className="w-full h-full rounded-[14px] object-cover shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]" />
    </div>
  )
}

function CaseStudyDesktop() {
  const [hover, setHover] = useState(-1)
  const [px, setPx] = useState(0)
  const [tilt, setTilt] = useState(0)
  const lastX = useRef(0)
  const settle = useRef(0)
  const track = (e: { clientX: number; currentTarget: HTMLElement }, i: number) => {
    const b = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - b.left) / b.width) * 1440 // design px inside the row (the artboard is scaled)
    setTilt(Math.max(-8, Math.min(8, (x - lastX.current) * 0.4))) // leans in the direction of travel
    lastX.current = x
    window.clearTimeout(settle.current)
    settle.current = window.setTimeout(() => setTilt(0), 140) // straighten up when the pointer stops
    setPx(Math.max(74, Math.min(1440 - 74, x)))
    if (hover !== i) setHover(i)
  }
  // Rows start stacked on the first row's spot; once the list is in view they drop down one by one.
  const list = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(prefersReducedMotion)
  useEffect(() => {
    const el = list.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const ease = 'cubic-bezier(0.16,1,0.3,1)'
  return (
    <Artboard id="case-study" height={1218} className="bg-[#0e0301]">
      <Reveal className="flex justify-center" style={at(0, 80, 1600)}>
        <Badge dark>OUR TEAM</Badge>
      </Reveal>
      <Reveal delay={200} style={at(0, 118, 1600)}>
        <Heading className="text-center text-[60px] leading-[74px] tracking-[-1.8px]" />
      </Reveal>

      <div ref={list} className="pointer-events-none" style={at(80, 258, 1440, 880)} />
      {CASES.map((c, i) => (
        <div
          key={c.image}
          style={{
            ...at(80, 258 + i * 150, 1440, 130),
            zIndex: hover === i ? 20 : CASES.length - i,
            transform: open ? 'none' : `translateY(${-i * 150 + i * 8}px) scale(${1 - i * 0.02})`,
            opacity: open || i < 3 ? 1 : 0,
            transition: open
              ? `transform 900ms ${ease} ${200 + i * 160}ms, opacity 300ms ease ${200 + i * 160}ms`
              : `transform 500ms ${ease}, opacity 300ms ease`,
          }}
        >
          <article
            className={`${rowBase} relative w-full h-full`}
            onMouseEnter={(e) => track(e, i)}
            onMouseMove={(e) => track(e, i)}
            onMouseLeave={() => setHover(-1)}
          >
            <HoverPreview src={c.image} alt={c.award ?? c.client} active={hover === i} x={px} tilt={tilt} />
            <div className="absolute left-[49px] top-[52px] h-[24px] w-[178px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[8px]">
              <ClientMark name={c.client} />
            </div>
            <p className="absolute left-[534px] top-[52px] m-0 -translate-x-1/2 whitespace-nowrap font-['Gilda_Display',serif] text-[20px] capitalize leading-[24px] tracking-[-0.6px] transition-colors duration-300 group-hover:text-[#e93e21]">
              {c.award}
            </p>
            <p className="absolute left-[981.5px] top-1/2 m-0 w-[520px] -translate-x-1/2 -translate-y-1/2 text-center text-[18px] leading-[24px]">
              {c.project}
            </p>
            <p className="absolute left-[1364.5px] top-[52px] m-0 -translate-x-1/2 whitespace-nowrap text-[18px] leading-[24px]">
              {c.year && `/ ${c.year}`}
            </p>
          </article>
        </div>
      ))}
    </Artboard>
  )
}

// ── Mobile (<768px) ───────────────────────────────────────────────
function CaseStudyMobile() {
  return (
    <section id="case-study" className="bg-[#0e0301] px-[20px] py-[64px]">
      <Reveal className="flex justify-center">
        <Badge dark>OUR TEAM</Badge>
      </Reveal>
      <Reveal delay={200} className="mt-[14px]">
        <Heading className="text-center text-[40px] leading-[48px] tracking-[-1.2px]" />
      </Reveal>
      <div className="mt-[32px] flex flex-col gap-[12px]">
        {CASES.map((c, i) => (
          <Reveal key={c.image} delay={i * 60}>
            <article className={`${rowBase} p-[20px]`}>
              <div className="flex items-center justify-between">
                <ClientMark name={c.client} />
                <span className="text-[16px] leading-[24px]">{c.year && `/ ${c.year}`}</span>
              </div>
              <img src={c.image} alt={c.award ?? c.client} className="mt-[14px] block aspect-[285/322] w-[120px] rounded-[12px] object-cover" />
              <p className="m-0 mt-[14px] font-['Gilda_Display',serif] text-[22px] capitalize leading-[28px] group-hover:text-[#e93e21]">
                {c.award}
              </p>
              <p className="m-0 mt-[4px] text-[15px] leading-[22px] text-white/80">{c.project}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function CaseStudy() {
  return <Responsive desktop={<CaseStudyDesktop />} mobile={<CaseStudyMobile />} />
}

// ── Inline SVG client marks ───────────────────────────────────────
function LogoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
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
    <div className="font-['Inter_Tight',sans-serif] text-[#312c2d] antialiased">{isDesktop ? desktop : mobile}</div>
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
function Badge({ children, dark = false, square = '#e93e21' }: { children: ReactNode; dark?: boolean; square?: string }) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="block w-[8px] h-[8px] rounded-[2px]" style={{ background: square }} />
      <p className={`whitespace-nowrap text-[18px] capitalize leading-[24px] ${dark ? 'text-white' : 'text-black'}`}>{children}</p>
      <span className="block w-[8px] h-[8px] rounded-[2px]" style={{ background: square }} />
    </div>
  )
}

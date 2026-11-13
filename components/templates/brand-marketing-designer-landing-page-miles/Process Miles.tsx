/**
 * Process — section 06 ("How We Brought Our Project to Life.")
 * 100% self-contained.
 * Needs: only React 18 + Tailwind CSS. Fonts load from Google Fonts (no npm package).
 * Interaction: the active (orange) card follows hover / tap, and the text below swaps to that step.
 */
import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Give+You+Glory&family=Inter+Tight:wght@400&display=swap'

// ── Content ───────────────────────────────────────────────────────
type StepIcon = 'discover' | 'design' | 'develop' | 'launch'
const STEPS: { no: string; title: string; icon: StepIcon; x: number; text: string }[] = [
  {
    no: '01',
    title: 'Discover',
    icon: 'discover',
    x: 80,
    text: 'Every project starts with listening. We dive into the audience, goals, and context to find what makes our project different.',
  },
  {
    no: '02',
    title: 'Design',
    icon: 'design',
    x: 442,
    text: 'Ideas become identity. We sketch, explore and refine concepts until every logo, colour and typeface tells our story clearly.',
  },
  {
    no: '03',
    title: 'Develop',
    icon: 'develop',
    x: 805,
    text: 'We build the full system: guidelines, templates, packaging and social assets, so our project stays consistent everywhere.',
  },
  {
    no: '04',
    title: 'Launch',
    icon: 'launch',
    x: 1167,
    text: 'Our project goes live with confidence. We support the rollout across print, digital and social, then track what’s working.',
  },
]
const DEFAULT_ACTIVE = 2 // "Develop" is highlighted in the design

function Heading({ className = '' }: { className?: string }) {
  return (
    <h2 className={`m-0 font-['Gilda_Display',serif] font-normal capitalize text-[#302d2d] ${className}`}>
      How We Brought Our <span className="font-['Give_You_Glory',cursive] leading-[0] text-[#e83f21]">Project</span> to Life.
    </h2>
  )
}

function StepCard({
  step,
  active,
  onActivate,
  small = false,
}: {
  step: (typeof STEPS)[number]
  active: boolean
  onActivate: () => void
  small?: boolean
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      className={`relative block w-full h-full cursor-pointer overflow-hidden border-0 p-0 text-left transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        small ? 'rounded-[14px]' : 'rounded-[16px]'
      } ${active ? 'bg-[#e83f21] text-white' : 'bg-white text-[#302d2d] hover:-translate-y-[4px]'}`}
    >
      <span
        className={`absolute font-['Inter_Tight',sans-serif] capitalize ${
          small ? 'left-[16px] top-[14px] text-[16px] leading-[20px]' : 'left-[30px] top-[30px] text-[20px] leading-[25px]'
        }`}
      >
        {step.no}
      </span>
      <span
        className={`absolute left-1/2 -translate-x-1/2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? 'scale-[1.06]' : ''
        } ${small ? 'top-[34px] w-[70px] h-[70px]' : 'top-[67px] w-[116px] h-[116px]'}`}
      >
        <Icon name={step.icon} />
      </span>
      <span
        className={`absolute left-0 w-full text-center font-['Gilda_Display',serif] capitalize transition-colors duration-500 ${
          active ? 'text-white' : 'text-[#4f4e4f]'
        } ${small ? 'top-[118px] text-[24px] leading-[28px]' : 'top-[233px] text-[40px] leading-[40px] tracking-[-1.2px]'}`}
      >
        {step.title}
      </span>
    </button>
  )
}

/** All step texts share one grid cell and cross-fade, so the height never jumps. */
function StepText({ active, className = '' }: { active: number; className?: string }) {
  return (
    <div className={`grid ${className}`} aria-live="polite">
      {STEPS.map((s, i) => (
        <p
          key={s.no}
          className="m-0 capitalize transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-area:1/1]"
          style={{
            opacity: i === active ? 1 : 0,
            transform: i === active ? 'none' : 'translateY(14px)',
            filter: i === active ? 'none' : 'blur(6px)',
          }}
          aria-hidden={i !== active}
        >
          {s.text}
        </p>
      ))}
    </div>
  )
}

// ── Desktop (≥768px): fixed 1600 × 753 artboard ──────────────────
function ProcessDesktop() {
  const [active, setActive] = useState(DEFAULT_ACTIVE)
  // Cards start stacked on the first card's spot (left); once in view they slide right one by one.
  const row = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(prefersReducedMotion)
  useEffect(() => {
    const el = row.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const ease = 'cubic-bezier(0.16,1,0.3,1)'
  return (
    <Artboard id="process" height={753} className="bg-white">
      <Reveal className="flex justify-center" style={at(0, 80, 1600)}>
        <Badge>Process</Badge>
      </Reveal>
      <Reveal delay={200} style={at(0, 118, 1600)}>
        <Heading className="text-center text-[60px] leading-[74px] tracking-[-1.8px]" />
      </Reveal>
      <div ref={row} className="pointer-events-none" style={at(80, 238, 1440, 316)} />
      {STEPS.map((s, i) => (
        <div
          key={s.no}
          style={{
            ...at(s.x, 238, 353, 316),
            zIndex: STEPS.length - i,
            transform: open ? 'none' : `translateX(${STEPS[0].x - s.x + i * 10}px) scale(${1 - i * 0.03})`,
            transition: open ? `transform 900ms ${ease} ${200 + i * 180}ms` : `transform 500ms ${ease}`,
          }}
        >
          <StepCard step={s} active={active === i} onActivate={() => setActive(i)} />
        </div>
      ))}
      <Reveal delay={300} style={at(534, 594, 531)}>
        <StepText active={active} className="text-center text-[20px] leading-[30px] text-[#595859]" />
      </Reveal>
    </Artboard>
  )
}

// ── Mobile (<768px) ───────────────────────────────────────────────
function ProcessMobile() {
  const [active, setActive] = useState(DEFAULT_ACTIVE)
  return (
    <section id="process" className="bg-white px-[20px] py-[64px]">
      <Reveal className="flex justify-center">
        <Badge>Process</Badge>
      </Reveal>
      <Reveal delay={200} className="mt-[14px]">
        <Heading className="text-center text-[38px] leading-[46px] tracking-[-1.1px]" />
      </Reveal>
      <div className="mt-[32px] grid grid-cols-2 gap-[10px]">
        {STEPS.map((s, i) => (
          <Reveal key={s.no} delay={i * 80} className="h-[164px]">
            <StepCard step={s} active={active === i} onActivate={() => setActive(i)} small />
          </Reveal>
        ))}
      </div>
      <StepText active={active} className="mt-[24px] text-center text-[17px] leading-[26px] text-[#595859]" />
    </section>
  )
}

export default function Process() {
  return <Responsive desktop={<ProcessDesktop />} mobile={<ProcessMobile />} />
}

// ── Inline SVG step icons (stroke = currentColor, so they turn white on the active card) ──
function Icon({ name }: { name: StepIcon }) {
  return (
    <svg
      viewBox="0 0 116 116"
      className="block w-full h-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {name === 'discover' && (
        <>
          <path d="M14.5 40.93V33.31C14.5 22.92 22.92 14.5 33.32 14.5H39.55" />
          <path d="M14.5 75.07V82.69C14.5 93.08 22.92 101.5 33.32 101.5H39.39" />
          <path d="M101.5 75.07V82.69C101.5 93.08 93.08 101.5 82.69 101.5H76.46" />
          <path d="M101.5 40.93V33.31C101.5 22.92 93.08 14.5 82.68 14.5H76.61" />
          <circle cx="56.46" cy="56.03" r="16.8" />
          <path d="M67.88 68.33L76.34 76.77" />
        </>
      )}
      {name === 'design' && (
        <>
          <path d="M37.61 14.5H78.38C92.63 14.5 101.5 24.56 101.5 38.79V77.21C101.5 91.44 92.63 101.5 78.38 101.5H37.61C23.36 101.5 14.5 91.44 14.5 77.21V38.79C14.5 24.56 23.41 14.5 37.61 14.5Z" />
          <path d="M60.23 39.49L62.2 35.93C63.59 33.42 67 32.93 69.04 34.97L83.41 49.34C85.44 51.37 84.96 54.79 82.44 56.18L78.88 58.14C76.91 59.24 74.45 58.89 72.86 57.3L61.08 45.52C59.48 43.92 59.14 41.47 60.23 39.49Z" />
          <path d="M72.54 56.96L69.16 77.35C68.93 78.76 67.69 79.8 66.24 79.77C61.08 79.63 48.87 79.64 39.73 82.2C38.65 82.49 37.61 82.12 36.93 81.43C36.24 80.74 35.87 79.71 36.18 78.65C38.71 69.49 38.75 57.29 38.59 52.11C38.57 50.68 39.61 49.45 41.02 49.21L61.42 45.84" />
          <path d="M51.24 67.13L36.92 81.45" />
        </>
      )}
      {name === 'develop' && (
        <>
          <path d="M79.77 20.27V30.46C79.77 34.01 82.28 36.23 85.84 36.23H95.43C98.98 36.23 101.5 34.02 101.5 30.46V20.27C101.5 16.71 98.98 14.5 95.43 14.5H85.84C82.28 14.5 79.77 16.71 79.77 20.27Z" />
          <path d="M14.5 20.27V30.46C14.5 34.01 17.01 36.23 20.57 36.23H30.16C33.72 36.23 36.23 34.02 36.23 30.46V20.27C36.23 16.71 33.72 14.5 30.16 14.5H20.57C17.01 14.5 14.5 16.71 14.5 20.27Z" />
          <path d="M79.77 85.54V95.72C79.77 99.27 82.28 101.5 85.84 101.5H95.43C98.98 101.5 101.5 99.28 101.5 95.72V85.54C101.5 81.98 98.98 79.76 95.43 79.76H85.84C82.28 79.76 79.77 81.98 79.77 85.54Z" />
          <path d="M14.5 85.54V95.72C14.5 99.27 17.01 101.5 20.57 101.5H30.16C33.72 101.5 36.23 99.28 36.23 95.72V85.54C36.23 81.98 33.72 79.76 30.16 79.76H20.57C17.01 79.76 14.5 81.98 14.5 85.54Z" />
          <path d="M36.34 25.28H79.8M36.34 90.63H79.8M25.54 36.23V79.76M90.63 36.23V79.76" />
          <path d="M42.53 63.25L52.85 63.25L52.85 73.57" />
          <path d="M73.47 52.65H63.15L63.15 42.33" />
        </>
      )}
      {name === 'launch' && (
        <>
          <path d="M34.16 63.46L20.28 79.73V92.56C26.72 90.92 33.25 89.68 39.85 88.85C51.92 87.39 64.12 87.39 76.2 88.85C82.77 89.68 89.29 90.92 95.71 92.56V79.73L81.61 63.46" />
          <path d="M40.74 91.72C37.01 81.52 34.73 70.85 33.97 60.02C33.97 60.02 32.89 25.22 58 14.5C82.73 24.8 82.03 60.02 82.03 60.02C81.29 70.86 79.01 81.53 75.26 91.72C74.16 95.14 72.68 98.42 70.84 101.5H45.21C43.49 98.35 42 95.08 40.74 91.72Z" />
          <circle cx="58.15" cy="59.08" r="6.73" />
          <path d="M54.24 37.02H77.47" />
        </>
      )}
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
function Badge({ children, dark = false, square = '#e83f21' }: { children: ReactNode; dark?: boolean; square?: string }) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="block w-[8px] h-[8px] rounded-[2px]" style={{ background: square }} />
      <p className={`whitespace-nowrap text-[18px] capitalize leading-[24px] ${dark ? 'text-white' : 'text-black'}`}>{children}</p>
      <span className="block w-[8px] h-[8px] rounded-[2px]" style={{ background: square }} />
    </div>
  )
}

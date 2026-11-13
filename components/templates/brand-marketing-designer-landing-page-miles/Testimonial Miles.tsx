/**
 * Testimonials — section 07 ("Kind Words From Kind Clients.")
 * 100% self-contained.
 * Needs: only React 18 + Tailwind CSS. Fonts load from Google Fonts (no npm package).
 */
import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Give+You+Glory&family=Inter+Tight:wght@400&family=Instrument+Serif&family=KoHo:wght@400&display=swap'

// ── Content + photos (CDN) — replace with your real CDN links ────
const TESTIMONIALS = [
  {
    quote:
      '“Our feed went from random posts to a real brand voice. Engagement more than doubled in three months, and it still feels like us.”',
    name: 'Daniel Reyes',
    role: 'Founder, Quillio',
    photo: 'https://cdn.jiro.build/Miles/Image/te1.png',
  },
  {
    quote:
      '“From the logo to the café menus, every detail felt considered. Miles listens first, then designs things that actually work.”',
    name: 'James Whitmore',
    role: 'CEO, Northbeam Coffee',
    photo: 'https://cdn.jiro.build/Miles/Image/te2.png',
  },
  {
    quote:
      '“Miles gave Fernlight a look that finally matches the quality of our formulas. Our new packaging sold out within the first month.”',
    name: 'Arif Rahman',
    role: 'Founder, Fernlight Skincare',
    photo: 'https://cdn.jiro.build/Miles/Image/te3.png',
  },
  {
    quote:
      '“The Move Different campaign stopped people in the street. Sell-through beat our forecast by 40%, and the visuals still get shared.”',
    name: 'Lucas Meyer',
    role: 'Brand Lead, Kitewise',
    photo: 'https://cdn.jiro.build/Miles/Image/te4.png',
  },
]

function Heading({ className = '' }: { className?: string }) {
  return (
    <h2 className={`m-0 font-['Gilda_Display',serif] font-normal capitalize text-[#302d2d] ${className}`}>
      Kind Words From Kind <span className="font-['Give_You_Glory',cursive] leading-[0] text-[#e83f21]">Clients.</span>
    </h2>
  )
}

const LEAD = 'Don’t just take my word for it. Here’s what the brands I’ve worked with have to say.'

function Stars() {
  return (
    <div className="flex items-center gap-[3px]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="19.12" height="18" viewBox="0 0 19.1243 18" aria-hidden>
          <path d="M18.105 7.12H11.58L9.565 1.02L7.543 7.12L1.019 7.113L6.303 10.887L4.282 16.981L9.565 13.213L14.843 16.981L12.828 10.887L18.105 7.12Z" fill="#05DA8D" />
          <path d="M13.281 12.267L12.827 10.888L9.565 13.214L13.281 12.267Z" fill="#136848" />
        </svg>
      ))}
    </div>
  )
}

function Person({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-[#0f2a2b]">
      <p className="m-0 font-['Instrument_Serif',serif] text-[24px] leading-[31px]">{name}</p>
      <p className="m-0 font-['KoHo',sans-serif] text-[16px] leading-[21px]">{role}</p>
    </div>
  )
}

function CardDesktop({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="group relative m-0 h-[343px] w-[651px] shrink-0 overflow-hidden rounded-[20px] bg-white">
      <div className="absolute left-0 top-0 h-[343px] w-[301px] overflow-hidden">
        <img
          src={t.photo}
          alt={t.name}
          className="w-full h-full object-cover object-[50%_30%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      </div>
      <blockquote className="absolute left-[321px] top-[20px] m-0 w-[292px] font-['KoHo',sans-serif] text-[16px] leading-[21px] text-[#0f2a2b]">
        {t.quote}
      </blockquote>
      <figcaption className="absolute left-[321px] top-[226px] flex w-[260px] flex-col gap-[17px]">
        <Stars />
        <Person name={t.name} role={t.role} />
      </figcaption>
    </figure>
  )
}

function CardMobile({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="m-0 flex w-[290px] shrink-0 flex-col overflow-hidden rounded-[18px] bg-white">
      <div className="flex flex-1 flex-col gap-[16px] p-[18px]">
        <blockquote className="m-0 font-['KoHo',sans-serif] text-[15px] leading-[21px] text-[#0f2a2b]">{t.quote}</blockquote>
        <figcaption className="mt-auto flex flex-col gap-[10px]">
          <Stars />
          <Person name={t.name} role={t.role} />
        </figcaption>
      </div>
      <img src={t.photo} alt={t.name} className="block h-[220px] w-full object-cover object-[50%_25%]" />
    </figure>
  )
}

// ── Desktop (≥768px): fixed 1600 × 770 artboard ──────────────────
function TestimonialsDesktop() {
  return (
    <Artboard id="testimonials" height={770} className="bg-[#efded1]">
      <Reveal style={at(80, 78)}>
        <Badge>Testimonials</Badge>
      </Reveal>
      <Reveal delay={200} style={at(80, 122, 568)}>
        <Heading className="text-[60px] leading-[74px] tracking-[-1.8px]" />
      </Reveal>
      <Reveal delay={300} style={at(1198, 180, 322)}>
        <p className="m-0 text-[20px] capitalize leading-[30px] text-[#595859]">{LEAD}</p>
      </Reveal>
      <Reveal delay={200} style={at(0, 330, 1600, 343)}>
        <Marquee offset={-139} gap={20} duration={70} copies={2}>
          {TESTIMONIALS.map((t) => (
            <CardDesktop key={t.name} t={t} />
          ))}
        </Marquee>
      </Reveal>
    </Artboard>
  )
}

// ── Mobile (<768px) ───────────────────────────────────────────────
function TestimonialsMobile() {
  return (
    <section id="testimonials" className="bg-[#efded1] py-[64px]">
      <div className="px-[20px]">
        <Reveal>
          <Badge>Testimonials</Badge>
        </Reveal>
        <Reveal delay={200} className="mt-[14px]">
          <Heading className="text-[40px] leading-[48px] tracking-[-1.2px]" />
        </Reveal>
        <Reveal delay={300} className="mt-[14px]">
          <p className="m-0 text-[17px] capitalize leading-[26px] text-[#595859]">{LEAD}</p>
        </Reveal>
      </div>
      <Marquee className="mt-[32px]" gap={14} duration={40} copies={3}>
        {TESTIMONIALS.map((t) => (
          <CardMobile key={t.name} t={t} />
        ))}
      </Marquee>
    </section>
  )
}

export default function Testimonials() {
  return <Responsive desktop={<TestimonialsDesktop />} mobile={<TestimonialsMobile />} />
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

/** Infinite horizontal loop (Web Animations API). Children are repeated `copies` times; pauses on hover. */
function Marquee({
  children,
  copies = 2,
  duration = 40,
  reverse = false,
  gap = 0,
  offset = 0,
  className = '',
}: {
  children: ReactNode
  copies?: number
  duration?: number
  reverse?: boolean
  gap?: number
  offset?: number
  className?: string
}) {
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const anim = el.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(-${100 / copies}%)` }],
      { duration: duration * 1000, iterations: Infinity, direction: reverse ? 'reverse' : 'normal' },
    )
    const pause = () => anim.pause()
    const play = () => anim.play()
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', play)
    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', play)
      anim.cancel()
    }
  }, [copies, duration, reverse])
  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max" style={{ marginLeft: offset }}>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} aria-hidden={i > 0} className="flex shrink-0 items-stretch" style={{ gap, paddingRight: gap }}>
            {children}
          </div>
        ))}
      </div>
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

/**
 * About — section 02 (metrics bar, quote, client logos, intro, image strip)
 * 100% self-contained.
 * Needs: only React 18 + Tailwind CSS. Fonts load from Google Fonts (no npm package).
 */
import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

// ── Fonts (Goudy Old Style is not on Google Fonts → Sorts Mill Goudy stand-in) ──
const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Give+You+Glory&family=Inter+Tight:ital,wght@0,400;0,500;1,400&family=Onest:wght@500&family=Sorts+Mill+Goudy&display=swap'

// ── Images (CDN) — replace with your real CDN links ──────────────
const ABOUT_LOGO = '/atlas-jr-logo.jpg'
const STRIP = [
  { src: '/space-apps-challenge.png', alt: 'NASA Space Apps Challenge', aspect: 411 / 336 },
  { src: '/space-apps-2026.png', alt: 'NASA Space Apps 2026', aspect: 504 / 265 },
  { src: '/space-apps-next-frontier.png', alt: 'The Next Frontier', aspect: 596 / 354 },
  { src: '/space-apps-kayseri.png', alt: 'NASA Space Apps Challenge Kayseri', aspect: 380 / 369 },
  { src: '/space-apps-ashgabat.png', alt: 'NASA Space Apps Ashgabat', aspect: 635 / 272 },
]

// ── Content ───────────────────────────────────────────────────────
const PRINCIPLES = ['Strategy first', 'Consistency always', 'Results that matter']

const TOOLS = [
  { name: 'ChatGPT', icon: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg' },
  { name: 'Figma', icon: 'https://api.iconify.design/logos/figma.svg' },
  { name: 'Fusion 360', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/autodesk-fusion-360-icon.svg' },
  { name: 'Google AI Studio', icon: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/aistudio.svg' },
  { name: 'Vercel', icon: 'https://api.iconify.design/logos/vercel-icon.svg' },
  { name: 'Gemini', icon: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg' },
  { name: 'CapCut', icon: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/capcut.svg' },
]

function Quote({ className = '' }: { className?: string }) {
  return (
    <p className={`m-0 font-['Gilda_Display',serif] text-[#302d2d] ${className}`}>
      Developed for the 2026 NASA Space Apps Challenge — Build a Junior Astronaut Mission Trainer.
    </p>
  )
}

function Caption() {
  return (
    <div className="flex items-center gap-[16px]">
      <span className="block h-px w-[80px] bg-[#e83f21]" />
      <p className="m-0 whitespace-nowrap text-[16px] leading-[1.8] text-[#8f869d]">Tools we have used</p>
      <span className="block h-px w-[80px] bg-[#e83f21]" />
    </div>
  )
}

function TeamBrand({ small = false }: { small?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[40px] whitespace-nowrap">
      <p className={small ? 'm-0 font-serif text-[40px] leading-[48px] text-white' : 'm-0 font-serif text-[60px] leading-[64px] text-white'}>
        TEAM Atlas jr
      </p>
      <img src="/atlas-jr-logo.jpg" alt="" width={small ? 48 : 64} height={small ? 48 : 64} className="shrink-0 rounded-[6px] object-contain" />
    </div>
  )
}

function ToolLogo({ name, icon, small = false }: { name: string; icon: string; small?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[13px] text-[#8f869d] opacity-90 transition-colors duration-300 hover:text-[#e83f21]">
      <img src={icon} alt="" width={small ? 24 : 34} height={small ? 24 : 34} className="shrink-0 object-contain" />
      <p
        className={`m-0 whitespace-nowrap font-['Onest',sans-serif] font-medium leading-[1.2] tracking-[-0.01em] ${
          small ? 'text-[20px]' : 'text-[28.77px]'
        }`}
      >
        {name}
      </p>
    </div>
  )
}

function Intro({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <Reveal>
        <h2
          className={`m-0 font-['Gilda_Display',serif] font-normal capitalize text-[#302d2d] ${
            mobile ? 'text-[40px] leading-[48px] tracking-[-1.2px]' : 'text-[60px] leading-[74px] tracking-[-1.8px]'
          }`}
        >
          HI!
        </h2>
      </Reveal>
      <Reveal delay={200} className={mobile ? 'mt-[16px]' : 'mt-[23px]'}>
        <p className={`m-0 text-[#5f4837] ${mobile ? 'text-[17px] leading-[27px]' : 'text-[20px] leading-[30px]'}`}>
          We are Atlas Junior, a junior robotics team from Bangladesh bringing space engineering into the classroom through robotics, interactive games, and hands-on learning.
        </p>
      </Reveal>
      <Reveal delay={300} className={mobile ? 'mt-[20px]' : 'mt-[30px]'}>
        <ul className="m-0 list-none p-0">
          {PRINCIPLES.map((p) => (
            <li key={p} className="flex items-center gap-[10px] text-[16px] leading-[30px] text-[#5f4837]">
              <span className="block size-[8px] rounded-full bg-[#e83f21]" />
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  )
}

function StripImage({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  return (
    <div className="shrink-0 overflow-hidden rounded-[18px]" style={{ width: w, height: h }}>
      <img
        src={src}
        alt={alt}
        className="size-full bg-white object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
      />
    </div>
  )
}

// ── Desktop (≥768px): fixed 1600 × 1601 artboard ─────────────────
function AboutDesktop() {
  return (
    <Artboard id="about" height={1601} className="bg-[#efded1]">
      {/* Team banner */}
      <div className="bg-[#0f0201]" style={at(0, 0, 1600, 163)}>
        <Marquee className="absolute left-0 top-[49px] w-[1600px]" copies={8} gap={40} duration={8}>
          <TeamBrand />
        </Marquee>
      </div>

      {/* Quote */}
      <Reveal style={at(358, 256, 884)}>
        <Quote className="text-center text-[60px] leading-[74px] tracking-[-1.8px]" />
      </Reveal>
      <Reveal delay={200} className="flex justify-center" style={at(0, 518, 1600)}>
        <Caption />
      </Reveal>

      {/* Client logos */}
      <div style={at(0, 577, 1600, 35)}>
        <Marquee offset={-21.6} gap={58} duration={40} reverse>
          {TOOLS.map((c) => (
            <ToolLogo key={c.name} {...c} />
          ))}
        </Marquee>
      </div>

      {/* Intro + portrait */}
      <div style={at(60, 692, 667)}>
        <Intro />
      </div>
      <Reveal delay={150} style={at(911, 692, 629, 440)}>
        <div className="group size-full overflow-hidden rounded-[24px]">
          <img
            src={ABOUT_LOGO}
            alt="Team Atlas Jr logo"
            className="size-full bg-white object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>
      </Reveal>

      {/* Image strip */}
      <div style={at(0, 1222, 1600, 322)}>
        <Marquee offset={-105} gap={20} duration={50}>
          {STRIP.map((img) => (
            <StripImage key={img.src} {...img} w={Math.round(img.aspect * 322)} h={322} />
          ))}
        </Marquee>
      </div>
    </Artboard>
  )
}

// ── Mobile (<768px) ───────────────────────────────────────────────
function AboutMobile() {
  return (
    <section id="about" className="bg-[#efded1] pb-[56px]">
      <div className="bg-[#0f0201] py-[28px]">
        <Marquee copies={8} gap={40} duration={8}>
          <TeamBrand small />
        </Marquee>
      </div>

      <div className="px-[20px] pt-[56px] text-center">
        <Reveal>
          <Quote className="text-[30px] leading-[38px] tracking-[-0.9px]" />
        </Reveal>
        <Reveal delay={200} className="mt-[28px] flex justify-center [&_span]:!w-[40px]">
          <Caption />
        </Reveal>
      </div>
      <Marquee className="mt-[20px]" gap={36} duration={30} reverse>
        {TOOLS.map((c) => (
          <ToolLogo key={c.name} {...c} small />
        ))}
      </Marquee>

      <div className="px-[20px] pt-[56px]">
        <Intro mobile />
        <Reveal delay={150} className="mt-[32px] overflow-hidden rounded-[18px]">
          <img src={ABOUT_LOGO} alt="Team Atlas Jr logo" className="block aspect-[629/440] w-full bg-white object-contain" />
        </Reveal>
      </div>

      <Marquee className="mt-[40px]" gap={14} duration={40}>
        {STRIP.map((img) => (
          <StripImage key={img.src} {...img} w={Math.round(img.aspect * 226)} h={226} />
        ))}
      </Marquee>
    </section>
  )
}

export default function About() {
  return <Responsive desktop={<AboutDesktop />} mobile={<AboutMobile />} />
}

// ── Inline SVG icons (client logos) ───────────────────────────────
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


export default function Footer() {
  return (
    <footer id="footer" className="overflow-hidden bg-[#e83f21] px-[clamp(20px,5vw,80px)] pb-[clamp(32px,6vw,96px)] pt-[clamp(24px,5vw,80px)] text-black">
      <img
        src="/atlas-jr-logo.jpg"
        alt="Team Atlas Jr logo"
        width={1254}
        height={1254}
        className="mx-auto mb-[clamp(24px,4vw,64px)] block size-[clamp(128px,27vw,320px)] rounded-[18px] object-contain"
      />
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-[clamp(24px,5vw,80px)]">
        <div className="w-full min-w-0 [container-type:inline-size] sm:flex-1">
          <p className="m-0 whitespace-nowrap font-['Gilda_Display',serif] text-[12.5cqw] leading-[0.98] italic">
            we are<br />
            team atlas.jr<br />
            from bangladesh
          </p>
        </div>
        <a
          href="#home"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-black px-5 py-3 font-['Inter_Tight',sans-serif] text-sm font-medium transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          Drive the rover again
          <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-1">↑</span>
        </a>
      </div>
      <p className="mb-0 mt-[clamp(48px,9vw,144px)] text-center font-['Gilda_Display',serif] text-[clamp(28px,11vw,176px)] leading-none text-[#f7f0d5]">
        TEAM Atlas.jr
      </p>
      <p className="mb-0 mt-5 text-center font-['Inter_Tight',sans-serif] text-[clamp(15px,2vw,24px)]">
        We built a Mars mission trainer so students can see how their decisions shape a mission.
      </p>
    </footer>
  )
}

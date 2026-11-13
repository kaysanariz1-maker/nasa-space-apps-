"use client"

export default function Portfolio() {
  return (
    <section id="work" className="bg-[#e83f21] px-[clamp(20px,4vw,64px)] py-[clamp(32px,6vw,96px)]">
      <div className="mx-auto mb-5 max-w-[1200px] text-white">
        <h2 className="m-0 font-['Gilda_Display',serif] text-[clamp(28px,4vw,56px)] leading-tight">Our Project Rendering</h2>
        <p className="mb-0 mt-2 font-['Inter_Tight',sans-serif]">See our project render in real time!</p>
      </div>
      <video
        src="/atlas-project-render.mp4"
        aria-label="Atlas SkyBase project rendering"
        className="mx-auto block max-h-[80svh] w-full max-w-[1200px] rounded-[14px] bg-black object-contain"
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={({ currentTarget }) => {
          currentTarget.defaultPlaybackRate = 3
          currentTarget.playbackRate = 3
        }}
      />
    </section>
  )
}

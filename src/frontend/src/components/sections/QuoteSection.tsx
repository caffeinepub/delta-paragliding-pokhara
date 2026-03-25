import { IMG } from "@/constants";

export function QuoteSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMG.lake})`,
          filter: "brightness(0.3)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,11,20,0.6)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto fade-in-up">
        <p
          className="font-cinematic tracking-[0.3em] text-sm mb-6"
          style={{ color: "#27D7FF" }}
        >
          AN EXPERIENCE BEYOND WORDS
        </p>
        <blockquote className="font-cinematic text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
          "This is not a ride.
          <br />
          <span
            style={{
              color: "#27D7FF",
              textShadow: "0 0 30px rgba(39,215,255,0.5)",
            }}
          >
            This is a lifetime memory."
          </span>
        </blockquote>
        <div
          className="mt-8 w-24 h-0.5 mx-auto"
          style={{ background: "#FF7A1A" }}
        />
      </div>
    </section>
  );
}

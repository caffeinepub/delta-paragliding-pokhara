import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah M.",
    flag: "🇺🇸",
    country: "USA",
    stars: 5,
    text: "Absolutely life-changing! The pilot was incredibly professional and the views of Annapurna were breathtaking. Best experience of my Nepal trip by far!",
    source: "google",
  },
  {
    name: "James K.",
    flag: "🇬🇧",
    country: "UK",
    stars: 5,
    text: "Booked on a whim and it was the best decision I made in Nepal. The team made me feel completely safe despite my fear of heights. Already planning to come back!",
    source: "tripadvisor",
  },
  {
    name: "Yuki T.",
    flag: "🇯🇵",
    country: "Japan",
    stars: 5,
    text: "Delta Skydiving & Paragliding is world-class. My pilot did acrobatics that felt like flying in a movie. The photos they took are incredible. 100% recommend.",
    source: "google",
  },
  {
    name: "Emma L.",
    flag: "🇦🇺",
    country: "Australia",
    stars: 5,
    text: "Flew with Delta on a perfect morning. Pokhara from the air is something you cannot describe — you just have to experience it. Faultless service.",
    source: "tripadvisor",
  },
  {
    name: "Marco R.",
    flag: "🇮🇹",
    country: "Italy",
    stars: 5,
    text: "I've paraglided in the Alps but Pokhara is on another level. The Himalayas in the background, the lake below — magical. Very professional team.",
    source: "google",
  },
  {
    name: "Priya S.",
    flag: "🇮🇳",
    country: "India",
    stars: 5,
    text: "Was nervous but the pilot calmed me down instantly. The 30-minute flight felt like 5 minutes. Already sent 4 friends here. Thank you Delta!",
    source: "tripadvisor",
  },
  {
    name: "Tom H.",
    flag: "🇩🇪",
    country: "Germany",
    stars: 5,
    text: "Exceptional safety standards, friendly staff, and the most beautiful scenery I've seen from the air. Worth every rupee.",
    source: "google",
  },
  {
    name: "Lisa C.",
    flag: "🇨🇦",
    country: "Canada",
    stars: 5,
    text: "The highlight of my entire Asia trip. Soaring over Phewa Lake with Annapurna right in front of you — pure bliss. Book it, you won't regret it.",
    source: "tripadvisor",
  },
];

function SourceBadge({ source }: { source: string }) {
  if (source === "tripadvisor") {
    return (
      <div
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: "rgba(52,168,83,0.15)", color: "#34A853" }}
      >
        <span>●</span>
        <span>TripAdvisor</span>
      </div>
    );
  }
  return (
    <div
      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: "rgba(66,133,244,0.15)", color: "#4285F4" }}
    >
      <span
        style={{
          background:
            "linear-gradient(135deg, #4285F4 25%, #EA4335 25% 50%, #FBBC04 50% 75%, #34A853 75%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 900,
          fontSize: "11px",
        }}
      >
        G
      </span>
      <span>Google</span>
    </div>
  );
}

export default function EnhancedReviews() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: "#07162A" }}
    >
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center fade-in-up">
        {/* Platform badges */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(52,168,83,0.15)",
              border: "1px solid rgba(52,168,83,0.3)",
              color: "#34A853",
            }}
          >
            <span className="text-lg">●</span>
            TripAdvisor
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(66,133,244,0.15)",
              border: "1px solid rgba(66,133,244,0.3)",
              color: "#4285F4",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4285F4 25%, #EA4335 25% 50%, #FBBC04 50% 75%, #34A853 75%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900,
                fontSize: "16px",
              }}
            >
              G
            </span>
            Google Reviews
          </div>
        </div>

        <p
          className="font-cinematic tracking-[0.4em] text-sm mb-4"
          style={{ color: "#27D7FF" }}
        >
          REAL STORIES
        </p>
        <h2 className="font-cinematic text-5xl md:text-6xl text-white">
          WHAT ADVENTURERS SAY
        </h2>
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right,transparent,black 10%,black 90%,transparent)",
        }}
      >
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <div
              key={`${r.name}-${i < REVIEWS.length ? "a" : "b"}`}
              data-ocid={
                i < REVIEWS.length
                  ? `enhanced_reviews.item.${i + 1}`
                  : undefined
              }
              className="flex-shrink-0 w-72 md:w-80 mx-3 p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                    <Star key={sk} size={12} fill="#FF7A1A" color="#FF7A1A" />
                  ))}
                </div>
                <SourceBadge source={r.source} />
              </div>
              <p
                className="text-sm leading-relaxed mb-4 italic"
                style={{ color: "#9FB2C7" }}
              >
                "{r.text}"
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-cinematic text-sm flex-shrink-0"
                  style={{
                    background: "rgba(39,215,255,0.15)",
                    color: "#27D7FF",
                  }}
                >
                  {r.flag}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs" style={{ color: "#9FB2C7" }}>
                    {r.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { MapPin } from "lucide-react";

export function LocationSection() {
  return (
    <section className="py-24 px-4" style={{ background: "#07162A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in-up">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            WHERE WE FLY
          </p>
          <h2 className="font-cinematic text-5xl md:text-7xl text-white">
            LAUNCH SITE
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={20} color="#FF7A1A" />
              <h3 className="font-cinematic text-3xl text-white">
                SARANGKOT, POKHARA
              </h3>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: "#9FB2C7" }}>
              Our launch site sits at 1,600 meters above sea level on Sarangkot
              Hill — one of the most spectacular paragliding launch points in
              the world. The thermal conditions here are ideal year-round,
              offering long soaring flights above the turquoise Phewa Lake.
            </p>
            <div className="space-y-4">
              {[
                { label: "Launch Site", value: "Sarangkot Hill, 1,600m" },
                { label: "Landing Zone", value: "Pokhara Lakeside" },
                {
                  label: "Best Season",
                  value: "October – May (ideal thermals)",
                },
                {
                  label: "Duration",
                  value: "30–60 minutes depending on package",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="font-cinematic text-sm tracking-wider mt-0.5"
                    style={{ color: "#27D7FF", minWidth: "120px" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-sm" style={{ color: "#9FB2C7" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="fade-in-up rounded-2xl overflow-hidden"
            style={{
              height: "400px",
              border: "1px solid rgba(39,215,255,0.2)",
            }}
          >
            <iframe
              title="Sarangkot"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.8!2d83.9757!3d28.2185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595b8b7f4c1a5%3A0x34ae9f8c9a17b8e6!2sSarangkot!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

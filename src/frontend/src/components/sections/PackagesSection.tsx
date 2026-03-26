import { EMAIL_LINK, IG_LINK, PACKAGES, WA_LINK } from "@/constants";
import { Instagram, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const SEASONAL_WA_LINK =
  "https://wa.me/9779708075788?text=Hi%2C%20I%20want%20to%20know%20more%20about%20seasonal%20skydiving";

function BookingButtons({ pkgId }: { pkgId: string }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`${pkgId}.whatsapp_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: "#25D366",
          boxShadow: "0 0 16px rgba(37,211,102,0.3)",
        }}
      >
        <SiWhatsapp size={16} />
        Book via WhatsApp
      </a>
      <a
        href={IG_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`${pkgId}.instagram_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
          boxShadow: "0 0 16px rgba(220,39,67,0.3)",
        }}
      >
        <Instagram size={16} />
        Book via Instagram
      </a>
      <a
        href={EMAIL_LINK}
        data-ocid={`${pkgId}.email_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: "#1a73e8",
          boxShadow: "0 0 16px rgba(26,115,232,0.3)",
        }}
      >
        <Mail size={16} />
        Book via Email
      </a>
    </div>
  );
}

function SeasonalButton({ pkgId }: { pkgId: string }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <a
        href={SEASONAL_WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`${pkgId}.whatsapp_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: "#25D366",
          boxShadow: "0 0 16px rgba(37,211,102,0.5)",
        }}
      >
        <SiWhatsapp size={16} />📩 DM to Know More
      </a>
    </div>
  );
}

export function PackagesSection() {
  return (
    <section
      id="packages"
      className="py-24 px-4"
      style={{ background: "#07162A" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{
              color: "#27D7FF",
              textShadow: "0 0 15px rgba(39,215,255,0.6)",
            }}
          >
            CHOOSE YOUR ADVENTURE
          </p>
          <h2 className="font-cinematic text-5xl md:text-7xl text-white mb-4">
            FLIGHT PACKAGES
          </h2>
          <div className="neon-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              data-ocid={`packages.item.${i + 1}`}
              className={`relative rounded-2xl overflow-hidden fade-in-up transition-all duration-500 hover:-translate-y-2 ${
                pkg.featured ? "glass-card-featured" : "glass-card"
              }`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {pkg.badge && (
                <div
                  className="absolute top-4 right-4 z-10 font-cinematic text-xs tracking-widest px-3 py-1 rounded-full text-white"
                  style={{
                    background: pkg.seasonal ? "#FF6B1A" : "#FF7A1A",
                    boxShadow: "0 0 15px rgba(255,122,26,0.5)",
                  }}
                >
                  {pkg.badge}
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom,transparent 50%,rgba(10,30,51,0.8) 100%)",
                  }}
                />
              </div>
              <div className="p-6">
                <h3
                  className="font-cinematic text-3xl mb-1"
                  style={{ color: pkg.featured ? "#FF7A1A" : "#27D7FF" }}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm" style={{ color: "#9FB2C7" }}>
                    {pkg.duration}
                  </span>
                  {!pkg.seasonal && pkg.price && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span
                        className="font-cinematic text-2xl"
                        style={{ color: pkg.featured ? "#FF7A1A" : "#fff" }}
                      >
                        {pkg.price}
                      </span>
                    </>
                  )}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9FB2C7" }}
                >
                  {pkg.desc}
                </p>
                {pkg.seasonal ? (
                  <SeasonalButton pkgId={pkg.id} />
                ) : (
                  <BookingButtons pkgId={pkg.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

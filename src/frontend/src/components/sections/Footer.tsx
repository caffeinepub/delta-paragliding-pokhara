import { EMAIL_LINK, IG_LINK, WA_LINK } from "@/constants";
import { Instagram, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="py-12 px-4"
      style={{
        background: "#03080F",
        borderTop: "1px solid rgba(39,215,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-baseline gap-1">
            <span
              className="font-cinematic text-2xl tracking-wider"
              style={{
                color: "#27D7FF",
                textShadow: "0 0 15px rgba(39,215,255,0.5)",
              }}
            >
              DELTA
            </span>
            <span
              className="font-cinematic text-lg tracking-wide"
              style={{ color: "#FF7A1A" }}
            >
              PARAGLIDING
            </span>
          </div>
          <div className="flex items-center gap-4">
            {[
              {
                href: WA_LINK,
                icon: <SiWhatsapp size={18} color="#25D366" />,
                color: "rgba(37,211,102,0.15)",
                border: "rgba(37,211,102,0.3)",
                ocid: "footer.whatsapp_button",
              },
              {
                href: IG_LINK,
                icon: <Instagram size={18} color="#e1306c" />,
                color: "rgba(225,48,108,0.15)",
                border: "rgba(225,48,108,0.3)",
                ocid: "footer.instagram_button",
              },
              {
                href: EMAIL_LINK,
                icon: <Mail size={18} color="#1a73e8" />,
                color: "rgba(26,115,232,0.15)",
                border: "rgba(26,115,232,0.3)",
                ocid: "footer.email_button",
              },
            ].map((s) => (
              <a
                key={s.ocid}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-ocid={s.ocid}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: s.color, border: `1px solid ${s.border}` }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {["HOME", "PACKAGES", "SAFETY", "GALLERY", "CONTACT"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-cinematic text-xs tracking-widest"
                style={{ color: "#9FB2C7" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="neon-divider mb-6" />
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "#9FB2C7" }}
        >
          <p>© {year} Delta Paragliding Pokhara. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#27D7FF" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

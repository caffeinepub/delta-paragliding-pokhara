import { EMAIL_LINK, IG_LINK, WA_LINK } from "@/constants";
import { Instagram, Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{ background: "#050B14" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="fade-in-up mb-14">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            START YOUR ADVENTURE
          </p>
          <h2 className="font-cinematic text-6xl md:text-8xl text-white mb-4">
            READY TO FLY?
          </h2>
          <p className="text-lg" style={{ color: "#9FB2C7" }}>
            Reach out through any channel. We respond fast.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16 fade-in-up">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp_button"
            className="flex flex-col items-center gap-3 p-8 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.3)",
              boxShadow: "0 0 20px rgba(37,211,102,0.1)",
            }}
          >
            <SiWhatsapp size={40} color="#25D366" />
            <span
              className="font-cinematic text-2xl"
              style={{ color: "#25D366" }}
            >
              WHATSAPP
            </span>
            <span className="text-sm" style={{ color: "#9FB2C7" }}>
              +977 9708075788
            </span>
          </a>
          <a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.instagram_button"
            className="flex flex-col items-center gap-3 p-8 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "rgba(220,39,67,0.1)",
              border: "1px solid rgba(220,39,67,0.3)",
              boxShadow: "0 0 20px rgba(220,39,67,0.1)",
            }}
          >
            <Instagram size={40} style={{ color: "#e1306c" }} />
            <span
              className="font-cinematic text-2xl"
              style={{ color: "#e1306c" }}
            >
              INSTAGRAM
            </span>
            <span className="text-sm" style={{ color: "#9FB2C7" }}>
              @deltaparagliding
            </span>
          </a>
          <a
            href={EMAIL_LINK}
            data-ocid="contact.email_button"
            className="flex flex-col items-center gap-3 p-8 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "rgba(26,115,232,0.1)",
              border: "1px solid rgba(26,115,232,0.3)",
              boxShadow: "0 0 20px rgba(26,115,232,0.1)",
            }}
          >
            <Mail size={40} style={{ color: "#1a73e8" }} />
            <span
              className="font-cinematic text-2xl"
              style={{ color: "#1a73e8" }}
            >
              EMAIL
            </span>
            <span className="text-sm" style={{ color: "#9FB2C7" }}>
              summitsoulnepal@gmail.com
            </span>
          </a>
        </div>
        <div className="neon-divider mb-10" />
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center fade-in-up">
          {[
            { Icon: Phone, val: "+977 9708075788" },
            { Icon: Mail, val: "summitsoulnepal@gmail.com" },
            { Icon: Instagram, val: "@deltaparagliding" },
          ].map(({ Icon, val }) => (
            <div
              key={val}
              className="flex items-center gap-2"
              style={{ color: "#9FB2C7" }}
            >
              <Icon size={16} color="#27D7FF" />
              <span className="text-sm">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

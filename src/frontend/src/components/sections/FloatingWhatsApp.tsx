import { WA_LINK } from "@/constants";
import { SiWhatsapp } from "react-icons/si";

export function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="floating.whatsapp_button"
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 pulse-glow-green whatsapp-enter"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} />
    </a>
  );
}

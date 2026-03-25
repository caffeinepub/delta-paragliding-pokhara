import { useEffect, useRef, useState } from "react";

const PANORAMA_SRC = "/assets/generated/pokhara-panorama.dim_4000x1000.jpg";

export default function Panorama360() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoScrollRef = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [cursor, setCursor] = useState("grab");

  const IMG_WIDTH = 4000;

  useEffect(() => {
    let x = 0;
    const speed = 0.4;
    const animate = () => {
      if (!isDragging.current && !dragged) {
        x = (x + speed) % (IMG_WIDTH / 2);
        setOffset(x);
      }
      autoScrollRef.current = requestAnimationFrame(animate);
    };
    autoScrollRef.current = requestAnimationFrame(animate);
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [dragged]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragged(true);
    setCursor("grabbing");
    startX.current = e.clientX;
    scrollLeft.current = offset;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = startX.current - e.clientX;
    const newOffset = Math.max(
      0,
      Math.min(IMG_WIDTH - 800, scrollLeft.current + delta),
    );
    setOffset(newOffset);
  };

  const onMouseUp = () => {
    isDragging.current = false;
    setCursor("grab");
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setDragged(true);
    startX.current = e.touches[0].clientX;
    scrollLeft.current = offset;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = startX.current - e.touches[0].clientX;
    const newOffset = Math.max(
      0,
      Math.min(IMG_WIDTH - 800, scrollLeft.current + delta),
    );
    setOffset(newOffset);
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <section className="py-20 px-4" style={{ background: "#07162A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#FF7A1A" }}
          >
            IMMERSIVE VIEW
          </p>
          <h2 className="font-cinematic text-4xl md:text-5xl text-white mb-4">
            FLY OVER POKHARA
          </h2>
          <p
            className="font-cinematic tracking-[0.2em] text-sm"
            style={{ color: "#27D7FF" }}
          >
            360° Panoramic View
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xl">👆</span>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Drag to explore the panoramic view
          </p>
        </div>

        {/* Panorama Viewer */}
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden select-none"
          style={{
            height: "340px",
            border: "1px solid rgba(39,215,255,0.3)",
            boxShadow: "0 0 60px rgba(39,215,255,0.15)",
            cursor,
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Use actual img tag for reliable asset inclusion */}
          <img
            src={PANORAMA_SRC}
            alt="Pokhara Valley 360 Panorama"
            draggable={false}
            style={{
              width: `${IMG_WIDTH}px`,
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center",
              transform: `translateX(-${offset}px)`,
              transition: isDragging.current
                ? "none"
                : "transform 0.05s linear",
              display: "block",
              pointerEvents: "none",
            }}
          />

          {/* Gradient overlays for depth */}
          <div
            className="absolute inset-y-0 left-0 w-16 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(7,22,42,0.7), transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-16 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(7,22,42,0.7), transparent)",
            }}
          />

          {/* Compass indicator */}
          <div
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background: "rgba(7,22,42,0.8)",
              border: "1px solid rgba(39,215,255,0.3)",
            }}
          >
            <span style={{ color: "#27D7FF", fontSize: "12px" }}>🧭</span>
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              360° VIEW
            </span>
          </div>

          {/* Auto-panning indicator */}
          {!dragged && (
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs"
              style={{
                background: "rgba(39,215,255,0.15)",
                color: "#27D7FF",
                border: "1px solid rgba(39,215,255,0.3)",
              }}
            >
              Auto-panning — drag to take control
            </div>
          )}
        </div>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          ✨ Experience the view from 1,600 meters above Pokhara
        </p>
      </div>
    </section>
  );
}

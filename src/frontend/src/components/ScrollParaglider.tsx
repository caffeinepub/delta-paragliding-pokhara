import { Canvas, useFrame } from "@react-three/fiber";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ── Skydiver under open parachute canopy ─────────────────────────────────────

function Skydiver({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    // Move from top to bottom as user scrolls
    const y = 5.5 - scrollProgress * 11;
    // Gentle horizontal drift
    const x = Math.sin(scrollProgress * Math.PI * 0.8) * 0.8;
    groupRef.current.position.set(x, y, 0);

    // Very gentle sway — under canopy is stable
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.12;
    groupRef.current.rotation.z = Math.sin(t * 0.2 + 0.5) * 0.06;
    groupRef.current.rotation.x = 0;
  });

  const ORANGE = "#FF6B1A";
  const WHITE = "#FFFFFF";
  const SUIT = "#FF6B1A";
  const HELMET = "#222222";
  const SKIN = "#F5CBA7";
  const LINE_COLOR = "#cccccc";

  // Build 8 suspension lines from canopy rim down to harness
  const lines: React.ReactElement[] = [];
  const numLines = 8;
  const canopyRadius = 1.9;
  const canopyY = 1.8; // canopy center y relative to group
  const harnessY = -0.3; // harness attachment y

  for (let li = 0; li < numLines; li++) {
    const angle = (li / numLines) * Math.PI * 2;
    // Rim point at bottom edge of dome
    const rimX = canopyRadius * 0.85 * Math.cos(angle);
    const rimZ = canopyRadius * 0.85 * Math.sin(angle);
    const rimY = canopyY - 0.25; // bottom of dome

    // Central harness attachment
    const attachX = 0;
    const attachY = harnessY;
    const attachZ = 0;

    // Midpoint for line geometry
    const midX = (rimX + attachX) / 2;
    const midY = (rimY + attachY) / 2;
    const midZ = (rimZ + attachZ) / 2;

    // Line length
    const dx = rimX - attachX;
    const dy = rimY - attachY;
    const dz = rimZ - attachZ;
    const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // Direction vector
    const dir = new THREE.Vector3(dx, dy, dz).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);

    lines.push(
      <mesh key={li} position={[midX, midY, midZ]} quaternion={quaternion}>
        <cylinderGeometry args={[0.012, 0.012, length, 4]} />
        <meshStandardMaterial color={LINE_COLOR} roughness={0.7} />
      </mesh>,
    );
  }

  // Canopy panels: alternating orange/white segments
  const panelSegments: React.ReactElement[] = [];
  const numPanels = 8;
  for (let pi = 0; pi < numPanels; pi++) {
    const phiStart = (pi / numPanels) * Math.PI * 2;
    const phiLength = (Math.PI * 2) / numPanels;
    const color = pi % 2 === 0 ? ORANGE : WHITE;
    panelSegments.push(
      <mesh key={pi} position={[0, canopyY, 0]}>
        <sphereGeometry
          args={[canopyRadius, 6, 8, phiStart, phiLength, 0, Math.PI * 0.55]}
        />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>,
    );
  }

  return (
    <group ref={groupRef}>
      {/* ── CANOPY panels ── */}
      {panelSegments}

      {/* ── Canopy vent/top cap (dark) ── */}
      <mesh position={[0, canopyY + canopyRadius * 0.52, 0]}>
        <sphereGeometry args={[0.22, 10, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>

      {/* ── Suspension lines ── */}
      {lines}

      {/* ── HARNESS / container pack (box on back) ── */}
      <mesh position={[0, -0.05, -0.22]}>
        <boxGeometry args={[0.35, 0.45, 0.18]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
      </mesh>

      {/* ── HEAD ── */}
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.18, 14, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {/* Helmet */}
      <mesh position={[0, 0.87, 0.01]} scale={[1.08, 0.88, 1.08]}>
        <sphereGeometry
          args={[0.19, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6]}
        />
        <meshStandardMaterial color={HELMET} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 0.82, 0.18]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.28, 0.08, 0.05]} />
        <meshStandardMaterial
          color="#27D7FF"
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* ── TORSO ── */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.42, 0.52, 0.26]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* White chest stripe */}
      <mesh position={[0, 0.38, 0.14]}>
        <boxGeometry args={[0.1, 0.25, 0.02]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>

      {/* ── HIPS ── */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[0.38, 0.22, 0.24]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>

      {/* ── ARMS — hanging down slightly out from body ── */}
      {/* Left upper arm */}
      <mesh position={[-0.3, 0.22, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.07, 0.3, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Left forearm */}
      <mesh position={[-0.38, -0.08, 0.05]} rotation={[0.15, 0, 0.5]}>
        <capsuleGeometry args={[0.06, 0.26, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.44, -0.28, 0.1]}>
        <sphereGeometry args={[0.065, 8, 7]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>

      {/* Right upper arm */}
      <mesh position={[0.3, 0.22, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.07, 0.3, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Right forearm */}
      <mesh position={[0.38, -0.08, 0.05]} rotation={[0.15, 0, -0.5]}>
        <capsuleGeometry args={[0.06, 0.26, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.44, -0.28, 0.1]}>
        <sphereGeometry args={[0.065, 8, 7]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>

      {/* ── LEGS — hanging down, slightly bent (relaxed in harness) ── */}
      {/* Left upper leg */}
      <mesh position={[-0.14, -0.32, 0.05]} rotation={[0.15, 0, 0.08]}>
        <capsuleGeometry args={[0.08, 0.3, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Left lower leg */}
      <mesh position={[-0.16, -0.62, -0.05]} rotation={[-0.25, 0, 0.05]}>
        <capsuleGeometry args={[0.07, 0.28, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Left boot */}
      <mesh position={[-0.17, -0.82, -0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.22]} />
        <meshStandardMaterial color={HELMET} roughness={0.6} />
      </mesh>

      {/* Right upper leg */}
      <mesh position={[0.14, -0.32, 0.05]} rotation={[0.15, 0, -0.08]}>
        <capsuleGeometry args={[0.08, 0.3, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Right lower leg */}
      <mesh position={[0.16, -0.62, -0.05]} rotation={[-0.25, 0, -0.05]}>
        <capsuleGeometry args={[0.07, 0.28, 5, 8]} />
        <meshStandardMaterial color={SUIT} roughness={0.55} />
      </mesh>
      {/* Right boot */}
      <mesh position={[0.17, -0.82, -0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.22]} />
        <meshStandardMaterial color={HELMET} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.0}
        color="#fff5e0"
        castShadow
      />
      <directionalLight
        position={[-3, 2, -3]}
        intensity={0.6}
        color="#6080ff"
      />
      <pointLight position={[0, 3, 4]} intensity={0.8} color="#FF6B1A" />
      <Skydiver scrollProgress={scrollProgress} />
    </>
  );
}

export default function ScrollParaglider() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

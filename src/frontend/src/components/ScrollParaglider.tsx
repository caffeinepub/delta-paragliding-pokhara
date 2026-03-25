import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ── helpers ─────────────────────────────────────────────────────────────────

function Line({
  p0,
  p1,
  color = "#cccccc",
  r = 0.006,
}: {
  p0: THREE.Vector3;
  p1: THREE.Vector3;
  color?: string;
  r?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    const dir = new THREE.Vector3().subVectors(p1, p0);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(p0, p1).multiplyScalar(0.5);
    ref.current.position.copy(mid);
    ref.current.scale.y = len;
    ref.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize(),
    );
  });
  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[r, r, 1, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} />
    </mesh>
  );
}

// ── canopy ───────────────────────────────────────────────────────────────────
// Realistic inflated paraglider wing:
//  • Elliptical planform (wider centre, tapered tips)
//  • Positive dihedral arc (tips curve up)
//  • Each cell is a smooth rounded lobe (inflated)
//  • Ribs are thin vertical panels between cells

const NUM_CELLS = 9;
const SPAN = 5.0; // full span
const CHORD_MID = 1.6; // chord at centre cell
const CELL_COLOURS = [
  "#c82000",
  "#ffffff",
  "#c82000",
  "#ffffff",
  "#c82000",
  "#ffffff",
  "#c82000",
  "#ffffff",
  "#c82000",
];
const RIB_COLOUR = "#aa1800";

// Precomputed cells so we can use stable non-index keys
const CELLS = CELL_COLOURS.map((color, i) => {
  const p = getCellProps(i);
  return { id: `cell-pos-${i * 111 + 7}`, color, ...p };
});

const RIBS = Array.from({ length: NUM_CELLS + 1 }, (_, i) => {
  const ti = (i - 0.5) / (NUM_CELLS - 1);
  const norm = ti * 2 - 1;
  const x = norm * (SPAN / 2);
  const y = norm * norm * 0.55;
  const z = norm * norm * 0.18;
  const chordScale = Math.sqrt(Math.max(0, 1 - norm * norm * 0.55));
  const chord = CHORD_MID * chordScale;
  return { id: `rib-pos-${i * 113 + 3}`, x, y, z, chord };
});

// Precompute per-cell position on the wing arc
function getCellProps(i: number) {
  const t = i / (NUM_CELLS - 1); // 0..1
  const norm = t * 2 - 1; // -1..1 (tip to tip)

  // Span-wise x position
  const x = norm * (SPAN / 2);

  // Dihedral: tips curve up
  const y = norm * norm * 0.55;

  // Sweep: tips swept back slightly
  const z = norm * norm * 0.18;

  // Elliptical chord taper
  const chordScale = Math.sqrt(Math.max(0, 1 - norm * norm * 0.55));
  const chord = CHORD_MID * chordScale;

  // Cell width (slightly narrower at tips)
  const cellW = (SPAN / NUM_CELLS) * chordScale * 0.97;

  return { x, y, z, chord, cellW };
}

function InflatedCell({
  x,
  y,
  z,
  chord,
  cellW,
  color,
}: {
  x: number;
  y: number;
  z: number;
  chord: number;
  cellW: number;
  color: string;
}) {
  // Each cell: rounded-top box to simulate inflation
  // We use a custom shape: tall box + half-torus cap on top for the bulge
  const bulge = chord * 0.22;
  const boxH = chord * 0.28;
  return (
    <group position={[x, y, -z]}>
      {/* main inflated body – slightly rounded via sphere scale trick */}
      <mesh>
        <boxGeometry args={[cellW, boxH, chord]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.0} />
      </mesh>
      {/* bulge on top (leading edge puff) */}
      <mesh position={[0, boxH * 0.5, -chord * 0.1]}>
        <sphereGeometry args={[bulge, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.0} />
      </mesh>
      {/* trailing edge tuck – darker */}
      <mesh
        position={[0, -boxH * 0.3, chord * 0.38]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[bulge * 0.35, bulge * 0.35, cellW, 8, 1]} />
        <meshStandardMaterial color={RIB_COLOUR} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Canopy() {
  return (
    <group>
      {CELLS.map((cell) => (
        <InflatedCell
          key={cell.id}
          x={cell.x}
          y={cell.y}
          z={cell.z}
          chord={cell.chord}
          cellW={cell.cellW}
          color={cell.color}
        />
      ))}
      {RIBS.map((rib) => (
        <mesh key={rib.id} position={[rib.x, rib.y - rib.chord * 0.05, -rib.z]}>
          <boxGeometry args={[0.018, rib.chord * 0.38, rib.chord]} />
          <meshStandardMaterial color={RIB_COLOUR} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ── suspension lines ──────────────────────────────────────────────────────────
// Four rows of lines per half (A, B, C, D) converging on two risers per side,
// then to the harness shoulder attachment points.

function SuspensionLines() {
  const lines = useMemo(() => {
    const result: {
      p0: THREE.Vector3;
      p1: THREE.Vector3;
      color: string;
      id?: string;
    }[] = [];

    // Riser confluence points (where lines bundle before harness)
    const riserL = new THREE.Vector3(-0.28, -0.85, 0.05);
    const riserR = new THREE.Vector3(0.28, -0.85, 0.05);

    // We attach lines from each cell at A/B/C/D chord positions
    const chordPositions = [-0.38, -0.12, 0.14, 0.36]; // z offsets along chord
    const chordColors = ["#dddddd", "#cccccc", "#bbbbbb", "#aaaaaa"];

    for (let i = 0; i < NUM_CELLS; i++) {
      const p = getCellProps(i);
      const attachY = p.y - p.chord * 0.12;

      chordPositions.forEach((cz, ri) => {
        const attachPt = new THREE.Vector3(
          p.x,
          attachY,
          -p.z - cz * p.chord * 0.6,
        );
        const riser = p.x < 0 ? riserL : riserR;
        // mid-confluence (bundle point per side per row)
        const mid = new THREE.Vector3(
          attachPt.x * 0.6 + riser.x * 0.4,
          attachPt.y * 0.4 + riser.y * 0.6,
          (attachPt.z + riser.z) * 0.5,
        );
        result.push({ p0: attachPt, p1: mid, color: chordColors[ri] });
        result.push({ p0: mid, p1: riser, color: chordColors[ri] });
      });
    }

    // Brake toggles (trailing edge)
    const brakeL = new THREE.Vector3(
      -SPAN / 2 + 0.1,
      getCellProps(0).y - 0.2,
      0.2,
    );
    const brakeR = new THREE.Vector3(
      SPAN / 2 - 0.1,
      getCellProps(NUM_CELLS - 1).y - 0.2,
      0.2,
    );
    result.push({
      p0: brakeL,
      p1: new THREE.Vector3(-0.3, -0.7, 0.3),
      color: "#ff6600",
    });
    result.push({
      p0: brakeR,
      p1: new THREE.Vector3(0.3, -0.7, 0.3),
      color: "#ff6600",
    });

    return result.map((r, idx) => ({ ...r, id: `ln-${idx * 97 + 5}` }));
  }, []);

  return (
    <group>
      {lines.map((l) => (
        <Line key={l.id} p0={l.p0} p1={l.p1} color={l.color} r={0.005} />
      ))}
    </group>
  );
}

// ── pilot + harness ───────────────────────────────────────────────────────────
// Reclined seated position inside a pod harness

function Pilot() {
  return (
    <group position={[0, -1.3, 0.05]}>
      {/* Pod harness - elongated cocoon */}
      <mesh position={[0, -0.1, 0.1]} rotation={[0.25, 0, 0]}>
        <capsuleGeometry args={[0.22, 0.7, 8, 12]} />
        <meshStandardMaterial
          color="#1a2060"
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>
      {/* Harness front panel */}
      <mesh position={[0, 0.05, 0.26]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.42, 0.55, 0.06]} />
        <meshStandardMaterial color="#ff5500" roughness={0.5} />
      </mesh>
      {/* Shoulder straps */}
      <mesh position={[-0.18, 0.28, 0.22]} rotation={[0.1, 0, 0.15]}>
        <boxGeometry args={[0.07, 0.36, 0.05]} />
        <meshStandardMaterial color="#1a2060" roughness={0.6} />
      </mesh>
      <mesh position={[0.18, 0.28, 0.22]} rotation={[0.1, 0, -0.15]}>
        <boxGeometry args={[0.07, 0.36, 0.05]} />
        <meshStandardMaterial color="#1a2060" roughness={0.6} />
      </mesh>
      {/* Carabiner left */}
      <mesh position={[-0.22, 0.25, 0.18]}>
        <torusGeometry args={[0.055, 0.016, 6, 12, Math.PI * 1.7]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Carabiner right */}
      <mesh position={[0.22, 0.25, 0.18]}>
        <torusGeometry args={[0.055, 0.016, 6, 12, Math.PI * 1.7]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.35, 0.12]} rotation={[-0.2, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.35, 6, 10]} />
        <meshStandardMaterial color="#e84000" roughness={0.6} />
      </mesh>
      {/* Head with helmet */}
      <mesh position={[0, 0.72, 0.08]}>
        <sphereGeometry args={[0.155, 14, 12]} />
        <meshStandardMaterial color="#cc3800" roughness={0.4} />
      </mesh>
      {/* Helmet visor */}
      <mesh position={[0, 0.68, 0.2]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.24, 0.1, 0.06]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Left arm with brake toggle */}
      <mesh position={[-0.32, 0.22, 0.2]} rotation={[0.2, 0, -0.6]}>
        <capsuleGeometry args={[0.06, 0.32, 4, 8]} />
        <meshStandardMaterial color="#e84000" roughness={0.6} />
      </mesh>
      {/* Right arm with brake toggle */}
      <mesh position={[0.32, 0.22, 0.2]} rotation={[0.2, 0, 0.6]}>
        <capsuleGeometry args={[0.06, 0.32, 4, 8]} />
        <meshStandardMaterial color="#e84000" roughness={0.6} />
      </mesh>
      {/* Legs reclined in pod */}
      <mesh position={[-0.1, -0.5, 0.15]} rotation={[-0.3, 0, 0.1]}>
        <capsuleGeometry args={[0.07, 0.3, 4, 6]} />
        <meshStandardMaterial color="#1a2060" roughness={0.7} />
      </mesh>
      <mesh position={[0.1, -0.5, 0.15]} rotation={[-0.3, 0, -0.1]}>
        <capsuleGeometry args={[0.07, 0.3, 4, 6]} />
        <meshStandardMaterial color="#1a2060" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ── main animated model ───────────────────────────────────────────────────────

function Paraglider({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const y = 6.0 - scrollProgress * 12;
    const x = Math.sin(scrollProgress * Math.PI * 1.2) * 2.0;
    groupRef.current.position.set(x, y, 0);
    const bankAngle = Math.cos(scrollProgress * Math.PI * 1.2) * 0.18;
    groupRef.current.rotation.z = bankAngle + Math.sin(t * 0.5) * 0.035;
    groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.04 + 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <Canopy />
      <SuspensionLines />
      <Pilot />
    </group>
  );
}

// ── scene & canvas ────────────────────────────────────────────────────────────

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.7} color="#c0d8ff" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.6}
        color="#fff8e8"
        castShadow
      />
      <directionalLight
        position={[-4, 3, -4]}
        intensity={0.35}
        color="#5070ff"
      />
      <Paraglider scrollProgress={scrollProgress} />
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
        camera={{ position: [0, 0, 12], fov: 48 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

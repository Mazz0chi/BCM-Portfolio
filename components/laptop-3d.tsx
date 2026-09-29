"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

/*
 * A modern MacBook Pro built from primitives (no external model): aluminium
 * unibody, black keyboard well with keys, glass trackpad, hinge, and a lid with
 * thin bezels and a notch. Units are roughly decimetres (14" class).
 */
const W = 3.12; // width
const D = 2.18; // depth
const HB = 0.1; // base thickness
const T = 0.06; // lid thickness
const HL = D - 0.06; // lid height
const BEZEL_TOP = 0.05;
const DISPLAY_W = W - 0.14;

// Lid angle: closed lies flat over the keyboard (+90°), open leans back ~15° past vertical.
const LID_CLOSED = Math.PI / 2;
const LID_OPEN = -0.26;

const ALU = "#c4c7cc";

function Keyboard() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const wellW = W * 0.8;
  const wellD = D * 0.4;
  const wellZ = -D / 2 + 0.14 + wellD / 2;

  // Rows of relative key widths; the bottom row carries the space bar.
  const keys = useMemo(() => {
    const rows = [
      Array(14).fill(1),
      Array(14).fill(1),
      [1.5, ...Array(12).fill(1), 1.5],
      [1.75, ...Array(11).fill(1), 2.25],
      [2.25, ...Array(10).fill(1), 2.75],
      [1, 1, 1, 1.25, 5.5, 1.25, 1, 1, 1],
    ];
    const gap = 0.022;
    const rowH = (wellD - gap) / rows.length;
    const out: { x: number; z: number; w: number; d: number }[] = [];
    rows.forEach((row, r) => {
      const total = row.reduce((a, b) => a + b, 0);
      const unit = (wellW - gap) / total;
      // The function row is half height, like the real thing.
      const d = (r === 0 ? rowH * 0.55 : rowH) - gap;
      const z = wellZ - wellD / 2 + gap / 2 + rowH * r + rowH / 2;
      let x = -wellW / 2 + gap / 2;
      row.forEach((k) => {
        const w = k * unit - gap;
        out.push({ x: x + w / 2 + gap / 2, z, w, d });
        x += k * unit;
      });
    });
    return out;
  }, [wellD, wellW, wellZ]);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    keys.forEach((k, i) => {
      m.compose(
        new THREE.Vector3(k.x, HB + 0.006, k.z),
        new THREE.Quaternion(),
        new THREE.Vector3(k.w, 0.012, k.d),
      );
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [keys]);

  return (
    <group>
      <mesh position={[0, HB + 0.0015, wellZ]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[wellW + 0.03, wellD + 0.03]} />
        <meshStandardMaterial color="#141517" roughness={0.9} />
      </mesh>
      <instancedMesh ref={ref} args={[undefined, undefined, keys.length]}>
        <boxGeometry />
        <meshStandardMaterial color="#1c1d20" roughness={0.55} />
      </instancedMesh>
    </group>
  );
}

function Base() {
  return (
    <group>
      <RoundedBox args={[W, HB, D]} radius={0.045} smoothness={5} position={[0, HB / 2, 0]}>
        <meshPhysicalMaterial color={ALU} metalness={0.85} roughness={0.34} clearcoat={0.3} clearcoatRoughness={0.4} />
      </RoundedBox>
      <Keyboard />
      {/* Glass trackpad */}
      <mesh position={[0, HB + 0.0012, D / 2 - 0.1 - D * 0.165]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[W * 0.42, D * 0.33]} />
        <meshPhysicalMaterial color="#cdd0d4" metalness={0.6} roughness={0.18} />
      </mesh>
      {/* Hinge */}
      <mesh position={[0, HB, -D / 2 + 0.035]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.03, 0.03, W * 0.84, 24]} />
        <meshStandardMaterial color="#2b2c30" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Lid({ src, lid, glow }: { src: string; lid: React.RefObject<THREE.Group | null>; glow: React.RefObject<THREE.MeshBasicMaterial | null> }) {
  const gl = useThree((s) => s.gl);
  const map = useTexture(src);
  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.generateMipmaps = true;
    map.needsUpdate = true;
  }, [map, gl]);

  // Fit the screenshot to the display (cover, anchored top).
  const displayH = HL - BEZEL_TOP - 0.12;
  const img = map.image as { width: number; height: number };
  const imgAspect = img.width / img.height;
  const displayAspect = DISPLAY_W / displayH;
  if (imgAspect > displayAspect) {
    map.repeat.set(displayAspect / imgAspect, 1);
    map.offset.set((1 - map.repeat.x) / 2, 0);
  } else {
    map.repeat.set(1, imgAspect / displayAspect);
    map.offset.set(0, 1 - map.repeat.y);
  }

  const displayY = HL - BEZEL_TOP - displayH / 2;

  return (
    <group ref={lid} position={[0, HB, -D / 2 + 0.035]} rotation-x={LID_CLOSED}>
      <RoundedBox args={[W, HL, T]} radius={0.035} smoothness={5} position={[0, HL / 2, -T / 2]}>
        <meshPhysicalMaterial color={ALU} metalness={0.85} roughness={0.34} clearcoat={0.3} clearcoatRoughness={0.4} />
      </RoundedBox>
      {/* Glass panel and bezel */}
      <mesh position={[0, HL / 2, 0.001]}>
        <planeGeometry args={[W - 0.05, HL - 0.05]} />
        <meshPhysicalMaterial color="#060607" roughness={0.12} metalness={0} clearcoat={1} />
      </mesh>
      {/* Display */}
      <mesh position={[0, displayY, 0.002]}>
        <planeGeometry args={[DISPLAY_W, displayH]} />
        <meshBasicMaterial ref={glow} map={map} toneMapped={false} color="#000" />
      </mesh>
      {/* Notch */}
      <mesh position={[0, HL - BEZEL_TOP - 0.03, 0.003]}>
        <planeGeometry args={[0.24, 0.07]} />
        <meshBasicMaterial color="#060607" />
      </mesh>
    </group>
  );
}

function Scene({ progress, src }: { progress: MotionValue<number>; src: string }) {
  const rig = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const smooth = useRef({ p: progress.get(), intro: 0 });

  useEffect(() => progress.on("change", () => invalidate()), [progress, invalidate]);

  useFrame((_, delta) => {
    const s = smooth.current;
    const dt = Math.min(delta, 1 / 30);
    s.p = THREE.MathUtils.damp(s.p, progress.get(), 6, dt);
    s.intro = THREE.MathUtils.damp(s.intro, 1, 3.2, dt);

    // Opening happens over the first 70% of the scroll, then it holds.
    const t = THREE.MathUtils.smoothstep(Math.min(1, s.p / 0.7), 0, 1);

    if (lid.current) lid.current.rotation.x = THREE.MathUtils.lerp(LID_CLOSED, LID_OPEN, t);
    if (glow.current) {
      const on = THREE.MathUtils.smoothstep(t, 0.3, 0.75);
      glow.current.color.setScalar(on);
    }

    if (rig.current) {
      // Fit the open laptop into the canvas at any aspect ratio.
      const dist = camera.position.length();
      const visH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visW = visH * (size.width / size.height);
      const fit = Math.min(visW / 3.9, visH / 3.45);

      // Start: closed, angled, smaller and below the headline. End: open, facing
      // you, centred and filling the stage (the headline has faded by then).
      rig.current.rotation.y = THREE.MathUtils.lerp(-0.62, 0.05, t);
      rig.current.rotation.x = THREE.MathUtils.lerp(0.3, 0.02, t);
      // Portrait screens have a taller headline, so the closed laptop starts lower.
      const startY = size.width < size.height ? -0.1 : 0;
      rig.current.position.y = THREE.MathUtils.lerp(startY, -0.035, t) * visH - (1 - s.intro) * 0.5;
      rig.current.scale.setScalar(fit * THREE.MathUtils.lerp(0.68, 1, t));
    }

    if (Math.abs(s.p - progress.get()) > 0.0005 || s.intro < 0.999) invalidate();
  });

  return (
    <>
      <group ref={rig}>
        {/* Model origin sits at the base; shift it so the open laptop is centred. */}
        <group position={[0, -1.05, 0.15]}>
          <Base />
          <Lid src={src} lid={lid} glow={glow} />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.25} scale={[4.4, 3.4]} blur={2.2} far={0.8} color="#16201a" />
        </group>
      </group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={1.4} />
      <Environment resolution={256} frames={1}>
        {/* Soft studio: a pale room so the aluminium reads silver, not black. */}
        <color attach="background" args={["#dfe3dc"]} />
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 2, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[5, 2, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[0, 1, -6]} scale={[10, 3, 1]} />
      </Environment>
    </>
  );
}

export default function Laptop3D({ progress, src, alt }: { progress: MotionValue<number>; src: string; alt: string }) {
  return (
    <Canvas
      role="img"
      aria-label={alt}
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, 1.3, 7.6], fov: 28, near: 0.1, far: 50 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Scene progress={progress} src={src} />
    </Canvas>
  );
}

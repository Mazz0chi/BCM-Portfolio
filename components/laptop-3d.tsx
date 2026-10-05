"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

/*
 * Model: "2021 Macbook Pro 14" (M1 Pro / M1 Max)" by akshatmittal, CC BY 4.0
 * https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3
 * Optimised with gltf-transform (meshopt geometry, WebP textures). Credited in the footer.
 */
const MODEL = "/models/macbook-pro-14.glb";

// Node names from the source file.
const LID_NODE = "BLWpxSqmmLNyfOl";
const SCREEN_NODE = "abgVijaHVNRUvcc";
// Cover glass in front of the panel: opaque black in the file, which hides the screen.
const GLASS_NODE = "fiqlelggeOoTUAw";

// Hinge axis in the model's local units (centimetres). The file ships open,
// with the lid leaning ~20° back; closing it swings the top forward onto the keyboard.
// Solved from the mesh vertices so the closed lid rests exactly on the base's top
// surface and lines up with its front edge (no overlap, no gap).
const HINGE = new THREE.Vector3(0, -0.028, -11.124);
const LID_CLOSED = 1.9216;
const LID_OPEN = 0;

// Aluminium: the source file's silver is near-white, which washes out on a light
// page. A deeper silver keeps the body readable and the reflections visible.
const ALUMINIUM = new Set(["zqeFZcIteZtOShc", "hPcehRUjcLAosED", "pZbDFXVUkfRwjmQ"]);
const ALUMINIUM_COLOR = "#9ba0a7";
// Port openings and connectors on both sides. In the file they're mid-grey metal,
// which mirrors the bright studio and reads as white; real ports are dark recesses.
const PORTS = new Set([
  "zaEqorbaeeADKgU",
  "WLATjirhQCUYAAG",
  "JjuwNKnMBUdtRLb",
  "kOcboIDeohDRqCf",
  "jAWKNAaRBMlZYro",
  "XNDkEZQapqqDHpk",
  "UPMcPXFSRXevSGt",
  "HPAOpCInJKBtaOC",
]);

// Model is in metres after its root transform (~0.31 wide); scale to scene units.
const MODEL_SCALE = 10;

function Macbook({
  src,
  pivotRef,
  screenRef,
}: {
  src: string;
  pivotRef: React.RefObject<THREE.Group | null>;
  screenRef: React.RefObject<THREE.MeshBasicMaterial | null>;
}) {
  const { scene } = useGLTF(MODEL);
  const gl = useThree((s) => s.gl);
  const map = useTexture(src);

  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();
    // Crop to the panel's ~1.56 aspect, anchored at the top of the page.
    const img = map.image as { width: number; height: number };
    const panel = 1.557;
    const aspect = img.width / img.height;
    if (aspect < panel) {
      map.repeat.set(1, aspect / panel);
      map.offset.set(0, 1 - map.repeat.y);
    } else {
      map.repeat.set(panel / aspect, 1);
      map.offset.set((1 - map.repeat.x) / 2, 0);
    }
    map.needsUpdate = true;
  }, [map, gl]);

  // Re-parent the lid under a pivot on the hinge axis, and swap the screen for the project.
  useMemo(() => {
    const lid = scene.getObjectByName(LID_NODE);
    const screen = scene.getObjectByName(SCREEN_NODE) as THREE.Mesh | undefined;
    if (!lid || !lid.parent || lid.parent.userData.isPivot) return;

    const pivot = new THREE.Group();
    pivot.userData.isPivot = true;
    pivot.position.copy(HINGE);
    lid.parent.add(pivot);
    pivot.add(lid);
    lid.position.copy(HINGE).negate();
    pivot.rotation.x = LID_CLOSED;
    pivotRef.current = pivot;

    if (screen) {
      // The panel ships without a texture, so it has no UVs. Project them from
      // its own bounds: u across the width, v up the (tilted) height.
      const geo = screen.geometry;
      geo.computeBoundingBox();
      const { min, max } = geo.boundingBox!;
      const pos = geo.attributes.position;
      const uv = new Float32Array(pos.count * 2);
      for (let i = 0; i < pos.count; i++) {
        uv[i * 2] = (pos.getX(i) - min.x) / (max.x - min.x);
        uv[i * 2 + 1] = (pos.getY(i) - min.y) / (max.y - min.y);
      }
      geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

      const material = new THREE.MeshBasicMaterial({ map, toneMapped: false, color: 0x000000 });
      screen.material = material;
      screenRef.current = material;
    }

    const glass = scene.getObjectByName(GLASS_NODE) as THREE.Mesh | undefined;
    if (glass) {
      // Keep a faint reflective sheen over the screen, like real glass.
      glass.material = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        metalness: 0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      });
    }

    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const m = mesh.material as THREE.MeshStandardMaterial;
      if (ALUMINIUM.has(m.name)) {
        m.color.set(ALUMINIUM_COLOR);
        m.metalness = 1;
        m.roughness = 0.38;
      } else if (PORTS.has(m.name)) {
        m.color.set("#18191b");
        m.metalness = 0.4;
        m.roughness = 0.55;
        m.emissive?.set(0x000000);
      }
    });
  }, [scene, map, pivotRef, screenRef]);

  return <primitive object={scene} scale={MODEL_SCALE} />;
}

// Intro timeline, in seconds from the first frame after the model has loaded.
const RISE = 1.2; // fade-free rise into place
const OPEN_DELAY = 0.5;
const OPEN_DURATION = 3.2; // lid opening + turn to face the viewer
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function Scene({ src, animate }: { src: string; animate: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Group | null>(null);
  const screen = useRef<THREE.MeshBasicMaterial | null>(null);
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const clock = useRef<number | null>(null);

  // Resizes need a fresh frame to refit the laptop.
  useEffect(() => invalidate(), [size, invalidate]);

  useFrame((state) => {
    if (clock.current === null) clock.current = state.clock.elapsedTime;
    const e = animate ? state.clock.elapsedTime - clock.current : Infinity;

    const rise = easeInOut(Math.min(1, e / RISE));
    const t = easeInOut(THREE.MathUtils.clamp((e - OPEN_DELAY) / OPEN_DURATION, 0, 1));

    if (pivot.current) pivot.current.rotation.x = THREE.MathUtils.lerp(LID_CLOSED, LID_OPEN, t);
    if (screen.current) screen.current.color.setScalar(THREE.MathUtils.smoothstep(t, 0.35, 0.8));

    if (rig.current) {
      // Fit the open laptop into its stage (the area under the headline) with room to breathe.
      const dist = camera.position.length();
      const visH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visW = visH * (size.width / size.height);
      const fit = Math.min(visW / 4.6, visH / 3.3);

      // Closed and turned ~55° (right-side ports toward you) -> open, facing you.
      rig.current.rotation.y = THREE.MathUtils.lerp(-0.95, 0.05, t);
      rig.current.rotation.x = THREE.MathUtils.lerp(0.14, 0.02, t);
      rig.current.position.y = THREE.MathUtils.lerp(-0.08, 0, t) * visH - (1 - rise) * 0.6;
      rig.current.scale.setScalar(fit * THREE.MathUtils.lerp(0.82, 1, t));
    }

    if (e < OPEN_DELAY + OPEN_DURATION) invalidate();
  });

  return (
    <>
      <group ref={rig}>
        {/* Model origin sits at the base's top surface; shift it so the open laptop is centred. */}
        <group position={[0, -0.95, 0.1]}>
          <Macbook src={src} pivotRef={pivot} screenRef={screen} />
          <ContactShadows position={[0, -0.13, 0]} opacity={0.3} scale={[4.2, 3.2]} blur={2.4} far={0.8} color="#16201a" />
        </group>
      </group>
      <ambientLight intensity={0.35} />
      <Environment resolution={512} frames={1}>
        {/* Soft photo studio: large soft boxes so the aluminium reads as brushed silver. */}
        <color attach="background" args={["#d9ddd6"]} />
        <Lightformer form="rect" intensity={4} position={[0, 6, 1]} rotation-x={Math.PI / 2} scale={[12, 5, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[0, 2, 8]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={0.6} position={[0, 1, -8]} scale={[12, 3, 1]} />
      </Environment>
    </>
  );
}

useGLTF.preload(MODEL);

export default function Laptop3D({ src, alt, animate }: { src: string; alt: string; animate: boolean }) {
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
      <Scene src={src} animate={animate} />
    </Canvas>
  );
}

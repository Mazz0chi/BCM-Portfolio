"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

const Laptop3D = dynamic(() => import("@/components/laptop-3d"), { ssr: false });

// How far (px) the 3D canvas runs below the hero, so the intro's rise starts
// off-screen rather than being clipped by the canvas edge.
const BLEED = 240;

function useWebGL() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    },
    () => true,
  );
}

/**
 * Hero: headline on top, laptop below. On load the laptop plays a one-off
 * intro (rises in closed, lid opens, turns to face you, screen powers on) and
 * then rests open. Reduced motion: shown open straight away. No WebGL: a flat
 * screenshot.
 */
export function HeroLaptop({
  children,
  src,
  alt,
}: {
  children: ReactNode;
  src: string | null;
  alt: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const webgl = useWebGL();

  return (
    <div className="mx-auto flex h-[100dvh] min-h-[38rem] w-full max-w-[1400px] flex-col px-4 pb-6 pt-24 md:px-8 md:pt-28">
      {children}
      <div className="pointer-events-none relative mt-4 min-h-0 flex-1">
        {src && webgl ? (
          <div className="absolute inset-x-0 top-0" style={{ bottom: -BLEED }}>
            <Laptop3D src={src} alt={alt} animate={!reduce} bleed={BLEED} />
          </div>
        ) : src ? (
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" />
        ) : null}
      </div>
    </div>
  );
}

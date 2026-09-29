"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Hero visual: a laptop drawn in CSS 3D. It rises in, the lid swings open from
 * closed (lying over the keyboard, toward the viewer) to upright, then the
 * screen powers on to show a project. As the page scrolls it settles back
 * slightly, separating the hero from what follows. Static and open under
 * reduced motion.
 */
export function HeroLaptop({ src, alt }: { src: string | null; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end start"] });
  const settle = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[1040px] pt-6 md:pt-10">
      <motion.div
        style={reduce ? undefined : { scale: settle }}
        initial={reduce ? false : { opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className="relative origin-top [perspective:2200px]"
      >
        {/* Lid */}
        <motion.div
          initial={reduce ? false : { rotateX: -88 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 1.6, delay: 0.55, ease: EASE }}
          className="relative mx-auto w-[86%] origin-bottom [transform-style:preserve-3d]"
        >
          <div className="relative rounded-t-[clamp(10px,2.2vw,22px)] bg-[#0e0f10] p-[1.4%] pb-[1.8%] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),0_0_0_1px_rgb(22_32_26/0.25)]">
            {/* Camera */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[0.55%] aspect-square w-[0.45%] min-w-1 -translate-x-1/2 rounded-full bg-[#26282b]"
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  sizes="(min-width: 1080px) 900px, 86vw"
                  className="object-cover object-top"
                />
              ) : null}
              {/* Power-on: the panel starts black and lights up once the lid is open. */}
              <motion.div
                aria-hidden
                initial={reduce ? false : { opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, delay: 1.7, ease: "easeOut" }}
                className="absolute inset-0 bg-black"
              />
              {/* Glass reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.14)_0%,rgb(255_255_255/0.03)_38%,transparent_55%)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Base: the front lip of the keyboard deck, with the opening notch. */}
        <div className="relative mx-auto h-[clamp(10px,1.6vw,18px)] w-full rounded-b-[40%_100%] rounded-t-[2px] bg-[linear-gradient(180deg,#e4e7ea_0%,#c9cdd2_45%,#9ea3a9_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.9)]">
          <span
            aria-hidden
            className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[10px] bg-[linear-gradient(180deg,#b3b8be,#cfd3d7)]"
          />
        </div>

        {/* Contact shadow */}
        <div
          aria-hidden
          className="mx-auto -mt-1 h-6 w-[92%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(22_32_26/0.28),transparent)] blur-md"
        />
      </motion.div>
    </div>
  );
}

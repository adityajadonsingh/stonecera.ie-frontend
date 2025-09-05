"use client";

import { useEffect, useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import type { Testimonal } from "@/types";

type Props = { testimonials: Testimonal[] };

export default function Testimonials({ testimonials }: Props) {
  // ---------- config ----------
  const DESKTOP_PER_VIEW = 3;
  const MIN_UNIQUE_SLIDES = Math.max(5, DESKTOP_PER_VIEW + 1); // ensure enough unique slides for smooth loop

  // duplicate slides when dataset is small so loop/clones are stable
  const slides = useMemo(() => {
    if (!testimonials?.length) return [];
    let out = [...testimonials];
    // append copies until we reach MIN_UNIQUE_SLIDES
    let dupIndex = 1;
    while (out.length < MIN_UNIQUE_SLIDES) {
      out = out.concat(
        testimonials.map((t) => ({ ...t, _dup: dupIndex++ })) // add _dup so keys can be unique
      );
    }
    return out;
  }, [testimonials]);

  // active slide index (relative)
  const [current, setCurrent] = useState(0);

  // ---------- Keen slider hook ----------
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    // default desktop sizing (will be overridden by breakpoints)
    slides: { perView: DESKTOP_PER_VIEW, spacing: 30 },
    // center the active slide
    // (keen supports 'origin: "center"' for centering slides)
    origin: "center",
    breakpoints: {
      "(max-width: 767px)": { slides: { perView: 1, spacing: 16 }, origin: "center" },
      "(min-width: 768px) and (max-width: 1023px)": { slides: { perView: 2, spacing: 20 }, origin: "center" },
      "(min-width: 1024px)": { slides: { perView: DESKTOP_PER_VIEW, spacing: 30 }, origin: "center" },
    },
    created(s) {
      setCurrent(s.track.details.rel);
    },
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
  });

  // ---------- Ensure slider recalculates when slides change ----------
  useEffect(() => {
    const inst = instanceRef.current;
    if (!inst) return;

    // refresh / update slider so cloned slides & sizes are correct
    // (use both update() and init helpers just in case)
    try {
      inst.update(); // re-calc sizes & bounds
      // move to a stable index (relative index 0) without animation to avoid "stuck" state
      inst.moveToIdx(0, true);
    } catch (err) {
      // ignore - some methods may not exist in older versions, but update() usually does
    }
  }, [slides.length, instanceRef]);

  // ---------- Autoplay (pause on hover) ----------
  useEffect(() => {
    const inst = instanceRef.current;
    if (!inst) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => inst.next(), 4000);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    start();
    const container = inst.container;
    container.addEventListener("mouseover", stop);
    container.addEventListener("mouseout", start);

    return () => {
      stop();
      container.removeEventListener("mouseover", stop);
      container.removeEventListener("mouseout", start);
    };
  }, [instanceRef, slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative testimonials py-16">
      <Image
        src="/media/testimonials-bg.png"
        alt="testimonials"
        fill
        priority
        className="object-cover z-0"
      />

      <div className="container overflow-hidden">
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-center headingH2 !text-white mb-12">
            What Our Customers Say About us
          </h2>

          {/* keen slider container */}
          <div ref={sliderRef} className="keen-slider !overflow-visible">
            {slides.map((t, i) => {
              const key = `${(t as any).id ?? i}-${(t as any)._dup ?? 0}-${i}`;
              return (
                <div key={key} className="keen-slider__slide flex justify-center">
                  <div
                    className={`transition-all duration-500 p-6 rounded-xl shadow-md bg-white text-center mx-auto
                      ${current === i ? "scale-100 opacity-100" : "scale-90 opacity-40"}
                      w-[280px] sm:w-[320px] md:w-[420px] lg:w-[520px]`}
                  >
                    <h3 className="text-lg font-semibold mb-3">{t.name}</h3>
                    <p className="text-gray-600">{t.testimonial}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* navigation */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Prev
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

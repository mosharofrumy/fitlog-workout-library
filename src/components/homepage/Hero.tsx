"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

export default function Hero() {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workoutsElement = document.getElementById("workouts-section");

    if (workoutsElement) {
      workoutsElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gray-800/80 bg-[#121318] p-8 shadow-2xl md:flex-row md:p-12 lg:p-14">
        <div className="w-full max-w-2xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-300">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-heading text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            <span className="block whitespace-nowrap">
              TRAIN WITH INTENT. LOG
            </span>
            <span className="block">EVERY SET.</span>
          </h1>

          <p className="max-w-md text-sm font-normal leading-relaxed text-gray-400 md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today’s plan, and watch the week’s work add up.
          </p>

          <div className="pt-2">
            <Link
              href="#workouts-section"
              onClick={handleScroll}
              className="inline-block cursor-pointer rounded-lg bg-lime-300 px-6 py-3.5 text-xs font-bold tracking-wider text-gray-800 shadow-md transition-all duration-200 hover:bg-lime-400 active:scale-95"
            >
              Browse Workouts
            </Link>
          </div>
        </div>

        <div className="relative flex h-70 w-full max-w-sm items-center justify-center sm:h-85 md:h-95 md:max-w-md">
          <Image
            src="/assets/banner.png"
            alt="Gym Companion Banner"
            fill
            sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

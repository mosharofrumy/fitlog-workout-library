"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState<number>(0);
  const [savedCount, setSavedCount] = useState<number>(0);


  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/exercise/");
  const isMyPlanActive = pathname === "/my-plan";

  useEffect(() => {
    const loadCounts = () => {
      try {
        if (typeof window === "undefined") return;

        const storedPlan = localStorage.getItem("fitlog-plan");
        const storedSaved = localStorage.getItem("fitlog-saved");

        if (storedPlan) {
          const plan = JSON.parse(storedPlan);
          setPlanCount(Array.isArray(plan) ? plan.length : 0);
        } else {
          setPlanCount(0);
        }

        if (storedSaved) {
          const saved = JSON.parse(storedSaved);
          setSavedCount(Array.isArray(saved) ? saved.length : 0);
        } else {
          setSavedCount(0);
        }
      } catch (error) {
        console.error("Error reading count from localStorage:", error);
        setPlanCount(0);
        setSavedCount(0);
      }
    };

    loadCounts();

    const handlePlanUpdate = () => loadCounts();
    const handleSavedUpdate = () => loadCounts();

    window.addEventListener("fitlog:plan-updated", handlePlanUpdate);
    window.addEventListener("fitlog:saved-updated", handleSavedUpdate);

    return () => {
      window.removeEventListener("fitlog:plan-updated", handlePlanUpdate);
      window.removeEventListener("fitlog:saved-updated", handleSavedUpdate);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800/60 bg-[#0c0d10] px-3 py-3 text-white sm:px-6">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between">
   
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-square text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-1 mt-3 w-48 rounded-box border border-gray-800 bg-[#12141a] p-2 shadow-lg sm:w-52"
            >
              <li>
                <Link
                  href="/"
                  className={
                    isWorkoutsActive
                      ? "font-bold text-lime-300"
                      : "text-gray-300 hover:text-white"
                  }
                >
                  Workout
                </Link>
              </li>
              <li>
                <Link
                  href="/my-plan"
                  className={
                    isMyPlanActive
                      ? "font-bold text-lime-300"
                      : "text-gray-300 hover:text-white"
                  }
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
            <Dumbbell className="h-6 w-6 text-lime-300 sm:h-7 sm:w-7" />
            <span className="font-oswald text-xl font-black uppercase tracking-wider text-white sm:text-2xl md:text-3xl">
              FITLOG
            </span>
          </Link>
        </div>

    
        <div className="hidden items-center gap-1 lg:flex">
         
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:text-sm ${
              isWorkoutsActive
                ? "bg-[#1a1d24] text-lime-300 shadow-sm"
                : "text-gray-300 hover:bg-[#1a1d24] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:text-sm ${
              isMyPlanActive
                ? "bg-[#1a1d24] text-lime-300 shadow-sm"
                : "text-gray-300 hover:bg-[#1a1d24] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
         
          <Link
            href="/my-plan?tab=today"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-gray-300 transition-colors hover:bg-[#1a1d24] hover:text-white sm:gap-2 sm:px-2.5"
          >
            <span className="text-xs font-semibold">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1.5 text-xs font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-gray-300 transition-colors hover:bg-[#1a1d24] hover:text-white sm:gap-2 sm:px-2.5"
          >
            <span className="text-xs font-semibold">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-700 bg-[#14161d] px-1.5 text-xs font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
import Link from "next/link";
import { Dumbbell, Menu } from "lucide-react";

export default function Navbar() {
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
                <Link href="/">Workouts</Link>
              </li>
              <li>
                <Link href="/my-plan">My Plan</Link>
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
          <Link href="/">Workouts</Link>
          <Link href="/my-plan" className="">
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-gray-300 transition-colors hover:bg-[#1a1d24] hover:text-white sm:gap-2 sm:px-2.5"
          >
            <span className="text-xs font-semibold">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1.5 text-xs font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-gray-300 transition-colors hover:bg-[#1a1d24] hover:text-white sm:gap-2 sm:px-2.5"
          >
            <span className="text-xs font-semibold">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-700 bg-[#14161d] px-1.5 text-xs font-bold text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

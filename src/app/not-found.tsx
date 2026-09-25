"use client";

import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter text-white/5">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl sm:text-9xl font-black tracking-tight bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
          Sorry, we could nott find the page you are looking for. The page may
          have been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl
            bg-white text-slate-950 font-semibold
            hover:bg-slate-200 transition-all duration-200
            shadow-lg shadow-white/10"
          >
            ← Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl
            border border-slate-700 text-slate-300 font-semibold
            hover:bg-slate-800 hover:text-white
            transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

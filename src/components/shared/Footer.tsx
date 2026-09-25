import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#121318] border-t border-gray-800/60 py-6 px-6 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-lime-300" />
          <span className="font-heading text-lg font-bold uppercase tracking-wider text-white">
            FITLOG
          </span>
        </div>

        <div className="text-gray-400 text-xs font-normal">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log
          honest.
        </div>
      </div>
    </footer>
  );
}

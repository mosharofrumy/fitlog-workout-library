export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
        </div>

        <h2 className="text-xl font-semibold text-white">FitLog</h2>
        <p className="mt-2 text-sm text-slate-500">
          Preparing your workout experience...
        </p>
      </div>
    </main>
  );
}

export default function ReviseLoading() {
  return (
    <main className="min-h-screen">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="animate-pulse space-y-6 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="h-10 w-64 bg-slate-700/50 rounded-lg mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-slate-700/30 rounded-md mx-auto"></div>
          </div>
        </div>

        {/* Decks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="h-8 w-3/4 bg-slate-700/50 rounded-lg"></div>
                <div className="h-4 w-1/2 bg-slate-700/30 rounded-md"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full bg-slate-700/20 rounded-full"></div>
                  <div className="flex justify-between text-xs">
                    <div className="h-3 w-12 bg-slate-700/30 rounded-sm"></div>
                    <div className="h-3 w-12 bg-slate-700/30 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
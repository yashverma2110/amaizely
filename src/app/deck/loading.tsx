export default function DeckLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 animate-pulse">
          <div className="text-left w-full md:w-auto">
            <div className="h-12 w-48 bg-slate-700/50 rounded-lg mb-3"></div>
            <div className="h-6 w-96 bg-slate-700/30 rounded-md"></div>
          </div>
          
          <div className="w-full md:w-auto min-w-[240px]">
            <div className="h-12 bg-slate-700/50 rounded-xl w-full"></div>
          </div>
        </div>

        {/* Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="h-8 w-3/4 bg-slate-700/50 rounded-lg"></div>
                <div className="h-4 w-1/2 bg-slate-700/30 rounded-md"></div>
                <div className="h-4 w-1/3 bg-slate-700/30 rounded-md"></div>
                <div className="mt-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-slate-700/30 rounded-sm"></div>
                    <div className="h-2 w-24 bg-slate-700/20 rounded-sm"></div>
                  </div>
                  <div className="h-8 w-8 bg-slate-700/50 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
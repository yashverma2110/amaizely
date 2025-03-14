export default function DeckEditLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="animate-pulse space-y-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-auto">
              <div className="h-10 w-48 bg-slate-700/50 rounded-lg"></div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="h-10 w-32 bg-slate-700/50 rounded-xl flex-1 md:flex-none"></div>
              <div className="h-10 w-32 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl flex-1 md:flex-none"></div>
            </div>
          </div>
        </div>

        {/* Flashcards Section */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-32 bg-slate-700/50 rounded-lg"></div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-slate-700/30 rounded-lg"></div>
                    <div className="h-8 w-8 bg-slate-700/30 rounded-lg"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-24 bg-slate-700/30 rounded-xl"></div>
                  <div className="h-24 bg-slate-700/30 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
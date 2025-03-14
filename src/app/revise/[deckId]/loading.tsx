export default function ReviseDeckLoading() {
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

        {/* Flashcard Section */}
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 space-y-8">
              {/* Question */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-slate-700/50 rounded-lg"></div>
                <div className="h-32 bg-slate-700/30 rounded-xl"></div>
              </div>

              {/* Answer */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-slate-700/50 rounded-lg"></div>
                <div className="h-32 bg-slate-700/30 rounded-xl"></div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-slate-700/30 rounded-lg"></div>
                  <div className="h-10 w-10 bg-slate-700/30 rounded-lg"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-24 bg-red-500/30 rounded-xl"></div>
                  <div className="h-10 w-24 bg-green-500/30 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default function PurchaseLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Blob Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-pulse">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 bg-slate-700/50 rounded-lg"></div>
            <div className="h-10 w-48 bg-slate-700/50 rounded-lg"></div>
          </div>
          <div className="h-6 w-96 bg-slate-700/30 rounded-md mx-auto"></div>
        </div>

        {/* Purchase Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8">
            <div className="w-full space-y-8 animate-pulse">
              {/* Features List */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-slate-700/50 rounded-full"></div>
                    <div className="h-6 flex-1 bg-slate-700/30 rounded-md"></div>
                  </div>
                ))}
              </div>

              {/* Deck Counter */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-700/50 rounded-full"></div>
                  <div className="h-16 w-32 bg-slate-700/50 rounded-lg"></div>
                  <div className="h-10 w-10 bg-slate-700/50 rounded-full"></div>
                </div>
                <div className="h-6 w-48 bg-slate-700/30 rounded-md"></div>
              </div>

              {/* Price Display */}
              <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-24 bg-slate-700/50 rounded-lg"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-24 bg-slate-700/30 rounded-lg"></div>
                    <div className="h-8 w-32 bg-slate-700/50 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Savings Info */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-green-500/30 rounded-full"></div>
                <div className="h-6 w-64 bg-slate-700/30 rounded-md"></div>
              </div>

              {/* Action Button */}
              <div className="h-14 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl"></div>
            </div>
          </div>

          {/* Balance Card */}
          <div className="mt-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-32 bg-slate-700/50 rounded-lg"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-16 bg-slate-700/50 rounded-lg"></div>
                  <div className="h-6 w-16 bg-slate-700/30 rounded-md"></div>
                  <div className="h-8 w-16 bg-slate-700/50 rounded-lg"></div>
                  <div className="h-6 w-24 bg-slate-700/30 rounded-md"></div>
                </div>
                <div className="h-2 bg-slate-700/30 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
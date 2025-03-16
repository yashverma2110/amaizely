export default function FlashcardDeckCreatorLoading() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse"></div>
          <div className="h-10 w-48 bg-slate-700/50 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-6 w-3/4 bg-slate-700/30 rounded-md animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 w-36 bg-slate-700/50 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-slate-700/30 rounded-sm animate-pulse"></div>
              </div>
            </div>

            {/* Form Loading State */}
            <div className="space-y-4">
              <div className="h-32 bg-slate-700/30 rounded-xl animate-pulse"></div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-32 bg-slate-700/30 rounded-lg animate-pulse"></div>
                <div className="h-10 w-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <div className="space-y-4">
            <div className="h-6 w-48 bg-slate-700/50 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700/30 animate-pulse mt-1"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded-md animate-pulse"></div>
                    <div className="h-4 w-full bg-slate-700/30 rounded-sm animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
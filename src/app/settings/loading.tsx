export default function SettingsLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="animate-pulse space-y-6 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="h-10 w-48 bg-slate-700/50 rounded-lg mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-slate-700/30 rounded-md mx-auto"></div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Section */}
          <div className="animate-pulse">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="h-6 w-32 bg-slate-700/50 rounded-lg"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-slate-700/30 rounded-md"></div>
                  <div className="h-12 bg-slate-700/30 rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-slate-700/30 rounded-md"></div>
                  <div className="h-12 bg-slate-700/30 rounded-xl"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-700/30 rounded-md"></div>
                <div className="h-12 bg-slate-700/30 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="animate-pulse">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="h-6 w-40 bg-slate-700/50 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-16 bg-slate-700/30 rounded-xl"></div>
                <div className="h-12 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="animate-pulse">
            <div className="bg-red-950/20 backdrop-blur-sm border border-red-500/10 rounded-2xl p-6 space-y-6">
              <div className="h-6 w-32 bg-red-500/30 rounded-lg"></div>
              <div className="h-12 bg-red-500/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
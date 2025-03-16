import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="in-app-layout min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 grid grid-cols-12 grid-rows-12">
      {/* Header */}
      <div className="col-span-12 sticky top-0 z-50 px-4 py-3 hidden md:block">
        <div className="container mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
            <AppHeader />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="col-span-12 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div className="col-span-12 pt-10 md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
}
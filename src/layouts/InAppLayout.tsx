import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="in-app-layout min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 py-3 hidden md:block">
        <div className="container mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
            <AppHeader />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div className="pt-10 md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
}
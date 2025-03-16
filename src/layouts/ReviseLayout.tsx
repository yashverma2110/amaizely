import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";

export default function ReviseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="revise-layout min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header (Desktop) */}
      <div className="sticky top-0 z-50 px-4 py-3 hidden md:block">
        <div className="container mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
            <AppHeader />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="h-screen">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
} 
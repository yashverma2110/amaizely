import BottomNavigation from "@/components/BottomNavigation";

export default function ReviseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="revise-layout min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
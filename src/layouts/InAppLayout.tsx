import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/ui/AppHeader";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="min-h-screen max-h-screen overflow-y-auto bg-gray-200 flex-1">
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
}
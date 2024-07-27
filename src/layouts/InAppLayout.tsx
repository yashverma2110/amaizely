import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/ui/AppHeader";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="in-app-layout bg-gray-200 h-screen grid grid-rows-12">
      <AppHeader className="row-span-1" />
      <div className="row-span-10 overflow-y-auto shadow-inner">
        {children}
      </div>
      <BottomNavigation className="row-span-1" />
    </div>
  );
}
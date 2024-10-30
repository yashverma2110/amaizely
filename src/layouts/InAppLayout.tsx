import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/ui/AppHeader";
import Sidebar from "@/components/ui/Sidebar";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="in-app-layout bg-gray-200 h-screen grid grid-cols-12 grid-rows-12">
      <Sidebar className="col-span-2 row-span-12 hidden md:block" />
      <section className="col-span-12 row-span-11 md:row-span-12 grid grid-rows-12 md:col-span-10">
        <AppHeader className="row-span-1 md:hidden" />
        <div className="row-span-11 md:row-span-12 overflow-y-auto shadow-inner">
          {children}
        </div>
      </section>
      <BottomNavigation className="row-span-1 col-span-12 md:hidden" />
    </div>
  );
}
import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/ui/AppHeader";
import Sidebar from "@/components/ui/Sidebar";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="in-app-layout bg-gray-200 h-screen grid grid-cols-12 grid-rows-12 md:grid-rows-[auto_1fr]">
      <Sidebar className="col-span-3 row-span-12 md:row-span-auto hidden md:flex md:flex-col" />
      <div className="blob-bg h-1/2 w-full md:w-3/4 !z-0 md:scale-150 fixed -bottom-[20%] -right-[25%]" />

      <header className="row-span-1 md:row-span-auto col-span-12 md:col-span-9 sticky top-0 md:relative">
        <AppHeader className="h-full" />
      </header>

      {/* App content */}
      <section className="content-container col-span-12 row-span-10 md:row-span-12 grid grid-rows-12 md:col-span-9">
        <div className="row-span-12 z-10 overflow-y-auto">
          {children}
        </div>
      </section>

      <BottomNavigation className="row-span-1 col-span-12 z-10 md:hidden sticky bottom-0" />
    </div>
  );
}
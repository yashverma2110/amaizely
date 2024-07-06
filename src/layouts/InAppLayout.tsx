import BottomNavigation from "@/components/BottomNavigation";

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-full flex-1">
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
}
import DeckTabVariants from "@/components/DeckCreator/DeckTabVariants";

export default function CreateDeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <DeckTabVariants />
      <section className="deck-creator-container bg-gray-100 shadow-inner h-full">
        {children}
      </section>
    </div>
  );
}
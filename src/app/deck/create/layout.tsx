import DeckTabVariants from "@/components/DeckCreator/DeckTabVariants";
import InAppLayout from "@/layouts/InAppLayout";

export default function CreateDeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DeckTabVariants />
      <section className="deck-creator-container">
        {children}
      </section>
    </>
  );
}
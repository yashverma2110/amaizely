import FlashcardDeckCreator from "@/components/DeckCreator/FlashcardDeckCreator";

export default function DeckCreationUsingText() {
  return (
    <div className="create-deck-page flex justify-center p-4">
      <FlashcardDeckCreator variant="text" />
    </div>
  )
}
import FlashcardDeckCreator from "@/components/DeckCreator/FlashcardDeckCreator"

export default function CreateDeckUsingYoutubePage() {
  return (
    <div className="create-deck-page flex justify-center p-4">
      <FlashcardDeckCreator variant="youtube" />
    </div>
  )
}
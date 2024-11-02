"use client"
import FlashcardDeckCreator from "@/components/DeckCreator/FlashcardDeckCreator";

export default function CreateDeckUsingManualPage() {

  return (
    <div className="create-deck-page flex justify-center p-4">
      <FlashcardDeckCreator variant="pdf" />
    </div>
  )
}
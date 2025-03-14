"use client"

import { useEffect, useState } from "react";
import { GET_DECK_WITH_ID_TO_EDIT, IFlashcard } from "@/services/DeckService";
import DeckEditor from "@/components/DeckCreator/DeckEditor";
import { IDeck } from "@/types/IDeck";

export default function EditDeckPage({ params }: { params: { deckId: string } }) {
  const [deck, setDeck] = useState<IDeck>();
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GET_DECK_WITH_ID_TO_EDIT(params.deckId).then((response) => {
      if (response.success) {
        setFlashcards(response.flashcards ?? []);
        setDeck(response.deck);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, [params.deckId])

  if (isLoading) {
    return (
      <section className="deck-loading w-full flex flex-col items-center p-4 gap-4">
        <div className="skeleton bg-gray-300 h-12 rounded w-full drop-shadow"></div>
        <div className="skeleton bg-gray-300 h-12 rounded w-full drop-shadow"></div>
        <div className="skeleton bg-gray-300 h-52 w-full drop-shadow"></div>
        <div className="skeleton bg-gray-300 h-52 w-full drop-shadow"></div>
      </section>
    )
  }

  return (
    <DeckEditor mode="edit" deck={deck} flashcards={flashcards} />
  )
}
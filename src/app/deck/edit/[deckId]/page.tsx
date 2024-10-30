"use client"

import { useEffect, useState } from "react";
import { GET_DECK_AND_DECK_CARDS_WITH_ID, IFlashcard } from "@/services/DeckService";
import DeckEditor from "@/components/DeckCreator/DeckEditor";
import { IDeck } from "@/types/IDeck";

export default function EditDeckPage({ params }: { params: { deckId: string } }) {
  const [deck, setDeck] = useState<IDeck>();
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GET_DECK_AND_DECK_CARDS_WITH_ID(params.deckId).then((response) => {
      if (response.success) {
        setFlashcards(response.flashcards ?? []);
        setDeck(response.deck);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, [params.deckId])

  return (
    <DeckEditor mode="edit" deck={deck} flashcards={flashcards} />
  )
}
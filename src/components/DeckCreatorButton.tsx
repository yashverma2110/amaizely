"use client"

import { useEffect, useRef, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeckCreatorForm from "./DeckCreaterForm";
import DeckLimitIndicator from "./DeckLimitIndicator";
import { GET_USER } from "@/services/AuthService";
import { GET_TOTAL_DECKS } from "@/services/DeckService";

export default function DeckCreatorButton() {
  const deckModal = useRef<HTMLDialogElement>(null)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [totalDecks, setTotalDecks] = useState(0)
  const [decksAllocated, setDecksAllocated] = useState(0)

  useEffect(() => {
    Promise.all([GET_USER(), GET_TOTAL_DECKS()]).then(([userResponse, totalDecksResponse]) => {
      if (userResponse.status === 403 || userResponse.status === 401) {
        redirect('/login')
      }
      setTotalDecks(totalDecksResponse.count)
      setDecksAllocated(userResponse.user?.totalDecks || 0)
    })
  }, [])

  useEffect(() => {
    if (searchParams.get('mode') === 'create') {
      deckModal.current?.showModal();
    }
  }, [searchParams])

  function handleClose() {
    router.replace('/deck');
    deckModal.current?.close();
  }

  return (
    <>
      <button className="btn btn-active btn-primary w-full" onClick={() => deckModal.current?.showModal()}>
        <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
        Create Deck
      </button>

      {
        totalDecks / decksAllocated > 0.4 && <DeckLimitIndicator current={totalDecks} total={decksAllocated} />
      }

      <dialog ref={deckModal} id="deck-creator-modal" className="modal modal-bottom sm:modal-middle">
        <DeckCreatorForm current={totalDecks} total={decksAllocated} onCancel={handleClose} />
      </dialog>
    </>
  )
}
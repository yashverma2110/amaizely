"use client"

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeckCreatorForm from "./DeckCreaterForm";
import DeckLimitIndicator from "./DeckLimitIndicator";
import { GET_USER } from "@/services/AuthService";
import { GET_TOTAL_DECKS } from "@/services/DeckService";

export default function DeckCreatorButton() {
  const deckModal = useRef<HTMLDialogElement>(null)
  const searchParams = useSearchParams();
  const [totalDecks, setTotalDecks] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [decksAllocated, setDecksAllocated] = useState(0)

  useEffect(() => {
    Promise.all([GET_USER(), GET_TOTAL_DECKS()]).then(([userResponse, totalDecksResponse]) => {
      if (userResponse.status === 403 || userResponse.status === 401) {
        return;
      }
      setTotalDecks(totalDecksResponse.count)
      setDecksAllocated(userResponse.user?.totalDecks || 0)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (searchParams.get('mode') === 'create') {
      deckModal.current?.showModal();
    }
  }, [searchParams])

  function handleClose() {
    deckModal.current?.close();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-12 w-full bg-slate-800/50 rounded-xl"></div>
        <div className="flex justify-between">
          <div className="skeleton h-4 w-10 bg-slate-800/30"></div>
          <div className="skeleton h-4 w-24 bg-slate-800/30"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <button 
        className="btn w-full relative overflow-hidden group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 hover:-translate-y-0.5" 
        onClick={() => deckModal.current?.showModal()}
      >
        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-200"></div>
        <FontAwesomeIcon icon={faPlus} className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
        <span>Create Deck</span>
      </button>

      {totalDecks / decksAllocated > 0.4 && <DeckLimitIndicator current={totalDecks} total={decksAllocated} />}

      <dialog ref={deckModal} id="deck-creator-modal" className="modal modal-bottom sm:modal-middle">
        <DeckCreatorForm current={totalDecks} total={decksAllocated} onCancel={handleClose} />
      </dialog>
    </>
  )
}
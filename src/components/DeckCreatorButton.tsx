"use client"

import { useEffect, useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeckCreatorForm from "./DeckCreaterForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function DeckCreatorButton() {
  const deckModal = useRef<HTMLDialogElement>(null)
  const router = useRouter();
  const searchParams = useSearchParams();

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

      <dialog ref={deckModal} id="deck-creator-modal" className="modal modal-bottom sm:modal-middle">
        <DeckCreatorForm onCancel={handleClose} />
      </dialog>
    </>
  )
}
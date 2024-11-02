"use client"

import { useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeckCreatorForm from "./DeckCreaterForm";

export default function DeckCreatorButton() {
  const deckModal = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="btn btn-active btn-primary w-full" onClick={() => deckModal.current?.showModal()}>
        <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
        Create Deck
      </button>

      <dialog ref={deckModal} id="deck-creator-modal" className="modal modal-bottom sm:modal-middle">
        <DeckCreatorForm onCancel={() => deckModal.current?.close()} />
      </dialog>
    </>
  )
}
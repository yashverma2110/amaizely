'use client'

import { DELETE_DECK_WITH_ID } from "@/services/DeckService";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function DeckDeletion({ deckId, deckName }: { deckId: string, deckName: string }) {
  const deckDeletionModal = useRef<HTMLDialogElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeletionConfirmation() {
    deckDeletionModal.current?.showModal();
  }

  async function handleDeletion() {
    setIsDeleting(true);
    await DELETE_DECK_WITH_ID(deckId);
    setIsDeleting(false);

    deckDeletionModal.current?.close();

    window.location.reload();
  }

  function handleCancel() {
    deckDeletionModal.current?.close();
  }

  return (
    <>
      <button className="btn btn-xs btn-error z-10" onClick={handleDeletionConfirmation}>
        <FontAwesomeIcon icon={faTrash} className="h-3 w-3 text-white" />
      </button>

      <dialog ref={deckDeletionModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4 text-sm text-gray-500">Deleting <strong>{deckName}</strong> will remove it from your decks.</p>

          <div className="modal-action flex justify-end gap-1">
            <button className="btn btn-sm btn-ghost" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-sm btn-error text-white" onClick={handleDeletion}>
              {
                isDeleting ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : 'Delete'
              }
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
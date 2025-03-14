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
      <button 
        className="btn btn-ghost btn-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200" 
        onClick={handleDeletionConfirmation}
      >
        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
      </button>

      <dialog ref={deckDeletionModal} className="modal">
        <div className="modal-box bg-slate-800/95 backdrop-blur-lg border border-white/10 text-white">
          <h3 className="text-2xl font-bold mb-4">Delete Deck</h3>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete <span className="font-semibold text-white">{deckName}</span>? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button 
              className="btn btn-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-lg transition-all duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="btn btn-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0 transition-all duration-200"
              onClick={handleDeletion}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">close</button>
        </form>
      </dialog>
    </>
  );
}
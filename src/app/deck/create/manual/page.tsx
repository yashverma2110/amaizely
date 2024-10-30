"use client"

import { useRef, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor"
import { IFlashcard } from "@/services/DeckService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import SaveDeckForm from "@/components/SaveDeckForm";

export default function CreateDeckUsingManualPage() {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const saveDeckModalRef = useRef<HTMLDialogElement>(null)

  function addDummyFlashcard() {
    setFlashcards([...flashcards, { topic: "", content: "" }]);
    setTimeout(() => {
      cardRefs.current[flashcards.length].scrollIntoView({ behavior: 'smooth' });
    })
  }

  function updateFlashcard(index: number, value: string, key: "topic" | "content") {
    setFlashcards(flashcards.map((flashcard, i) => {
      if (i === index) {
        return { ...flashcard, [key]: value }
      }

      return flashcard;
    }))
  }

  return (
    <>
      <div className="create-deck-page flex flex-col gap-4 justify-center p-4">
        <button className="btn btn-active btn-warning w-full" onClick={() => saveDeckModalRef.current?.showModal()}>
          <FontAwesomeIcon icon={faFloppyDisk} size="2x" className="h-4 w-4" />
          Save deck
        </button>
        <button className="btn btn-active btn-primary w-full" onClick={addDummyFlashcard}>
          <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
          Add flashcard
        </button>

        {/* {flashcards.map((flashcard, index) => (
          <div key={index} ref={el => cardRefs.current[index] = el as HTMLDivElement} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2><RichTextEditor value={flashcard.topic} placeholder="Flashcard title" onUpdate={value => updateFlashcard(index, value, "topic")} /></h2>
              <div className="min-h-36">
                <RichTextEditor value={flashcard.content} placeholder="Some interesting information that you want to remember" onUpdate={value => updateFlashcard(index, value, "content")} />
              </div>
            </div>
          </div>
        ))} */}
      </div>

      <dialog id="save-deck-modal" ref={saveDeckModalRef} className="modal modal-bottom sm:modal-middle">
        <SaveDeckForm flashcards={flashcards} onCancel={() => saveDeckModalRef.current?.close()} />
      </dialog>
    </>
  )
}
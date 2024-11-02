import { useEffect, useRef, useState } from "react"
import { IFlashcard } from "@/services/DeckService";
import useLocalPersistence from "@/app/hooks/useLocalPersistence";
import SaveDeckForm from "@/components/SaveDeckForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "../RichTextEditor";
import { removeHtmlTags } from "@/utils/StringUtils";
import { IDeck } from "@/types/IDeck";

interface IDeckEditorProps {
  deck?: IDeck,
  flashcards?: IFlashcard[];
  mode: "create" | "edit";
}
export default function DeckEditor({ deck, flashcards: flashcardsFromProps, mode }: IDeckEditorProps) {
  const [keyForReordering, setKeyForReordering] = useState("");
  const [flashcards, setFlashcards] = useState<IFlashcard[]>(flashcardsFromProps ?? []);
  const [errors, setErrors] = useState<{ [card: string]: Record<string, string> }>({})
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const saveDeckModalRef = useRef<HTMLDialogElement>(null)
  const deckErrorModalRef = useRef<HTMLDialogElement>(null)

  const { persist: persistFlashcards, clear: clearFlashcards } = useLocalPersistence<IFlashcard[]>({ initialValue: flashcardsFromProps, setter: setFlashcards, key: "flashcards_amaizely" });

  function addDummyFlashcard() {
    setFlashcardData([...flashcards, { title: "", content: "" }], false);
    setTimeout(() => {
      scrollToCard(flashcards.length);
    })
  }

  function moveFlashcard(index: number, direction: "up" | "down") {
    const newFlashcards = [...flashcards];
    const temp = newFlashcards[index];
    let targetIndex = 0;
    if (direction === "up") {
      targetIndex = Math.max(0, index - 1);
    } else {
      targetIndex = Math.min(flashcards.length - 1, index + 1);
    }
    newFlashcards[index] = newFlashcards[targetIndex];
    newFlashcards[targetIndex] = temp;
    setFlashcardData(newFlashcards);
    setKeyForReordering(new Date().getTime().toString());
  }

  function scrollToCard(index: number) {
    cardRefs.current[index].scrollIntoView({ behavior: 'smooth' });
  }

  function deleteFlashcard(index: number) {
    setFlashcardData(flashcards.filter((_, i) => i !== index));
  }

  function updateFlashcard(index: number, value: string, key: "title" | "content") {
    setErrors({})
    setFlashcardData(flashcards.map((flashcard, i) => {
      if (i === index) {
        return { ...flashcard, [key]: value }
      }
      return flashcard;
    }))
  }

  function isFlashcardEmpty(flashcard: IFlashcard) {
    return removeHtmlTags(flashcard.title).trim() === "" && removeHtmlTags(flashcard.content).trim() === "";
  }

  function setFlashcardData(cards: IFlashcard[], persist = true) {
    setFlashcards(cards);
    if (persist) {
      persistFlashcards(cards);
    }
  }

  function flashcardsToSave() {
    return flashcards.filter(flashcard => !isFlashcardEmpty(flashcard));
  }

  function getErrorForFlashcard(index: number) {
    return errors[`card-${index}`] ?? {};
  }

  function validateDeck() {
    let isValid = true;

    for (let index = 0; index < flashcards.length; index++) {
      const flashcard = flashcards[index];
      if (isFlashcardEmpty(flashcard)) {
        continue;
      }
      if (removeHtmlTags(flashcard.title).trim() === "") {
        setErrors({ ...errors, [`card-${index}`]: { title: "Please add a title" } });
        isValid = false;
      }
      if (removeHtmlTags(flashcard.content).trim() === "") {
        setErrors({ ...errors, [`card-${index}`]: { content: "Add some content to the flashcard" } });
        isValid = false;
      }
      if (!isValid) {
        scrollToCard(index);
        break;
      }
    }

    return isValid;
  }

  function handleSaveIntent() {
    if (flashcardsToSave().length === 0) {
      deckErrorModalRef.current?.showModal();
      return;
    }

    if (!validateDeck()) {
      return;
    }

    saveDeckModalRef.current?.showModal();
  }

  return (
    <>
      <div className="create-deck-page flex flex-col gap-4 justify-center p-4">
        <button className="btn btn-active btn-warning w-full" onClick={handleSaveIntent}>
          <FontAwesomeIcon icon={faFloppyDisk} size="2x" className="h-4 w-4" />
          Save deck
        </button>
        <button className="btn btn-active btn-primary w-full" onClick={addDummyFlashcard}>
          <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
          Add flashcard
        </button>

        {flashcards.map((flashcard, index) => (
          <div key={index + keyForReordering} ref={el => {
            if (el) cardRefs.current[index] = el;
          }} className="card bg-base-100 shadow-xl">
            <section className="card-body flex flex-col gap-2">
              <span><strong>Card Number</strong>: {index + 1}</span>
              <h2>
                <RichTextEditor
                  value={flashcard.title}
                  limit={80}
                  placeholder="Flashcard title"
                  size="sm"
                  disableCode
                  disableLists
                  message={getErrorForFlashcard(index).title}
                  onUpdate={value => updateFlashcard(index, value, "title")}
                />
              </h2>
              <RichTextEditor
                value={flashcard.content}
                limit={1000}
                message={getErrorForFlashcard(index).content}
                placeholder="Some interesting information that you want to remember"
                onUpdate={value => updateFlashcard(index, value, "content")}
              />
              <div className="card-actions grid grid-cols-3">
                <button className="btn btn-primary btn-sm" disabled={index === 0} onClick={() => moveFlashcard(index, "up")}>
                  <FontAwesomeIcon icon={faArrowUp} />
                  Up
                </button>
                <button className="btn btn-error whitespace-nowrap text-white btn-sm" onClick={() => deleteFlashcard(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
                <button className="btn btn-primary btn-sm" disabled={index === flashcards.length - 1} onClick={() => moveFlashcard(index, "down")}>
                  <FontAwesomeIcon icon={faArrowDown} />
                  Down
                </button>
              </div>
            </section>
          </div>
        ))}

        {
          flashcards.length > 1 && (
            <>
              <button className="btn btn-active btn-primary w-full" onClick={addDummyFlashcard}>
                <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
                Add flashcard
              </button>
              <button className="btn btn-active btn-warning w-full" onClick={handleSaveIntent}>
                <FontAwesomeIcon icon={faFloppyDisk} size="2x" className="h-4 w-4" />
                Save deck
              </button>
            </>
          )
        }
      </div>

      <dialog id="deck-error-modal" ref={deckErrorModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full">
          <h3 className="font-bold text-lg">Add more flashcards</h3>
          <p className="py-2">You need to have at least 1 flashcard to save</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary" onClick={addDummyFlashcard}>
                <FontAwesomeIcon icon={faPlus} />
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="save-deck-modal" ref={saveDeckModalRef} className="modal modal-bottom sm:modal-middle">
        <SaveDeckForm
          flashcards={flashcardsToSave()}
          deck={deck}
          mode={mode}
          onSave={clearFlashcards}
          onCancel={() => saveDeckModalRef.current?.close()}
        />
      </dialog>
    </>
  )
}
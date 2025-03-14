import { useEffect, useRef, useState } from "react"
import { IFlashcard } from "@/services/DeckService";
import { useRouter } from "next/navigation";
import useLocalPersistence from "@/app/hooks/useLocalPersistence";
import SaveDeckForm from "@/components/SaveDeckForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faFloppyDisk, faInfoCircle, faPlus, faTrash, faUnlock, faGripVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "../RichTextEditor";
import { removeHtmlTags } from "@/utils/StringUtils";
import { IDeck } from "@/types/IDeck";
import AlertsManager, { IAlert } from "../AlertsManager";
import { GET_USER } from "@/services/AuthService";
import { FREE_DECKS, FREE_FLASHCARDS_PER_DECK } from "@/config/SubscriptionConstants";

interface IDeckEditorProps {
  deck?: IDeck,
  flashcards?: IFlashcard[];
  mode: "create" | "edit";
}

export default function DeckEditor({ deck, flashcards: flashcardsFromProps, mode }: IDeckEditorProps) {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [totalDecks, setTotalDecks] = useState(FREE_DECKS)
  const [keyForReordering, setKeyForReordering] = useState("");
  const [flashcards, setFlashcards] = useState<IFlashcard[]>(flashcardsFromProps ?? []);
  const [errors, setErrors] = useState<{ [card: string]: Record<string, string> }>({})
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const router = useRouter();
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const saveDeckModalRef = useRef<HTMLDialogElement>(null)
  const deckErrorModalRef = useRef<HTMLDialogElement>(null)
  const discardModalRef = useRef<HTMLDialogElement>(null)

  const { persist: persistFlashcards, clear: clearFlashcards } = useLocalPersistence<IFlashcard[]>({ 
    initialValue: flashcardsFromProps, 
    setter: setFlashcards, 
    key: "flashcards_manual_amaizely", 
    onPersist: onFlashcardsPersisted 
  });

  useEffect(() => {
    GET_USER().then((response) => {
      if (response.status === 403 || response.status === 401) {
        router.replace('/login')
        return;
      }

      if (response.success) {
        setTotalDecks(response.user?.totalDecks || FREE_DECKS)
        setIsAuthenticated(true)
      }
    }).finally(() => {
      setIsPageLoading(false)
    })
  }, [])

  function shouldShowUpsell() {
    if (totalDecks > FREE_DECKS) {
      return false;
    }

    return flashcardsToSave().length > FREE_FLASHCARDS_PER_DECK;
  }

  function onFlashcardsPersisted(cards: IFlashcard[], timestamp: number) {
    if (cards.length > 0) {
      setAlerts([{
        message: `Flashcards have been restored from ${new Date(timestamp).toLocaleString()}`,
        type: "success",
        duration: 3000
      }]);
    }
  }

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
    if (shouldShowUpsell()) {
      router.push("/purchase?intent=manual_card_count")
      return;
    }

    if (flashcardsToSave().length === 0) {
      deckErrorModalRef.current?.showModal();
      return;
    }

    if (!validateDeck()) {
      return;
    }

    saveDeckModalRef.current?.showModal();
  }

  function hasUnsavedChanges() {
    if (mode === "create") {
      return flashcards.length > 0;
    }
    
    if (!flashcardsFromProps || !flashcards) return false;
    
    if (flashcardsFromProps.length !== flashcards.length) return true;
    
    return flashcards.some((card, index) => {
      const originalCard = flashcardsFromProps[index];
      return card.title !== originalCard.title || card.content !== originalCard.content;
    });
  }

  function handleDiscard() {
    if (hasUnsavedChanges()) {
      discardModalRef.current?.showModal();
    } else {
      discardChanges();
    }
  }

  function discardChanges() {
    clearFlashcards();
    if (mode === "edit") {
      setFlashcards(flashcardsFromProps ?? []);
    } else {
      setFlashcards([]);
    }
    router.push('/deck');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
            {mode === "create" ? "Create New Deck" : "Edit Deck"}
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            {mode === "create" 
              ? "Create your flashcards and organize them into a deck." 
              : "Update your flashcards and reorganize them as needed."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="sticky top-4 z-10 mb-8 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <button 
            className={`btn btn-md backdrop-blur-lg transition-all duration-300 ${
              shouldShowUpsell() 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0'
            }`} 
            onClick={handleSaveIntent}
          >
            <FontAwesomeIcon 
              icon={shouldShowUpsell() ? faUnlock : faFloppyDisk} 
              className="h-5 w-5" 
            />
            <span className="font-semibold">
              {shouldShowUpsell() ? "Unlock to Save" : "Save Deck"}
            </span>
          </button>

          <button 
            className="btn btn-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0" 
            onClick={addDummyFlashcard}
          >
            <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
            <span className="font-semibold">Add Flashcard</span>
          </button>

          <button 
            className="btn btn-md bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
            onClick={handleDiscard}
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            <span className="font-semibold">Discard Changes</span>
          </button>

          {shouldShowUpsell() && (
            <p className="flex items-center gap-2 text-sm md:text-base text-amber-300 font-medium">
              <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
              You can only save up to {FREE_FLASHCARDS_PER_DECK} flashcards for free
            </p>
          )}
        </div>

        {/* Flashcards */}
        <div className="space-y-6">
          {flashcards.map((flashcard, index) => (
            <div 
              key={index + keyForReordering} 
              ref={el => { if (el) cardRefs.current[index] = el; }}
              className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              {/* Card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6 space-y-4">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faGripVertical} className="h-5 w-5 text-gray-500" />
                    <span className="text-white/70 font-medium">Card {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="btn btn-sm bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      disabled={index === 0} 
                      onClick={() => moveFlashcard(index, "up")}
                    >
                      <FontAwesomeIcon icon={faArrowUp} className="h-4 w-4" />
                      <span className="max-[382px]:hidden">Up</span>
                    </button>
                    <button 
                      className="btn btn-sm bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      disabled={index === flashcards.length - 1} 
                      onClick={() => moveFlashcard(index, "down")}
                    >
                      <FontAwesomeIcon icon={faArrowDown} className="h-4 w-4" />
                      <span className="max-[382px]:hidden">Down</span>
                    </button>
                    <button 
                      className="btn btn-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
                      onClick={() => deleteFlashcard(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      <span className="max-[382px]:hidden">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <RichTextEditor
                      value={flashcard.title}
                      limit={80}
                      placeholder="Enter a clear and concise title for your flashcard"
                      size="sm"
                      disableCode
                      disableLists
                      message={getErrorForFlashcard(index).title}
                      onUpdate={value => updateFlashcard(index, value, "title")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <RichTextEditor
                      value={flashcard.content}
                      limit={1000}
                      message={getErrorForFlashcard(index).content}
                      placeholder="Add detailed information you want to remember"
                      onUpdate={value => updateFlashcard(index, value, "content")}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Button */}
        {flashcards.length > 0 && (
          <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <button 
              className="btn btn-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0" 
              onClick={addDummyFlashcard}
            >
              <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
              <span className="font-semibold">Add Another Flashcard</span>
            </button>

            <button 
              className={`btn btn-md backdrop-blur-lg transition-all duration-300 ${
                shouldShowUpsell() 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0'
              }`} 
              onClick={handleSaveIntent}
            >
              <FontAwesomeIcon 
                icon={shouldShowUpsell() ? faUnlock : faFloppyDisk} 
                className="h-5 w-5" 
              />
              <span className="font-semibold">
                {shouldShowUpsell() ? "Unlock to Save" : "Save Deck"}
              </span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {flashcards.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/10">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlus} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Create Your First Flashcard</h3>
                <p className="text-gray-300">
                  Start by adding flashcards to your deck. Each flashcard should contain a clear title and detailed content.
                </p>
              </div>
              <button 
                className="btn btn-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 w-full" 
                onClick={addDummyFlashcard}
              >
                <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
                <span className="font-semibold">Add Flashcard</span>
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <dialog id="deck-error-modal" ref={deckErrorModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-slate-800/90 backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Add More Flashcards</h3>
            <p className="text-gray-300 mb-6">You need to have at least 1 flashcard to save your deck.</p>
            <div className="modal-action">
              <form method="dialog">
                <button 
                  className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0" 
                  onClick={addDummyFlashcard}
                >
                  <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  <span>Add Flashcard</span>
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

        <dialog id="discard-changes-modal" ref={discardModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-slate-800/90 backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Discard Changes?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to discard your changes? This action cannot be undone.
            </p>
            <div className="modal-action flex gap-2">
              <form method="dialog" className="flex gap-2">
                <button 
                  className="btn bg-slate-700 hover:bg-slate-600 text-white border-0"
                >
                  Cancel
                </button>
                <button 
                  className="btn bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/20"
                  onClick={discardChanges}
                >
                  Discard Changes
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <AlertsManager alerts={alerts} />
      </div>
    </div>
  );
}
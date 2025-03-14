"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { IDeck } from "@/types/IDeck";
import { CREATE_DECK_WITH_FLASHCARDS, IFlashcard, UPDATE_DECK_AND_DECK_CARDS_BY_ID } from "@/services/DeckService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ISaveDeckFormProps {
  flashcards: IFlashcard[];
  deck?: IDeck;
  createdFrom?: 'youtube' | 'website' | 'text' | 'pdf',
  source?: string,
  mode: "create" | "edit";
  onSave?: () => void;
  onCancel: () => void;
}

export default function SaveDeckForm({ flashcards, deck, createdFrom, source, mode, onSave, onCancel }: ISaveDeckFormProps) {
  const [formErrors, setFormErrors] = useState<Record<'deck-name' | 'deck-description', string>>({
    'deck-name': '',
    'deck-description': ''
  })
  const [isDeckSaving, setIsDeckSaving] = useState(false)
  const router = useRouter()

  function shouldSaveAsDraft() {
    return flashcards.length < 4
  }

  function getFlashcardProps(flashcard: IFlashcard, index: number) {
    if (mode === 'edit') {
      return {
        _id: flashcard._id,
        title: flashcard.title,
        content: flashcard.content,
        order: index,
      }
    }

    return {
      title: flashcard.title,
      content: flashcard.content,
      order: index,
    }
  }

  async function saveFlashcardsInDeck(event: React.FormEvent<HTMLFormElement>) {
    if (isDeckSaving) {
      return;
    }
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const deckName = formData.get('deck-name') as string
    const deckDescription = formData.get('deck-description') as string
    const deckVisibility = formData.get('deck-visibility') as 'on' | 'off'

    if (!deckName || deckName.trim() === '') {
      setFormErrors({
        'deck-name': 'Deck name is required',
        'deck-description': ''
      })
      return;
    }

    if (!deckDescription || deckDescription.trim() === '') {
      setFormErrors({
        'deck-name': '',
        'deck-description': 'Deck description is required'
      })
      return;
    }

    const flashcardsToSave = flashcards.map((flashcard, index) => getFlashcardProps(flashcard, index))

    setIsDeckSaving(true)

    if (mode === "create") {
      const response = await CREATE_DECK_WITH_FLASHCARDS({
        title: deckName,
        description: deckDescription,
        flashcards: flashcardsToSave,
        visibility: deckVisibility === 'on' ? 'public' : 'private',
        createdFrom,
        source,
        isDraft: shouldSaveAsDraft()
      })

      if (response.success) {
        await onSave?.();
        router.push('/deck');
        return;
      }

      setIsDeckSaving(false)
      return;
    }

    if (mode === "edit" && deck) {
      const response = await UPDATE_DECK_AND_DECK_CARDS_BY_ID(deck._id, {
        title: deckName,
        description: deckDescription,
        visibility: deckVisibility === 'on' ? 'public' : 'private',
        isDraft: shouldSaveAsDraft()
      }, flashcardsToSave)
      if (response.success) {
        await onSave?.();
        router.push('/deck');
        return;
      }

      setIsDeckSaving(false)
    }
  }

  return (
    <div className="modal-box bg-slate-800/90 backdrop-blur-lg border border-white/10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
          {mode === "create" ? "Save Your Deck" : "Update Your Deck"}
        </h3>
        {shouldSaveAsDraft() && (
          <p className="text-amber-300 text-sm mt-2 flex items-center gap-2">
            <FontAwesomeIcon icon={faEyeSlash} className="h-4 w-4" />
            Your deck will be saved as a draft since it has less than 4 flashcards
          </p>
        )}
      </div>

      <form onSubmit={saveFlashcardsInDeck} className="space-y-6">
        {/* Deck Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Deck Name
          </label>
          <input 
            type="text" 
            defaultValue={deck?.title} 
            name="deck-name" 
            autoComplete="off" 
            placeholder="Enter a descriptive name for your deck" 
            className={`input w-full bg-slate-900/50 border-white/10 text-white placeholder-gray-400 ${
              formErrors['deck-name'] ? 'border-red-500' : 'focus:border-purple-500'
            }`}
          />
          {formErrors['deck-name'] && (
            <p className="mt-2 text-sm text-red-400">{formErrors['deck-name']}</p>
          )}
        </div>

        {/* Deck Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea 
            defaultValue={deck?.description} 
            className={`textarea w-full bg-slate-900/50 border-white/10 text-white placeholder-gray-400 min-h-[100px] ${
              formErrors['deck-description'] ? 'border-red-500' : 'focus:border-purple-500'
            }`}
            name="deck-description" 
            placeholder="Describe what this deck is about and what learners can expect"
          ></textarea>
          {formErrors['deck-description'] && (
            <p className="mt-2 text-sm text-red-400">{formErrors['deck-description']}</p>
          )}
        </div>

        {/* Visibility Toggle */}
        <div className="form-control">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="deck-visibility" 
              className="toggle toggle-lg bg-slate-700 border-white/10" 
              defaultChecked 
            />
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-gray-300" />
              <span className="text-gray-300">Make this deck public</span>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button"
            className="btn bg-white/5 hover:bg-white/10 text-white border border-white/10"
            disabled={isDeckSaving} 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={`btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 min-w-[100px] ${
              isDeckSaving ? 'opacity-80' : ''
            }`}
            disabled={isDeckSaving}
          >
            {isDeckSaving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{shouldSaveAsDraft() ? 'Save as Draft' : 'Save'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { IDeck } from "@/types/IDeck";
import { CREATE_DECK_WITH_FLASHCARDS, IFlashcard, UPDATE_DECK_AND_DECK_CARDS_BY_ID } from "@/services/DeckService";

interface ISaveDeckFormProps {
  flashcards: IFlashcard[];
  deck?: IDeck;
  mode: "create" | "edit";
  onSave?: () => void;
  onCancel: () => void;
}

export default function SaveDeckForm({ flashcards, deck, mode, onSave, onCancel }: ISaveDeckFormProps) {
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
        isDraft: shouldSaveAsDraft()
      })

      if (response.success) {
        onSave?.();
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
        onSave?.();
        router.push('/deck');
        return;
      }

      setIsDeckSaving(false)
    }

  }


  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Save your deck</h3>
      {shouldSaveAsDraft() && <p className="text-sm text-gray-500">You need to have at least 4 flashcards to publish your deck</p>}
      <form onSubmit={saveFlashcardsInDeck}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" defaultValue={deck?.title} name="deck-name" autoComplete="off" placeholder="Type here" className="input input-bordered w-full" />
        </label>
        {formErrors['deck-name'] && <p className="text-red-500 text-sm mt-1">{formErrors['deck-name']}</p>}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea defaultValue={deck?.description} className="textarea text-base textarea-bordered h-24" name="deck-description" placeholder="Bio"></textarea>
        </label>
        {formErrors['deck-description'] && <p className="text-red-500 text-sm mt-1">{formErrors['deck-description']}</p>}

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Public</span>
            <input type="checkbox" name="deck-visibility" className="toggle" defaultChecked />
          </label>
        </div>

        <div className="form-actions my-4 flex justify-end gap-2">
          <button className="btn btn-neutral" disabled={isDeckSaving} onClick={onCancel}>Cancel</button>
          {shouldSaveAsDraft() ? (
            <button type="submit" className="btn btn-primary">{isDeckSaving ? 'Saving...' : 'Save as draft'}</button>
          ) : (
            <button type="submit" className="btn btn-primary">{isDeckSaving ? 'Saving...' : 'Save'}</button>
          )}
        </div>
      </form>
    </div>
  )
}
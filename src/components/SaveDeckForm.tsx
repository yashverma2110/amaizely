"use client"
import { CREATE_DECK_WITH_FLASHCARDS, IFlashcard } from "@/services/DeckService";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SaveDeckForm({ flashcards, onCancel }: { flashcards: IFlashcard[], onCancel: () => void }) {
  const [formErrors, setFormErrors] = useState<Record<'deck-name' | 'deck-description', string>>({
    'deck-name': '',
    'deck-description': ''
  })
  const [isDeckSaving, setIsDeckSaving] = useState(false)

  const router = useRouter()

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

    const flashcardsToSave = flashcards.map((flashcard, index) => ({
      topic: flashcard.topic,
      content: flashcard.content,
      order: index,
    }))

    setIsDeckSaving(true)
    const response = await CREATE_DECK_WITH_FLASHCARDS({
      title: deckName,
      description: deckDescription,
      flashcards: flashcardsToSave,
      visibility: deckVisibility === 'on' ? 'public' : 'private',
    })
    setIsDeckSaving(false)

    if (response.success) {
      router.push('/deck');
    }
  }


  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Save your flashcards in a deck</h3>
      <form onSubmit={saveFlashcardsInDeck}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" name="deck-name" autoComplete="off" placeholder="Type here" className="input input-bordered w-full" />
        </label>
        {formErrors['deck-name'] && <p className="text-red-500 text-sm mt-1">{formErrors['deck-name']}</p>}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" name="deck-description" placeholder="Bio"></textarea>
        </label>
        {formErrors['deck-description'] && <p className="text-red-500 text-sm mt-1">{formErrors['deck-description']}</p>}

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Public</span>
            <input type="checkbox" name="deck-visibility" className="toggle" defaultChecked />
          </label>
        </div>

        <div className="form-actions my-4 flex justify-end gap-2">
          <button className="btn btn-active btn-neutral" disabled={isDeckSaving} onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-active btn-primary">{isDeckSaving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
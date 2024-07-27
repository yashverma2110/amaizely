"use client"
import { CREATE_DECK_WITH_FLASHCARDS, GENERATE_FLASHCARDS_FROM_TEXT, GENERATE_FLASHCARDS_FROM_WEBSITE, GENERATE_FLASHCARDS_FROM_YOUTUBE, IFlashcard } from "@/services/DeckService"
import FlashcardForm from './FlashcardForm'
import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"

interface IFlashcardCreatorProps {
  variant: 'youtube' | 'website' | 'text'
}
export default function FlashcardDeckCreator({ variant }: IFlashcardCreatorProps) {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([])
  const [formErrors, setFormErrors] = useState<Record<'deck-name' | 'deck-description', string>>({
    'deck-name': '',
    'deck-description': ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeckSaving, setIsDeckSaving] = useState(false)

  const saveDeckModalRef = useRef<HTMLDialogElement>(null)

  const router = useRouter()

  function getCardTitle() {
    switch (variant) {
      case 'youtube':
        return 'Paste YouTube link'
      case 'website':
        return 'Paste Website link'
      case 'text':
        return 'Paste some text'
    }
  }

  function getCardBody() {
    switch (variant) {
      case 'youtube':
        return 'Create an awesome flashcard deck using a YouTube link'
      case 'website':
        return 'Create a flashcard deck from the content on a website'
      case 'text':
        return 'Create a flashcard deck from your notes or any other text'
    }
  }

  async function handleDeckCreationWithYoutube(videoId: string) {
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_YOUTUBE(videoId)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }
  }

  async function handleDeckCreationWithWebsite(website: string) {
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_WEBSITE(website)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }
  }

  async function handleDeckCreationWithText(content: string) {
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_TEXT(content)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }
  }

  async function handleDeckCreation(input: string) {
    switch (variant) {
      case 'youtube':
        return handleDeckCreationWithYoutube(input)
      case 'website':
        return handleDeckCreationWithWebsite(input)
      case 'text':
        return handleDeckCreationWithText(input)
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
      flashcards: flashcardsToSave
    })
    setIsDeckSaving(false)

    if (response.success) {
      router.push('/deck');
    }
  }

  return (
    <div className="youtube-creator w-full flex flex-col gap-4">
      <div className="card border w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{getCardTitle()}</h2>
          <p>{getCardBody()}</p>
          <FlashcardForm variant={variant} onSubmit={handleDeckCreation} />
        </div>
      </div>

      {isLoading && (
        <section className="loading-section h-[1000px] md:h-[500px] grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
        </section>
      )}

      {
        flashcards.length > 0 && (
          <section className="flashcards-container space-y-4">
            <div className="flashcards-toolbar px-4">
              <button className="btn btn-warning w-full md:w-auto" onClick={() => saveDeckModalRef.current?.showModal()}>
                <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5" />
                Save as Deck
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {flashcards.map(flashcard => (
                <div key={flashcard.topic} className="card bg-base-100 w-full shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{flashcard.topic}</h2>
                    <p dangerouslySetInnerHTML={{ __html: flashcard.content }}></p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      }

      <dialog id="save-deck-modal" ref={saveDeckModalRef} className="modal modal-bottom sm:modal-middle">
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

            <div className="form-actions my-4 flex justify-end gap-2">
              <button className="btn btn-active btn-neutral" disabled={isDeckSaving}>Cancel</button>
              <button type="submit" className="btn btn-active btn-primary">{isDeckSaving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}
"use client"
import { GENERATE_FLASHCARDS_FROM_TEXT, GENERATE_FLASHCARDS_FROM_WEBSITE, GENERATE_FLASHCARDS_FROM_YOUTUBE, IFlashcard } from "@/services/DeckService"
import FlashcardForm from './FlashcardForm'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

interface IFlashcardCreatorProps {
  variant: 'youtube' | 'website' | 'text'
}
export default function FlashcardDeckCreator({ variant }: IFlashcardCreatorProps) {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
          <section className="flashcards-container">
            <div className="flashcards-toolbar px-4">
              <button className="btn btn-warning w-full md:w-auto">
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
    </div>
  )
}
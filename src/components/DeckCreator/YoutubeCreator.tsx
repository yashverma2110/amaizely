"use client"
import { GENERATE_FLASHCARDS_FROM_YOUTUBE, IFlashcard } from "@/services/DeckService"
import YouTubeForm from './YoutubeForm'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

export default function YouTubeDeckCreator() {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreationFromYoutube(videoId: string) {
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_YOUTUBE(videoId)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }
  }

  return (
    <div className="youtube-creator w-full flex flex-col gap-4">
      <div className="card border w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Paste YouTube link</h2>
          <p>Create an awesome flashcard deck using a YouTube link</p>
          <YouTubeForm onSubmit={handleCreationFromYoutube} />
        </div>
      </div>

      {isLoading && (
        <section className="loading-section h-[500px] grid grid-cols-3 gap-4 my-8">
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
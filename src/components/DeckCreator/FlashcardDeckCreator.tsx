"use client"
import { GENERATE_FLASHCARDS_FROM_PDF, GENERATE_FLASHCARDS_FROM_TEXT, GENERATE_FLASHCARDS_FROM_WEBSITE, GENERATE_FLASHCARDS_FROM_YOUTUBE, IFlashcard } from "@/services/DeckService"
import FlashcardForm from './FlashcardForm'
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk, faUnlock } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { GET_USER } from "@/services/AuthService"
import SaveDeckForm from "../SaveDeckForm"
import AILoadingState from "../ui/AILoadingState"
import FormErrorMessage from "../ui/FormErrorMessage"
import { FREE_DECKS } from "@/config/SubscriptionConstants"
import FlashcardDeckCreatorLoading from "../ui/FlashcardDeckCreatorLoading"
import AlertsManager, { IAlert } from "../AlertsManager"

interface IFlashcardCreatorProps {
  variant: 'youtube' | 'website' | 'text' | 'pdf';
}
export default function FlashcardDeckCreator({ variant }: IFlashcardCreatorProps) {
  const [clipboardContent, setClipboardContent] = useState<string>("")
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([])
  const [websiteLink, setWebsiteLink] = useState<string>("")
  const [youtubeLink, setYoutubeLink] = useState<string>("")
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [statusCode, setStatusCode] = useState<number>()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [totalDecks, setTotalDecks] = useState(3)
  const [alerts, setAlerts] = useState<IAlert[]>([])

  const saveDeckModalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    GET_USER().then((response) => {
      setIsPageLoading(false)
      if (response.success) {
        setTotalDecks(response.user?.totalDecks || 3)
        setIsAuthenticated(true)
      }
    }).catch(() => {
      setIsPageLoading(false)
    })

    window.addEventListener('paste', (event) => {
      if (variant === 'website' || variant === 'text' || variant === 'pdf') {
        setClipboardContent(event.clipboardData?.getData('text') || "")
      }
    })

    return () => {
      window.removeEventListener('paste', () => { })
    }
  }, [])

  async function handlePaste() {
    try {
      // First check if the clipboard API is available
      if (!navigator.clipboard) {
        setAlerts([{
          message: 'Clipboard access not available',
          type: 'error'
        }])
        return;
      }

      // Request clipboard permission
      const permission = await navigator.permissions.query({
        name: 'clipboard-read' as PermissionName
      });

      if (permission.state === 'denied') {
        setAlerts([{
          message: 'Please allow clipboard access in your browser settings',
          type: 'info'
        }])
        return;
      }

      if (permission.state === 'prompt') {
        // The user will be prompted to grant permission
        const text = await navigator.clipboard.readText();
        setClipboardContent(text);
      } else if (permission.state === 'granted') {
        // Permission already granted
        const text = await navigator.clipboard.readText();
        setClipboardContent(text);
      }
    } catch (error) {
      setAlerts([{
        message: (error as Error).message || 'Failed to access clipboard',
        type: 'error'
      }])
    }
  }

  function getCardTitle() {
    switch (variant) {
      case 'youtube':
        return 'Paste YouTube link'
      case 'website':
        return 'Paste Website link'
      case 'text':
        return 'Paste some text'
      case 'pdf':
        return 'Upload a PDF file'
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
      case 'pdf':
        return 'Create a flashcard deck from a PDF file'
    }
  }

  async function handleDeckCreationWithYoutube(videoId: string, deckSize?: number) {
    setYoutubeLink(videoId);
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_YOUTUBE(videoId, deckSize)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }

    setErrorMessage(response.message)
    setStatusCode(response.status)
  }

  async function handleDeckCreationWithWebsite(website: string, deckSize?: number) {
    setWebsiteLink(website);
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_WEBSITE(website, deckSize)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }

    setErrorMessage(response.message)
  }

  async function handleDeckCreationWithText(content: string, deckSize?: number) {
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_TEXT(content, deckSize)
    setIsLoading(false)
    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }

    setErrorMessage(response.message)
    setStatusCode(response.status)
  }

  async function handleDeckCreationWithPdf(file: File, deckSize?: number) {
    setIsLoading(true)
    const response = await GENERATE_FLASHCARDS_FROM_PDF(file, deckSize)
    setIsLoading(false)

    if (response.success && response.flashcards) {
      setFlashcards(response.flashcards)
      return;
    }

    setErrorMessage(response.message)
    setStatusCode(response.status)
    setIsLoading(false)
  }

  async function handleDeckCreation(input?: string, file?: File, deckSize?: number) {
    setErrorMessage("")
    if (isLoading) {
      return;
    }

    if (input) {
      switch (variant) {
        case 'youtube':
          return handleDeckCreationWithYoutube(input, deckSize)
        case 'website':
          return handleDeckCreationWithWebsite(input, deckSize)
        case 'text':
          return handleDeckCreationWithText(input, deckSize)
      }

      return;
    }

    if (file) {
      return handleDeckCreationWithPdf(file, deckSize)
    }
  }

  if (isPageLoading) {
    return <FlashcardDeckCreatorLoading />
  }

  return (
    <div className="youtube-creator w-full flex flex-col gap-4">
      <div className="card border w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{getCardTitle()}</h2>
          <p>{getCardBody()}</p>
          <FlashcardForm
            defaultValue={clipboardContent}
            variant={variant}
            hasSubscription={totalDecks > FREE_DECKS}
            onPaste={handlePaste}
            onSubmit={handleDeckCreation}
          />
          {errorMessage && <FormErrorMessage message={errorMessage} />}
          {
            statusCode === 402 && (
              <Link href="/purchase?intent=ai_generation">
                <button className="btn btn-warning w-full">
                  Purchase <FontAwesomeIcon icon={faUnlock} className="h-5 w-5" />
                </button>
              </Link>
            )
          }
        </div>
      </div>

      {isLoading && (
        <section className="loading-section my-8 flex justify-center rounded-xl overflow-hidden drop-shadow-lg">
          <AILoadingState mode={variant} link={youtubeLink || websiteLink} />
        </section>
      )}

      {
        flashcards.length > 0 && (
          <section className="flashcards-container w-full space-y-4 drop-shadow-lg">
            <div className="flashcards-toolbar">
              {isAuthenticated ?
                <button className="btn btn-warning w-full" onClick={() => saveDeckModalRef.current?.showModal()}>
                  <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5" />
                  {isAuthenticated ? 'Save' : 'Login to save'}
                </button>
                :
                <Link href="/login" className="btn btn-warning w-full">
                  <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5" />
                  Login to save
                </Link>
              }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {flashcards.map(flashcard => (
                <div key={flashcard.title} className={`card bg-base-100 w-full shadow-xl ${flashcard.hidden ? 'blur' : ''}`}>
                  <div className="card-body">
                    <h2 className="card-title">{flashcard.title}</h2>
                    <p className="rich-content" dangerouslySetInnerHTML={{ __html: flashcard.content }}></p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      }

      <dialog id="save-deck-modal" ref={saveDeckModalRef} className="modal modal-bottom sm:modal-middle">
        <SaveDeckForm
          mode="create"
          flashcards={flashcards}
          createdFrom={variant}
          source={youtubeLink || websiteLink}
          onCancel={() => saveDeckModalRef.current?.close()}
        />
      </dialog>

      <AlertsManager alerts={alerts} />
    </div>
  )
}
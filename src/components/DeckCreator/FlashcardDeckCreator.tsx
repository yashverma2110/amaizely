"use client"
import { GENERATE_FLASHCARDS_FROM_PDF, GENERATE_FLASHCARDS_FROM_TEXT, GENERATE_FLASHCARDS_FROM_WEBSITE, GENERATE_FLASHCARDS_FROM_YOUTUBE, IFlashcard } from "@/services/DeckService"
import FlashcardForm from './FlashcardForm'
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk, faUnlock, faFilePdf, faRobot, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import SaveDeckForm from "../SaveDeckForm"
import AILoadingState from "../ui/AILoadingState"
import FormErrorMessage from "../ui/FormErrorMessage"
import FlashcardDeckCreatorLoading from "../ui/FlashcardDeckCreatorLoading"
import AlertsManager, { IAlert } from "../AlertsManager"
import { useAuth } from "@/contexts/AuthContext"
import { FREE_DECKS } from "@/config/SubscriptionConstants"

interface IFlashcardCreatorProps {
  variant: 'youtube' | 'website' | 'text' | 'pdf';
}

export default function FlashcardDeckCreator({ variant }: IFlashcardCreatorProps) {
  const [clipboardContent, setClipboardContent] = useState<string>("")
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([])
  const [websiteLink, setWebsiteLink] = useState<string>("")
  const [youtubeLink, setYoutubeLink] = useState<string>("")
  const [statusCode, setStatusCode] = useState<number>()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [alerts, setAlerts] = useState<IAlert[]>([])

  const { isAuthenticated, isLoading: isAuthLoading, totalDecks } = useAuth();
  const saveDeckModalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (variant === 'website' || variant === 'text' || variant === 'pdf') {
        setClipboardContent(event.clipboardData?.getData('text') || "")
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [variant]);

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

  function getCardBody() {
    switch (variant) {
      case 'youtube':
        return 'Our AI will analyze the video content and generate relevant flashcards from key concepts'
      case 'website':
        return 'Simply paste a URL and our AI will extract important information to create flashcards'
      case 'text':
        return 'Paste your text and our AI will identify key points to transform into effective flashcards'
      case 'pdf':
        return 'Upload a PDF document and our AI will convert important concepts into organized flashcards'
    }
  }

  function getPageTitle() {
    switch (variant) {
      case 'youtube':
        return 'Create from YouTube'
      case 'website':
        return 'Create from Website'
      case 'text':
        return 'Create from Text'
      case 'pdf':
        return 'Create from PDF'
    }
  }

  function getPageDescription() {
    switch (variant) {
      case 'youtube':
        return 'Transform any YouTube video into an interactive flashcard deck. Perfect for learning from educational content, lectures, and tutorials.'
      case 'website':
        return 'Convert web articles and blog posts into a structured flashcard deck. Great for studying online resources and documentation.'
      case 'text':
        return 'Turn your notes, documents or any text content into an organized flashcard deck. Ideal for reviewing class notes or study materials.'
      case 'pdf':
        return 'Extract key concepts from PDF documents and create a comprehensive flashcard deck. Perfect for textbooks and academic papers.'
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

  if (isAuthLoading) {
    return <FlashcardDeckCreatorLoading />
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <FontAwesomeIcon icon={variant === 'pdf' ? faFilePdf : faWandMagicSparkles} className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
            {getPageTitle()}
          </h1>
        </div>
        <p className="text-gray-300 text-lg">
          {getPageDescription()}
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/10">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">AI-Powered Generation</h2>
                <p className="text-sm text-gray-400">{getCardBody()}</p>
              </div>
            </div>

            <FlashcardForm
              defaultValue={clipboardContent}
              variant={variant}
              hasSubscription={totalDecks > FREE_DECKS}
              onPaste={handlePaste}
              onSubmit={handleDeckCreation}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <AILoadingState mode={variant} link={youtubeLink || websiteLink} />
          </div>
        )}

        {/* Generated Flashcards */}
        {flashcards.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-2">
                  Generated Flashcards
                </h3>
                <p className="text-gray-300">
                  Review and save your generated flashcards
                </p>
              </div>
              {isAuthenticated ? (
                <button 
                  onClick={() => saveDeckModalRef.current?.showModal()}
                  className="btn btn-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 group"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-semibold">Save Deck</span>
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="btn btn-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 group"
                >
                  <FontAwesomeIcon icon={faUnlock} className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-semibold">Login to Save</span>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flashcards.map((flashcard, index) => (
                <div 
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group"
                >
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                    {flashcard.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {flashcard.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save Deck Modal */}
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
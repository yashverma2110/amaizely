// components/YouTubeForm.tsx
'use client'
import { extractAlphanumeric } from '@/utils/StringUtils';
import { extractYoutubeId, isValidWebsiteURL, isValidYouTubeUrl } from '@/utils/UrlUtils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'
import FormErrorMessage from '../ui/FormErrorMessage';
import { FREE_FLASHCARDS_PER_DECK, MAX_FLASHCARDS_PER_DECK } from '@/config/SubscriptionConstants';
import { MIN_FLASHCARDS_PER_DECK } from '@/config/SubscriptionConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste, faUnlock } from '@fortawesome/free-solid-svg-icons';

interface FlashcardFormProps {
  defaultValue?: string
  variant: 'youtube' | 'website' | 'text' | 'pdf'
  hasSubscription: boolean;
  onPaste?: () => void
  onSubmit: (youtubeLink?: string, file?: File, deckSize?: number) => Promise<void>
}

export default function FlashcardForm({ defaultValue, variant, onSubmit, onPaste, hasSubscription }: FlashcardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [flashcardCount, setFlashcardCount] = useState(5);

  const router = useRouter();

  function shouldShowUpsell() {
    if (!hasSubscription) {
      return flashcardCount > FREE_FLASHCARDS_PER_DECK;
    }

    return false;
  }

  function getButtonText() {
    if (shouldShowUpsell()) {
      return "Purchase to unlock"
    }

    if (isLoading) {
      return "Creating your deck..."
    }

    return "Create Deck"
  }

  async function handleValidation(content: string, pdf?: File) {
    if (variant === 'pdf') {
      if (!pdf) {
        setErrorMessage("Please upload a PDF file")
        return {
          isValid: false,
          content: "",
        }
      }

      if (pdf.type !== "application/pdf") {
        setErrorMessage("The file should be a PDF")
        return {
          isValid: false,
          content: "",
        }
      }

      if (pdf.size > 2 * 1024 * 1024) {
        setErrorMessage("The PDF file should be less than 2MB")
        return {
          isValid: false,
          content: "",
        }
      }

      return {
        isValid: true,
        file: pdf,
      }
    }

    if (variant === 'youtube') {
      if ((content || "").trim() === "") {
        setErrorMessage("Please paste a YouTube link")
        return {
          isValid: false,
          content,
        };
      }

      if (!isValidYouTubeUrl(content)) {
        setErrorMessage("The link provided is not a valid YouTube link")
        return {
          isValid: false,
          content,
        };
      }

      const videoId = extractYoutubeId(content)
      if (!videoId) {
        setErrorMessage("Unable to extract details from the link")
        return {
          isValid: false,
          content,
        };
      }

      return {
        isValid: true,
        content: videoId
      }
    }


    if (variant === 'website') {
      if ((content || "").trim() === "") {
        setErrorMessage("Please enter a link to a website")
        return {
          isValid: false,
          content,
        };
      }

      if (!isValidWebsiteURL(content)) {
        setErrorMessage("Please enter a valid website URL")
        return {
          isValid: false,
          content,
        }
      }
    }

    if (variant === 'text') {
      if ((content || "").trim() === "") {
        setErrorMessage("Please enter some text")
        return {
          isValid: false,
          content,
        };
      }

      const cleanText = extractAlphanumeric(content);

      if (cleanText.split(" ").length < 100) {
        setErrorMessage("The text should contain at least 100 words")
        return {
          isValid: false,
          content
        }
      }

      if (cleanText.split(" ").length > 1000) {
        setErrorMessage("The text should contain at max 1000 words")
        return {
          isValid: false,
          content
        }
      }
    }

    return {
      isValid: true,
      content
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (shouldShowUpsell()) {
      router.push("/purchase?intent=card_count")
      return;
    }


    if (isLoading) {
      return;
    }
    const formData = new FormData(e.currentTarget)
    const text = formData.get("text-field") as string
    const pdf = formData.get("pdf-field") as File

    setIsLoading(true)
    const { isValid, content, file } = await handleValidation(text, pdf)

    if (!isValid) {
      setIsLoading(false)
      return
    }

    await onSubmit(content, file, flashcardCount)
    setIsLoading(false)
  }

  function getInput() {
    if (variant === 'pdf') {
      return (
        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300">
                Upload PDF
              </label>
              <span className="text-xs text-gray-400">Max size: 2MB</span>
            </div>
            <div className="relative group">
              <input
                type="file"
                name="pdf-field"
                accept=".pdf"
                className="w-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3
                  text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                  file:bg-white/10 file:text-white hover:file:bg-white/20
                  transition-all duration-300 hover:bg-slate-900/70
                  focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          {/* Card Count Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300">
                Number of Cards
              </label>
              <span className="text-sm font-medium text-white bg-white/10 px-2 py-1 rounded-lg">
                {flashcardCount} cards
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={MIN_FLASHCARDS_PER_DECK}
                max={hasSubscription ? MAX_FLASHCARDS_PER_DECK : FREE_FLASHCARDS_PER_DECK}
                value={flashcardCount}
                onChange={(e) => setFlashcardCount(parseInt(e.target.value))}
                className="range range-md w-full"
              />
              <div className="absolute -bottom-6 left-0 right-0 font-bold flex justify-between px-1 py-2 text-gray-400">
                <span>{MIN_FLASHCARDS_PER_DECK}</span>
                <span>{hasSubscription ? MAX_FLASHCARDS_PER_DECK : FREE_FLASHCARDS_PER_DECK}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (variant === 'text') {
      return (
        <textarea
          placeholder="Paste your text here"
          name="text-field"
          defaultValue={defaultValue}
          className="textarea textarea-bordered textarea-md w-full"
          onFocus={() => setErrorMessage("")}
        />
      )
    }

    return (
      <label className={clsx("w-full shadow-inner input input-bordered flex items-center gap-2", {
        'input-error': errorMessage
      })}>
        <input
          type="text"
          name="text-field"
          defaultValue={defaultValue}
          className="grow"
          placeholder="Paste link here"
          autoComplete="off"
          onFocus={() => setErrorMessage("")}
        />
        <kbd className="kbd kbd-sm hidden md:block">⌘</kbd>
        <kbd className="kbd kbd-sm hidden md:block">V</kbd>
        <button className="btn btn-sm md:btn-ghost" onClick={onPaste}>
          <FontAwesomeIcon icon={faPaste} className="h-4 w-4" />
          <span className="hidden md:block">Paste</span>
        </button>
      </label>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {getInput()}
      
      <button
        type="submit"
        disabled={isLoading}
        className={clsx(
          "btn w-full transition-all duration-300 group",
          {
            'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30': shouldShowUpsell(),
            'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30': !shouldShowUpsell(),
            'opacity-70 cursor-not-allowed': isLoading
          }
        )}
      >
        <FontAwesomeIcon 
          icon={shouldShowUpsell() ? faUnlock : faPaste} 
          className={`h-5 w-5 transition-transform duration-300 ${shouldShowUpsell() ? 'group-hover:rotate-12' : 'group-hover:scale-110'}`}
        />
        <span className="font-semibold">{getButtonText()}</span>
      </button>

      {errorMessage && (
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}
    </form>
  )
}
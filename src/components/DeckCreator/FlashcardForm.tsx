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
        <input
          type="file"
          name="pdf-field"
          accept=".pdf"
          className="file-input file-input-neutral file-input-bordered w-full"
        />
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
    <form className="youtube-actions w-full flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full">
        {getInput()}
        <div className="mt-2">
          {errorMessage && <FormErrorMessage message={errorMessage} size="sm" align="left" />}
        </div>

        <hr className="my-2 border-neutral-200" />

        <div className="flex flex-col gap-1">
          <p className="text-sm md:text-base">Generate <strong>{flashcardCount}</strong> flashcards</p>
          <div className="flex items-center gap-2">
            <span className="md:text-lg">{MIN_FLASHCARDS_PER_DECK}</span>
            <input
              type="range"
              min={MIN_FLASHCARDS_PER_DECK}
              max={MAX_FLASHCARDS_PER_DECK}
              value={flashcardCount}
              className={`range ${shouldShowUpsell() ? 'range-warning' : ''} range-xs md:range-sm`}
              onChange={(e) => setFlashcardCount(parseInt(e.target.value))}
            />
            <span className="md:text-lg">{MAX_FLASHCARDS_PER_DECK}</span>
          </div>
        </div>
      </div>
      <button className={`btn md:mt-8 ${shouldShowUpsell() ? 'btn-warning' : 'btn-primary'}`} type="submit">
        {getButtonText()}
        {
          shouldShowUpsell() && <FontAwesomeIcon icon={faUnlock} className="h-4 w-4" />
        }
      </button>
    </form>
  )
}
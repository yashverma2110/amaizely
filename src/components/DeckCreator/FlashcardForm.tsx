// components/YouTubeForm.tsx
'use client'
import { extractYoutubeId, isValidWebsiteURL, isValidYouTubeUrl } from '@/utils/UrlUtils';
import clsx from 'clsx';
import { FormEvent, useState } from 'react'

interface FlashcardFormProps {
  variant: 'youtube' | 'website' | 'text'
  onSubmit: (youtubeLink: string) => Promise<void>
}

export default function FlashcardForm({ variant, onSubmit }: FlashcardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleValidation(content: string) {
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

    return {
      isValid: true,
      content
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLoading) {
      return;
    }
    const formData = new FormData(e.currentTarget)
    const text = formData.get("text-field") as string

    const { isValid, content } = handleValidation(text)

    if (!isValid) {
      return
    }

    setIsLoading(true)
    await onSubmit(content)
    setIsLoading(false)
  }

  return (
    <form className="youtube-actions w-full flex flex-col md:flex-row gap-2" onSubmit={handleSubmit}>
      <label className={clsx("w-full shadow-inner input input-bordered flex items-center gap-2", {
        'input-error': errorMessage
      })}>
        <input
          type="text"
          name="text-field"
          className="grow"
          placeholder="Paste link here"
          autoComplete="off"
          onFocus={() => setErrorMessage("")}
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">V</kbd>
      </label>
      {errorMessage && <p className="text-error">{errorMessage}</p>}
      <button className="btn btn-primary" type="submit">
        {
          isLoading ? <span>Creating your deck...</span> : <span>Create Deck</span>
        }
      </button>
    </form>
  )
}
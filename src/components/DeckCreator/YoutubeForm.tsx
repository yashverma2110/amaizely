// components/YouTubeForm.tsx
'use client'
import { extractYoutubeId, isValidYouTubeUrl } from '@/utils/UrlUtils';
import clsx from 'clsx';
import { FormEvent, useState } from 'react'

interface YouTubeFormProps {
  onSubmit: (youtubeLink: string) => Promise<void>
}

export default function YouTubeForm({ onSubmit }: YouTubeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const youtubeLink = formData.get("youtube-link") as string


    if ((youtubeLink || "").trim() === "") {
      setErrorMessage("Please paste a YouTube link")
      return
    }

    if (!isValidYouTubeUrl(youtubeLink)) {
      setErrorMessage("The link provided is not a valid YouTube link")
      return
    }

    const videoId = extractYoutubeId(youtubeLink)
    if (!videoId) {
      setErrorMessage("Unable to extract details from the link")
      return
    }
    setIsLoading(true)
    await onSubmit(youtubeLink)
    setIsLoading(false)
  }

  return (
    <form className="youtube-actions w-full flex flex-col md:flex-row gap-2" onSubmit={handleSubmit}>
      <label className={clsx("w-full shadow-inner input input-bordered flex items-center gap-2", {
        'input-error': errorMessage
      })}>
        <input
          type="text"
          name="youtube-link"
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
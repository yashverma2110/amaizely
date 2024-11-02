// components/YouTubeForm.tsx
'use client'
import { extractAlphanumeric } from '@/utils/StringUtils';
import { extractYoutubeId, isValidWebsiteURL, isValidYouTubeUrl } from '@/utils/UrlUtils';
import clsx from 'clsx';
import { FormEvent, useState } from 'react'
import FormErrorMessage from '../ui/FormErrorMessage';

interface FlashcardFormProps {
  variant: 'youtube' | 'website' | 'text' | 'pdf'
  onSubmit: (youtubeLink?: string, file?: File) => Promise<void>
}

export default function FlashcardForm({ variant, onSubmit }: FlashcardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    await onSubmit(content, file)
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
          className="grow"
          placeholder="Paste link here"
          autoComplete="off"
          onFocus={() => setErrorMessage("")}
        />
        <kbd className="kbd kbd-sm hidden md:block">⌘</kbd>
        <kbd className="kbd kbd-sm hidden md:block">V</kbd>
      </label>
    )
  }

  return (
    <form className="youtube-actions w-full flex flex-col md:flex-row gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full">
        {getInput()}
        <div className="mt-2">
          {errorMessage && <FormErrorMessage message={errorMessage} size="sm" align="left" />}
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        {
          isLoading ? <span>Creating your deck...</span> : <span>Create Deck</span>
        }
      </button>
    </form>
  )
}
"use client"
import { removeHtmlTags } from "@/utils/StringUtils"
import { useContext, useEffect, useRef, useState } from "react"
import { ScrollContext } from "./ui/ScrollHandler"
import { LOG_VIEW_FOR_FLASHCARD } from "@/services/UserActivityService"
import debounce from "@/utils/debounce"

export default function FlashcardDisplay({ flashcard, index }: { flashcard: { _id: string, title: string, content: string }, index: number }) {
  const [mounted, setMounted] = useState(false)
  const { scrollTop, clientHeight } = useContext(ScrollContext)
  const cardRef = useRef<HTMLDivElement>(null)
  const timerId = useRef<any>();

  useEffect(() => {
    setMounted(true)
  }, [])

  const logView = async () => {
    await LOG_VIEW_FOR_FLASHCARD(flashcard._id);
    timerId.current = null;
  }

  useEffect(() => {
    if (cardRef.current) {
      const elementTop = cardRef.current.offsetTop;
      const elementBottom = elementTop + cardRef.current.offsetHeight;

      const containerTop = scrollTop;
      const containerBottom = containerTop + clientHeight;

      const isInView = elementTop > containerTop && elementTop < containerBottom && elementBottom > containerTop

      if (isInView) {
        timerId.current = setTimeout(logView, 2000);
      }

      if (!isInView && timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [mounted, scrollTop])

  if (!mounted) {
    return (
      <div className="carousel-item h-full">
        <div className="shadow-md w-full flex flex-col bg-white gap-4 m-4 p-4">
          <h1 className="font-semibold text-xl">{flashcard.title}</h1>
          <p>{removeHtmlTags(flashcard.content)}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={cardRef} className="carousel-item h-full">
      <div className="shadow-md w-full flex flex-col bg-white gap-4 m-4 p-4">
        <h1 className="font-semibold text-xl">{flashcard.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: flashcard.content }}></p>
      </div>
    </div>
  )
}
"use client"
import { useContext, useEffect, useRef, useState } from "react"
import { ScrollContext } from "./ui/ScrollHandler"
import { LOG_VIEW_FOR_FLASHCARD } from "@/services/UserActivityService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"

export default function FlashcardDisplay({ flashcard, index }: { flashcard: { _id: string, title: string, content: string }, index: number }) {
  const [mounted, setMounted] = useState(false)
  const { scrollTop, clientHeight } = useContext(ScrollContext)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const timerId = useRef<any>()

  useEffect(() => {
    setMounted(true)
  }, [])

  const logView = async () => {
    await LOG_VIEW_FOR_FLASHCARD(flashcard._id);
    if (index === 0 && !showOnboarding) {
      setShowOnboarding(true)
    }
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
    return null;
  }

  return (
    <div ref={cardRef} className="relative group h-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent" dangerouslySetInnerHTML={{ __html: flashcard.title }}></h2>
        <div className="text-gray-300 prose prose-invert max-w-none text-lg" dangerouslySetInnerHTML={{ __html: flashcard.content }}></div>
      </div>

      {/* Navigation Hints */}
      {showOnboarding && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-white/50">
          <FontAwesomeIcon icon={faArrowUp} className="h-6 w-6 animate-bounce" />
          <span className="text-base font-medium">Scroll</span>
          <FontAwesomeIcon icon={faArrowDown} className="h-6 w-6 animate-bounce" />
        </div>
      )}
    </div>
  );
}
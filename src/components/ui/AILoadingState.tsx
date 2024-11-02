"use client"

import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IAILoadingStateProps {
  mode: "website" | "youtube" | "text";
  link?: string;
}

export default function AILoadingState({ mode, link }: IAILoadingStateProps) {
  const [currentState, setCurrentState] = useState<{ title: string, time: number, index: number }>({ title: "Warming up", index: 0, time: 0 })
  const [currentTextState, setCurrentTextState] = useState<number>(1)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const TEXT_LOADING_STATES = useMemo(() => [
    {
      title: "Understanding the text",
      time: 5000
    },
    {
      title: "Creating topics",
      time: 5000
    },
    {
      title: "Generating flashcards",
      time: 5000
    },
    {
      title: "Ensuring quality",
      time: 5000
    }
  ], [])

  const getLoadingState = useCallback(() => {
    const WEBSITE_LOADING_STATES = [
      {
        title: "Getting details from the website",
        time: 5000
      },
      {
        title: "Understanding the content",
        time: 5000
      },
      {
        title: "Creating topics",
        time: 5000
      },
      {
        title: "Generating flashcards",
        time: 5000
      },
      {
        title: "Ensuring quality",
        time: 5000
      }
    ]

    const YOUTUBE_LOADING_STATES = [
      {
        title: "Opening YouTube video",
        time: 5000
      },
      {
        title: "Watching the video",
        time: 5000
      },
      {
        title: "Creating topics",
        time: 5000
      },
      {
        title: "Generating flashcards",
        time: 5000
      },
      {
        title: "Ensuring quality",
        time: 5000
      }
    ]

    if (mode === "website") {
      if (currentState.index === WEBSITE_LOADING_STATES.length - 1) {
        return
      }

      setCurrentState(() => {
        return {
          title: WEBSITE_LOADING_STATES[currentState.index].title,
          time: WEBSITE_LOADING_STATES[currentState.index].time,
          index: currentState.index === WEBSITE_LOADING_STATES.length - 1 ? 0 : currentState.index + 1
        }
      })

      const timeout = setTimeout(() => {
        getLoadingState()
      }, WEBSITE_LOADING_STATES[currentState.index].time)

      setTimer(timeout)

      return;
    }


    if (mode === "youtube") {
      if (currentState.index === YOUTUBE_LOADING_STATES.length - 1) {
        return
      }

      setCurrentState(() => {
        return {
          title: YOUTUBE_LOADING_STATES[currentState.index].title,
          time: YOUTUBE_LOADING_STATES[currentState.index].time,
          index: currentState.index === YOUTUBE_LOADING_STATES.length - 1 ? 0 : currentState.index + 1
        }
      })

      const timeout = setTimeout(() => {
        getLoadingState()
      }, YOUTUBE_LOADING_STATES[currentState.index].time)

      setTimer(timeout)

      return;
    }

    if (mode === "text") {
      if (currentTextState === TEXT_LOADING_STATES.length - 1) {
        return
      }

      setCurrentTextState(currentTextState + 1)

      const timeout = setTimeout(() => {
        getLoadingState()
      }, TEXT_LOADING_STATES[currentState.index].time)

      setTimer(timeout)
    }
  }, [mode, currentState.index, currentTextState])

  useEffect(() => {
    setTimeout(() => {
      getLoadingState()
    }, 5000)
  }, [getLoadingState])

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])


  if (mode === "website" || mode === "youtube") {
    return (
      <div className="mockup-browser bg-base-300 border-2 border-neutral-200">
        <div className="mockup-browser-toolbar">
          <div className="input">{link}</div>
        </div>
        <div className="animate-pulse bg-base-200 flex justify-center px-4 py-16">
          {currentState.title}
        </div>
      </div>
    )
  }

  return (
    <div className="mockup-code bg-neutral-300 w-full text-neutral-800 border-2 border-neutral-300">
      {
        TEXT_LOADING_STATES.map((state, index) => (
          <pre data-prefix={index === currentTextState ? ">" : "$"}
            className={clsx(['line-clamp-1'], {
              "text-success": index < currentTextState,
              "text-warning": index === currentTextState,
              "hidden": index > currentTextState
            })}
            key={state.title}
          >
            <code>{state.title}</code>
          </pre>
        ))
      }
    </div>
  )
} 
"use client"

import { faArrowLeft, faArrowRight, faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { ScrollContext } from "./ui/ScrollHandler"

export default function RevisionActions({ className }: { className: string }) {
  const [isReminderLoading, setIsReminderLoading] = useState(false);
  const { onRemind = async () => { } } = useContext(ScrollContext)

  async function handleRemind() {
    setIsReminderLoading(true);
    await onRemind();
    setIsReminderLoading(false);
  }

  return (
    <div className={`flex items-center justify-evenly gap-2 ${className}`}>
      <button className="btn btn-sm w-fit btn-secondary">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-5 w-5" />
        <span className="text-xs">Previous</span>
      </button>
      <button className="btn btn-sm w-fit btn-primary" onClick={handleRemind}>
        <FontAwesomeIcon icon={faBell} className="mr-2 h-5 w-5" />
        <span className="text-xs">Remind again</span>
      </button>
      <button className="btn btn-sm w-fit btn-secondary">
        <span className="text-xs">Next</span>
        <FontAwesomeIcon icon={faArrowRight} className="mr-2 h-5 w-5" />
      </button>
    </div>
  )
}
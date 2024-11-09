'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { faRightFromBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LOGOUT_USER } from "@/services/AuthService";

export default function LogoutButton() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    localStorage.removeItem('user_country')
    localStorage.removeItem('payStatus')
    localStorage.removeItem('flashcards_manual_amaizely')

    setIsLoggingOut(true)
    const response = await LOGOUT_USER()

    if (response.success) {
      router.push('/login')
    }
    setIsLoggingOut(false)
  }

  return (
    <button className="btn btn-ghost" onClick={handleLogout}>
      {
        isLoggingOut ? (
          <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
        ) : (
            <FontAwesomeIcon icon={faRightFromBracket} className="h-5 w-5" />
        )
      }
      <span className="hidden md:block">Logout</span>
    </button>
  )
}
'use client'

import { useRouter } from "next/navigation";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LOGOUT_USER } from "@/services/AuthService";

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const response = await LOGOUT_USER()

    if (response.success) {
      router.push('/login')
    }
  }

  return (
    <button className="btn btn-ghost" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} className="h-5 w-5" />
    </button>
  )
}
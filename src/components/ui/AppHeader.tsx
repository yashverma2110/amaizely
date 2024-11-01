import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AppHeader({ className }: { className: string }) {
  const cookieStore = cookies();

  function isLoggedIn() {
    return !!cookieStore.get('sid')?.value
  }
  return (
    <div className={`navbar z-50 bg-base-100 shadow-md ${className}`}>
      <div className="flex-1 flex justify-between md:hidden">
        <Link className="btn btn-ghost text-xl p-0" href="/deck">
          <p>am<span>(AI)</span>zely</p>
        </Link>

        {
          isLoggedIn() && (
            <LogoutButton />
          )
        }
      </div>
    </div>
  )
}
import { faBrain } from "@fortawesome/free-solid-svg-icons";
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
        <Link className="btn btn-ghost flex items-center justify-center gap-2 text-xl p-0" href="/deck">
          <FontAwesomeIcon icon={faBrain} className="h-6 w-6" />
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
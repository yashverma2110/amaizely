import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export default function AppHeader({ className }: { className?: string }) {
  const cookieStore = cookies();

  function isLoggedIn() {
    return !!cookieStore.get('sid')?.value
  }
  return (
    <div className={`navbar z-50 bg-base-100 shadow-md ${className}`}>
      <div className="flex-1 flex justify-between">
        <Link className="md:hidden btn btn-ghost flex items-center justify-center gap-2 text-xl p-0" href="/deck">
          <Image src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" alt="amaizely_logo" width={30} height={30} />
          <p>am<span>(AI)</span>zely</p>
        </Link>

        <div className="md:ml-auto flex items-center">
          <a href="https://737x5ktq3ep.typeform.com/to/OyhGWmWM" className="md:hidden btn btn-ghost" target="_blank">
            <FontAwesomeIcon icon={faMessage} className="h-4 w-4" />
          </a>
          {
            isLoggedIn() && (
              <LogoutButton />
            )
          }

          {
            !isLoggedIn() && (
              <div className="hidden md:flex gap-2">
                <Link href="/login" className="btn btn-ghost">Login</Link>
                <Link href="/register" className="btn btn-primary">Register</Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
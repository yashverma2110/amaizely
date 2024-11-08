import Image from "next/image";
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
          <Image src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" alt="amaizely_logo" width={30} height={30} />
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
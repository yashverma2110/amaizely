"use client"

import { usePathname, useRouter } from "next/navigation";
import { faCompass, faGear, faLayerGroup, faRightFromBracket, faBagShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LOGOUT_USER } from "@/services/AuthService";
import Image from "next/image";
import DeckCreatorButton from "../DeckCreatorButton";
import { Suspense } from "react";
import { isMobile } from "@/utils/DeviceUtils";

export default function Sidebar({ className }: { className: string }) {
  const pathname = usePathname();
  const router = useRouter()

  function getNavIconClass(path: string) {
    switch (pathname) {
      case path:
        return "h-full flex gap-2 p-2 items-center rounded-lg text-primary bg-gray-200";
      default:
        return "h-full flex gap-2 p-2 items-center rounded-lg hover:bg-gray-100";
    }
  }

  function getNavTextClass(path: string) {
    switch (pathname) {
      case path:
        return 'text-primary text-md';
      default:
        return 'text-md';
    }
  }

  return (
    <aside className={`sidebar-container shadow-md p-4 bg-white gap-2 ${className}`}>
      <Link className="btn btn-ghost flex items-center justify-center gap-2 text-xl p-0" href="/deck">
        <Image src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" alt="amaizely_logo" width={30} height={30} />
        <p>am<span>(AI)</span>zely</p>
      </Link>

      {
        !isMobile() && (
          <Suspense fallback={<div className="skeleton h-12 w-full"></div>}>
            <DeckCreatorButton />
          </Suspense>
        )
      }

      <div className="flex flex-col gap-2 mt-4">
        <Link href="/deck" className={getNavIconClass("/deck")}>
          <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4" />
          <span className={getNavTextClass("/deck")}>My Decks</span>
        </Link>
        <Link href="/revise" className={getNavIconClass("/revise")}>
          <FontAwesomeIcon icon={faCompass} className="h-4 w-4" />
          <span className={getNavTextClass("/revise")}>Revise</span>
        </Link>
        <Link href="/settings" className={getNavIconClass("/settings")}>
          <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
          <span className={getNavTextClass("/settings")}>Settings</span>
        </Link>
        <Link href="/purchase" className={getNavIconClass("/purchase")}>
          <FontAwesomeIcon icon={faBagShopping} className="h-4 w-4" />
          <span className={getNavTextClass("/purchase")}>Purchase</span>
        </Link>
        <a href="https://737x5ktq3ep.typeform.com/to/OyhGWmWM" className={getNavIconClass("/feedback")} target="_blank">
          <FontAwesomeIcon icon={faMessage} className="h-4 w-4" />
          <span className={getNavTextClass("/feedback")}>Feedback</span>
        </a>
      </div>
    </aside>
  )
}
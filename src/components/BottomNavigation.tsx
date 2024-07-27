"use client"

import { faCompass, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  function getNavIconClass(path: string) {
    switch (pathname) {
      case path:
        return "flex flex-col gap-2 items-center justify-center text-primary";
      default:
        return "flex flex-col gap-2 items-center justify-center";
    }
  }

  function getNavTextClass(path: string) {
    switch (pathname) {
      case path:
        return 'text-primary text-sm';
      default:
        return 'text-sm';
    }
  }

  return (
    <nav
      id="bottom-navigation"
      className="sticky shadow-shadow-top shadow-gray-200 bottom-0 rounded-t-3xl p-4 bg-white border-t border-gray-200 grid grid-cols-3"
    >
      <ul>
        <Link href="/deck" className={getNavIconClass("/deck")}>
          <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5" />
          <p className={getNavTextClass('/deck')}>Deck</p>
        </Link>
      </ul>
      <ul>
        <Link href="/revise" className={getNavIconClass("/revise")}>
          <FontAwesomeIcon icon={faCompass} className="h-5 w-5" />
          <p className={getNavTextClass('/revise')}>Revise</p>
        </Link>
      </ul>
      <ul>
        <Link href="/settings" className={getNavIconClass("/revise")}>
          <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
          <p className={getNavTextClass('/settings')}>Settings</p>
        </Link>
      </ul>
    </nav>
  )
}
"use client"

import { faCompass, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      id="bottom-navigation"
      className="sticky shadow-shadow-top shadow-gray-200 bottom-0 rounded-3xl p-4 bg-white border-t border-gray-200 grid grid-cols-3"
    >
      <ul>
        <Link href="/deck" className={clsx(["flex justify-center", {
          "text-primary": pathname === '/deck'
        }])}>
          <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5" />
        </Link>
      </ul>
      <ul>
        <Link href="/revise" className={clsx(["flex justify-center", {
          "text-primary": pathname === '/revise'
        }])}>
          <FontAwesomeIcon icon={faCompass} className="h-5 w-5" />
        </Link>
      </ul>
      <ul>
        <Link href="/settings" className={clsx(["flex justify-center", {
          "text-primary": pathname === '/settings'
        }])}>
          <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
        </Link>
      </ul>
    </nav>
  )
}
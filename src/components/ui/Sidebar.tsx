"use client"

import { faCompass, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ className }: { className: string }) {
  const pathname = usePathname();

  function getNavIconClass(path: string) {
    switch (pathname) {
      case path:
        return "h-full flex gap-2 p-2 items-center text-primary hover:bg-gray-100";
      default:
        return "h-full flex gap-2 p-2 items-center hover:bg-gray-100";
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
    <div className={`shadow-md bg-white ${className}`}>
      <Link className="btn btn-ghost px-4 my-2 text-xl" href="/deck">
        <p>am<span>(AI)</span>zely</p>
      </Link>

      <div className="flex flex-col">
        <Link href="/deck" className={getNavIconClass("/deck")}>
          <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4" />
          <span className={getNavTextClass("/deck")}>Deck</span>
        </Link>
        <Link href="/revise" className={getNavIconClass("/revise")}>
          <FontAwesomeIcon icon={faCompass} className="h-4 w-4" />
          <span className={getNavTextClass("/revise")}>Revise</span>
        </Link>
        <Link href="/settings" className={getNavIconClass("/settings")}>
          <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
          <span className={getNavTextClass("/settings")}>Settings</span>
        </Link>
      </div>
    </div>
  )
}
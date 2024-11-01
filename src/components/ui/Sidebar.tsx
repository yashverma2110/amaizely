"use client"

import { useRef } from "react";
import { faBrain, faCompass, faGear, faLayerGroup, faLink, faPenAlt, faPlus, faRightFromBracket, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOGOUT_USER } from "@/services/AuthService";

export default function Sidebar({ className }: { className: string }) {
  const pathname = usePathname();
  const router = useRouter()
  const deckModal = useRef<HTMLDialogElement>(null);

  const AI_CREATE_OPTIONS = [
    {
      icon: faLink,
      label: "Website",
      description: "Use a website link to create flashcards",
      href: "/deck/create/website",
    },
    {
      icon: faVideo,
      label: "Youtube",
      description: "Use a Youtube video link to create flashcards",
      href: "/deck/create/youtube",
    },
    {
      icon: faPenAlt,
      label: "Text",
      description: "Use custom text to create flashcards",
      href: "/deck/create/text",
    },
  ]

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

  function handleCreateDeck() {
    deckModal.current?.showModal();
  }

  async function handleLogout() {
    LOGOUT_USER()
    router.push('/login')
  }

  return (
    <div className={`shadow-md p-4 bg-white gap-2 ${className}`}>
      <Link className="btn btn-ghost px-4 text-xl" href="/deck">
        <p>am<span>(AI)</span>zely</p>
      </Link>

      <button className="btn btn-active btn-primary w-full" onClick={handleCreateDeck}>
        <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
        Create Deck
      </button>

      <div className="flex flex-col gap-2">
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
        <button className={getNavIconClass("/logout")} onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="h-4 w-4" />
          <span className={getNavTextClass("/logout")}>Logout</span>
        </button>
      </div>

      <dialog ref={deckModal} id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Choose a mode to create</h3>

          <h4 className="text-lg text-center p-4">AI-powered <FontAwesomeIcon icon={faBrain} className="h-4 w-4" /></h4>
          <section className="ai-create-options grid grid-cols-2 gap-2">
            {
              AI_CREATE_OPTIONS.map((option) => (
                <Link
                  href={option.href}
                  className="w-full border-b-4 border-neutral-200 drop-shadow flex flex-col items-center gap-2 bg-gradient-to-b from-neutral-200 to-neutral-50 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-neutral-100 rounded-lg p-2"
                  key={option.label}
                  onClick={() => deckModal.current?.close()}
                >
                  <div className="flex w-full items-center text-left gap-2">
                    <FontAwesomeIcon icon={option.icon} className="h-4 w-4" />
                    <span className="text-lg font-semibold">{option.label}</span>
                  </div>
                  <p className="text-sm">{option.description}</p>
                </Link>
              ))
            }
          </section>

          <div className="divider">OR</div>

          <Link
            href="/deck/create/manual"
            className="w-full border-b-4 border-neutral-200 mt-4 flex flex-col items-center gap-2 drop-shadow bg-gradient-to-b from-neutral-200 to-neutral-50 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-neutral-100 rounded-lg p-2"
            onClick={() => deckModal.current?.close()}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
              <span className="text-lg font-semibold">Create manually</span>
            </div>
            <p className="text-sm">Create a deck with our flexible editor with formatting tools</p>
          </Link>
        </div>
      </dialog>
    </div>
  )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function PublicDeckActions({ deckId }: { deckId: string }) {
  return (
    <section className="public-deck-actions flex flex-col gap-4">
      {/* Save Action */}
      <Link href={`/login?redirect=/revise/${deckId}?autoSave=true`}>
        <button className="group w-full flex items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform-gpu hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <FontAwesomeIcon icon={faLock} className="absolute -top-1 -right-1 h-3 w-3 text-amber-300" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold">Save This Deck</span>
              <span className="text-sm text-white/80">Sign in to keep this deck forever</span>
            </div>
          </div>
          <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
    </section>
  )
}
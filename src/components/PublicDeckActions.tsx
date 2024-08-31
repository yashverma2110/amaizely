import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function PublicDeckActions({ deckId }: { deckId: string }) {
  return (
    <section className="public-deck-actions px-4">
      <Link href={`/login?redirect=/revise/${deckId}?autoSave=true`}>
        <button className="btn btn-primary w-full">
          <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5" />
          Save
        </button>
      </Link>
    </section>
  )
}
import clsx from "clsx";
import type { IDeck } from "@/types/IDeck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function DeckCard({ bgClass, deck }: { deck: IDeck, bgClass?: string }) {
  return (
    <div className="deck-card">
      <div className="stack w-full">
        <div className={clsx(["relative overflow-hidden border-base-content h-full card border", bgClass ?? 'bg-base-100'])}>
          <div className="circle absolute -top-2 -right-4 skew-x-6 w-32 h-10 rounded-full bg-yellow-200" />
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">{deck.title}</h2>
            <p>
              {deck.description}
            </p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faPlay} className="h-4 w-4" />
                Revise
              </button>
            </div>
          </div>
        </div>
        <div className="border-base-content h-full card bg-green-500 border">
          <div className="card-body">B</div>
        </div>
        <div className="border-base-content shadow-sm h-full card bg-blue-500 border">
          <div className="card-body">C</div>
        </div>
      </div>
    </div>
  )
}
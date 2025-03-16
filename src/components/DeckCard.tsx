import type { IDeck } from "@/types/IDeck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPencil, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DeckDeletion from "./DeckDeletion";
import ExportDeck from "./ExportDeck";

export default function DeckCard({ bgClass, deck }: { deck: IDeck, bgClass?: string }) {
  return (
    <div className="group relative">
      {/* Card background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgClass} rounded-2xl opacity-10 group-hover:opacity-15 transition-opacity duration-300`}></div>
      
      {/* Main card */}
      <div className="relative h-full bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:-translate-y-1">
        {/* Card content */}
        <div className="p-6 h-full flex flex-col justify-evenly">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
              {deck.title}
            </h2>
            <DeckDeletion deckId={deck._id} deckName={deck.title} />
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            {/* <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faBook} className="h-3 w-3" />
              <span>{deck.totalCards || 0} cards</span>
            </div> */}
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="h-3 w-3" />
              <span>Created {deck.createdAt ? new Date(deck.createdAt).toLocaleDateString() : 'Never'}</span>
            </div>
          </div>

          <p className="text-gray-300 mb-6 line-clamp-2">
            {deck.description || 'No description provided'}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <Link href={`/deck/edit/${deck._id}`} className="flex-1">
              <button className="w-full btn btn-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-lg transition-all duration-200 hover:shadow-lg group">
                <FontAwesomeIcon icon={faPencil} className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Edit</span>
              </button>
            </Link>
            {!deck.isDraft && (
              <>
                <div className="flex-1">
                  <ExportDeck deck={deck} />
                </div>
                <Link href={`/revise/${deck._id}`} className="flex-1">
                  <button className="w-full btn btn-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-200 hover:shadow-lg group">
                    <FontAwesomeIcon icon={faPlay} className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>Revise</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        {deck.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              style={{ width: `${deck.progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
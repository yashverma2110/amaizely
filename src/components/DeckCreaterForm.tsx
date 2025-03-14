import { faBrain, faFilePdf, faLink, faPenAlt, faPlus, faVideo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProgressBar from "./ui/ProgressBar";

interface IDeckCreatorFormProps {
  current: number
  total: number
  onCancel: () => void
}

export default function DeckCreatorForm({ current, total, onCancel }: IDeckCreatorFormProps) {
  const AI_CREATE_OPTIONS = [
    {
      icon: faLink,
      label: "Website",
      description: "Use a website link to create flashcards",
      href: "/deck/create/website",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: faVideo,
      label: "Youtube",
      description: "Use a Youtube video link to create flashcards",
      href: "/deck/create/youtube",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: faPenAlt,
      label: "Text",
      description: "Use custom text to create flashcards",
      href: "/deck/create/text",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: faFilePdf,
      label: "PDF",
      description: "Use a PDF file to create flashcards",
      href: "/deck/create/pdf",
      gradient: "from-orange-500 to-amber-500"
    },
  ]

  return (
    <div className="modal-box bg-slate-900/95 backdrop-blur-lg border border-white/10 text-white">
      <form method="dialog">
        <button 
          className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/10 border-0 text-white hover:bg-white/20" 
          onClick={onCancel}
        >
          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
        Create New Deck
      </h3>

      {current / total > 0.5 && (
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-300 mb-2">
            You have created <strong className="text-white">{current}</strong> out of <strong className="text-white">{total}</strong> decks
          </p>
          <ProgressBar current={current} total={total} />
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <FontAwesomeIcon icon={faBrain} className="h-4 w-4 text-white" />
        </div>
        <h4 className="text-lg font-semibold">AI-powered Creation</h4>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {AI_CREATE_OPTIONS.map((option) => (
          <Link
            href={option.href}
            key={option.label}
            onClick={onCancel}
            className="group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <FontAwesomeIcon icon={option.icon} className="h-4 w-4 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                <h5 className="text-lg font-semibold">{option.label}</h5>
              </div>
              <p className="text-sm text-gray-300">{option.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <div className="relative flex items-center gap-4 my-8">
        <div className="flex-grow h-px bg-white/10"></div>
        <span className="text-sm text-gray-400">or</span>
        <div className="flex-grow h-px bg-white/10"></div>
      </div>

      <Link
        href="/deck/create/manual"
        onClick={onCancel}
        className="group relative overflow-hidden block"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
            <h5 className="text-lg font-semibold">Create manually</h5>
          </div>
          <p className="text-sm text-gray-300">Create a deck with our flexible editor with formatting tools</p>
        </div>
      </Link>
    </div>
  )
}
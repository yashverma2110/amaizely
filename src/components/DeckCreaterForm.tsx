import { faBrain, faFilePdf, faLink, faPenAlt, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DeckCreatorForm({ onCancel }: { onCancel: () => void }) {
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
    {
      icon: faFilePdf,
      label: "PDF",
      description: "Use a PDF file to create flashcards",
      href: "/deck/create/pdf",
    },
  ]


  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCancel}>✕</button>
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
              onClick={onCancel}
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
        onClick={onCancel}
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          <span className="text-lg font-semibold">Create manually</span>
        </div>
        <p className="text-sm">Create a deck with our flexible editor with formatting tools</p>
      </Link>
    </div>
  )
}
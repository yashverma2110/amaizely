import FlashcardContainer from "@/components/FlashcardContainer";
import { setHeaders } from "@/config/AxiosService";
import { GET_FLASHCARDS_FOR_REVISION } from "@/services/FlashcardService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function RevisePage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  const response = await GET_FLASHCARDS_FOR_REVISION();

  if (!response.success) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Failed to load flashcards</h2>
          <p className="text-gray-300">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (response.flashcards.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Start Your Learning Journey</h3>
              <p className="text-gray-300 mb-6">
                Create your first deck and begin organizing your knowledge effectively
              </p>
              <Link 
                href="/deck?mode=create" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Create a deck
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
            Revise
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Review your flashcards and strengthen your knowledge
          </p>
        </div>

        {/* Flashcard Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            <FlashcardContainer flashcards={response.flashcards} />
          </div>
        </div>
      </div>
    </div>
  );
}
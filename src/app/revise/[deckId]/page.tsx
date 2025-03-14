import FlashcardContainer from "@/components/FlashcardContainer";
import PublicDeckActions from "@/components/PublicDeckActions";
import { setHeaders } from "@/config/AxiosService";
import { GET_DECK_AND_DECK_CARDS_WITH_ID, SAVE_DECK_AND_DECK_CARDS_WITH_ID } from "@/services/DeckService"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DeckRevisionPage({ params, searchParams }: { params: { deckId: string }, searchParams: { autoSave: string } }) {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }
  const response = await GET_DECK_AND_DECK_CARDS_WITH_ID(params.deckId);

  if (searchParams.autoSave) {
    const savedDeckResponse = await SAVE_DECK_AND_DECK_CARDS_WITH_ID(params.deckId);
    if (savedDeckResponse.success) {
      return redirect(`/revise/${savedDeckResponse.deck._id}`)
    }
  }

  if (!response.success) {
    return <div>{response.message}</div>
  }

  return (
    <div className="deck-revision-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative min-h-screen">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="container mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
              <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                  {response.deck.title}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {response.deck.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flashcard Container */}
        <div className="min-h-screen">
          <FlashcardContainer flashcards={response.flashcards} />
        </div>

        {/* Public Actions */}
        {!authSid && (
          <div className="fixed bottom-0 left-0 right-0 z-10 p-4 pointer-events-none">
            <div className="container mx-auto">
              <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl pointer-events-auto transform-gpu transition-all duration-300 hover:shadow-purple-500/10">
                <div className="p-4">
                  <PublicDeckActions deckId={params.deckId} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
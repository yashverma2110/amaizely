import FlashcardContainer from "@/components/FlashcardContainer";
import { setHeaders } from "@/config/AxiosService";
import { GET_DECK_AND_DECK_CARDS_WITH_ID } from "@/services/DeckService"
import { cookies } from "next/headers";

export default async function DeckRevisionPage({ params }: { params: { deckId: string } }) {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }
  const response = await GET_DECK_AND_DECK_CARDS_WITH_ID(params.deckId);

  if (!response.success) {
    return <div>{response.message}</div>
  }

  return (
    <div className="deck-revision-page h-full grid grid-rows-12">
      <div className="row-span-1 p-4 text-center bg-white">
        <h1 className="text-xl font-semibold">{response.deck.title}</h1>
      </div>
      <div className="row-span-11">
        <FlashcardContainer flashcards={response.flashcards} />
      </div>
    </div>
  )
}
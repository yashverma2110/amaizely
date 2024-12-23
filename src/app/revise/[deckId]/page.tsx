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
    <div className="deck-revision-page h-[calc(100vh-8rem)] md:h-full grid grid-rows-12">
      <div className="navbar-container row-span-1 md:p-2" >
        <div className="h-full bg-base-100 flex items-center justify-center text-center drop-shadow md:rounded-lg">
          <h1 className="text-xl font-semibold">{response.deck.title}</h1>
        </div>
      </div>
      <div className={authSid ? "row-span-11" : "row-span-10"}>
        <FlashcardContainer flashcards={response.flashcards} />
      </div>
      {!authSid && <div className="row-span-1">
        <PublicDeckActions deckId={params.deckId} />
      </div>}
    </div>
  )
}
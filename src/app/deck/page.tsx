import { redirect } from "next/navigation";
import { GET_MY_DECKS } from "@/services/DeckService";
import DeckCard from '@/components/DeckCard';
import type { IDeck } from '@/types/IDeck';
import { cookies } from "next/headers";
import { setHeaders } from "@/config/AxiosService";
import { Suspense } from "react";
import DeckCreatorButton from "@/components/DeckCreatorButton";

export default async function DeckPage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  if (!authSid) {
    redirect('/login')
  }

  const deckResponse = await GET_MY_DECKS();

  const getDeckBgColor = (index: number) => {
    const colors = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300'];
    return colors[index % colors.length];
  }

  return (
    <div className="deck-page">
      <section className="deck-actions pt-4 px-4 flex flex-col gap-2 md:hidden">
        <Suspense fallback={<div className="skeleton h-12 w-full"></div>}>
          <DeckCreatorButton />
        </Suspense>
      </section>

      {!deckResponse && (
        <section className="deck-loading">
          <div className="skeleton h-32 w-32"></div>
          <div className="skeleton h-32 w-32"></div>
          <div className="skeleton h-32 w-32"></div>
          <div className="skeleton h-32 w-32"></div>
        </section>
      )}

      <section className="deck-list grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {deckResponse.data?.decks.map((deck: IDeck, index: number) => {
          return (
            <DeckCard key={deck._id} deck={deck} bgClass={getDeckBgColor(index)} />
          )
        })}
      </section>
    </div>
  );
}
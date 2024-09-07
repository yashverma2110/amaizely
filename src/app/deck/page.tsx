import { GET_MY_DECKS } from "@/services/DeckService";
import DeckCard from '@/components/DeckCard';
import type { IDeck } from '@/types/IDeck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { cookies } from "next/headers";
import { setHeaders } from "@/config/AxiosService";

export default async function DeckPage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  const deckResponse = await GET_MY_DECKS();

  const getDeckBgColor = (index: number) => {
    const colors = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300'];
    return colors[index % colors.length];
  }

  return (
    <div className="deck-page">
      <section className="deck-actions pt-4 px-4 flex flex-col gap-2">
        <Link href="/deck/create/youtube" className="w-full">
          <button className="btn btn-active btn-primary w-full">
            <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
            Create Deck
          </button>
        </Link>
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
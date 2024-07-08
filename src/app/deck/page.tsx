import { cookies } from 'next/headers';
import { getMyDecks } from "@/services/DeckService";
import DeckCard from '@/components/DeckCard';
import type { IDeck } from '@/types/IDeck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default async function DeckPage() {
  const cookieStore = cookies();

  const deckResponse = await getMyDecks(cookieStore.get("sid")?.value || '');

  const getDeckBgColor = (index: number) => {
    const colors = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300'];
    return colors[index % colors.length];
  }

  return (
    <div className="deck-page">
      <section className="deck-actions pt-4 px-4 flex flex-col gap-2">
        <button className="btn btn-active btn-primary">
          <FontAwesomeIcon icon={faPlus} size="2x" className="h-4 w-4" />
          Create Deck
        </button>
      </section>
      <section className="deck-list p-4">
        {deckResponse.data?.decks.map((deck: IDeck, index: number) => {
          return (
            <DeckCard key={deck._id} deck={deck} bgClass={getDeckBgColor(index)} />
          )
        })}
      </section>
    </div>
  );
}
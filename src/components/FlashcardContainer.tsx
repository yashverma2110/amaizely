import FlashcardDisplay from "./FlashcardDisplay";
import RevisionActions from "./RevisionActions";
import { ScrollHandler } from "./ui/ScrollHandler";

export default function FlashcardContainer({ flashcards }: { flashcards: { _id: string; title: string, content: string }[] }) {
  return (
    <section className="flashcard-container grid grid-rows-12 h-full">
      <ScrollHandler className="carousel carousel-vertical row-span-11 rounded-box">
        {flashcards.map((flashcard, index) => (<FlashcardDisplay key={flashcard._id} flashcard={flashcard} index={index} />))}
      </ScrollHandler>
      <RevisionActions className="row-span-1" />
    </section>
  )
}
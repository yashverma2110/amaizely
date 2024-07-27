import FlashcardDisplay from "./FlashcardDisplay";
import { ScrollHandler } from "./ui/ScrollHandler";

export default function FlashcardContainer({ flashcards }: { flashcards: { _id: string; title: string, content: string }[] }) {
  return (
    <section className="flashcard-container flex flex-col gap-4">
      <ScrollHandler className="carousel carousel-vertical rounded-box h-[75vh]">
        {flashcards.map((flashcard, index) => (<FlashcardDisplay key={flashcard._id} flashcard={flashcard} index={index} />))}
      </ScrollHandler>
    </section>
  )
}
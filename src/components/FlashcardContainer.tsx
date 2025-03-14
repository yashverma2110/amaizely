import FlashcardDisplay from "./FlashcardDisplay";
import { ScrollHandler } from "./ui/ScrollHandler";

export default function FlashcardContainer({ flashcards }: { flashcards: { _id: string; title: string, content: string }[] }) {
  return (
    <section className="flashcard-container">
      <ScrollHandler className="h-full overflow-y-auto snap-y snap-mandatory">
        <div className="space-y-0">
          {flashcards.map((flashcard, index) => (
            <div key={flashcard._id} className="h-[calc(100vh-4rem)] snap-start snap-always">
              <FlashcardDisplay flashcard={flashcard} index={index} />
            </div>
          ))}
        </div>
      </ScrollHandler>
    </section>
  );
}
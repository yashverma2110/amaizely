import FlashcardDisplay from "./FlashcardDisplay";
import { ScrollHandler } from "./ui/ScrollHandler";
import ScrollOnboarding from "./ScrollOnboarding";

export default function FlashcardContainer({ flashcards }: { flashcards: { _id: string; title: string, content: string }[] }) {
  return (
    <section className="flashcard-container h-screen w-full fixed inset-0">
      <ScrollHandler className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <div className="w-full">
          {flashcards.map((flashcard, index) => (
            <div 
              key={flashcard._id} 
              className="h-screen w-full snap-start snap-always flex items-center justify-center"
            >
              <FlashcardDisplay flashcard={flashcard} index={index} />
            </div>
          ))}
        </div>
      </ScrollHandler>
      <ScrollOnboarding />
    </section>
  );
}
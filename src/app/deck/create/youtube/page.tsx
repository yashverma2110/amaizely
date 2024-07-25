import YouTubeDeckCreator from "@/components/DeckCreator/YoutubeCreator"
import DeckTabVariant from "@/components/DeckCreator/DeckTabVariants"

export default function CreateDeckPage() {
  return (
    <div className="create-deck-page">
      <DeckTabVariant />

      <section className="deck-creator">
        <div className="flex justify-center p-4">
          <YouTubeDeckCreator />
        </div>
      </section>
    </div>
  )
}
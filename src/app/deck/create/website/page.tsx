import { Metadata } from "next";
import { Suspense } from "react";
import FlashcardDeckCreator from "@/components/DeckCreator/FlashcardDeckCreator";
import FlashcardDeckCreatorLoading from "@/components/ui/FlashcardDeckCreatorLoading";

export const metadata: Metadata = {
  title: "Create Flashcards from Websites | Amaizely",
  description: "Transform any website content into effective flashcards instantly with our AI-powered flashcard generator. Perfect for studying articles, research papers, and online resources.",
  keywords: [
    "website to flashcards",
    "online content flashcards",
    "AI flashcard maker",
    "website content study cards",
    "digital study materials",
    "website learning tools",
    "automatic flashcard generator",
    "online study aids",
    "website content converter",
    "educational technology"
  ],
  openGraph: {
    title: "Create Flashcards from Websites | Amaizely",
    description: "Transform any website content into effective flashcards instantly with our AI-powered flashcard generator. Perfect for studying articles, research papers, and online resources.",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 400,
        alt: "Amaizely Website Flashcard Generator"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Flashcards from Websites | Amaizely",
    description: "Transform website content into effective flashcards instantly with our AI-powered flashcard generator.",
    images: ["/og-image.png"],
  },
};

export default function CreateDeckUsingWebsitePage() {
  return (
    <div className="create-deck-page flex justify-center p-4">
      <Suspense fallback={<FlashcardDeckCreatorLoading />}>
        <FlashcardDeckCreator variant="website" />
      </Suspense>
    </div>
  )
}
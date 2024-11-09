import FlashcardDeckCreator from "@/components/DeckCreator/FlashcardDeckCreator";
import FlashcardDeckCreatorLoading from "@/components/ui/FlashcardDeckCreatorLoading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Flashcards from PDF | Amaizely",
  description: "Transform any PDF content into effective flashcards instantly with our AI-powered flashcard generator. Perfect for studying articles, research papers, and online resources.",
  keywords: [
    "PDF to flashcards",
    "online content flashcards",
    "AI flashcard maker",
    "PDF content study cards",
    "digital study materials",
    "PDF learning tools",
    "automatic flashcard generator",
    "online study aids",
    "PDF content converter",
    "educational technology"
  ],
  openGraph: {
    title: "Create Flashcards from PDF | Amaizely",
    description: "Transform any PDF content into effective flashcards instantly with our AI-powered flashcard generator. Perfect for studying articles, research papers, and online resources.",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 400,
        alt: "Amaizely PDF Flashcard Generator"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Flashcards from PDF | Amaizely",
    description: "Transform PDF content into effective flashcards instantly with our AI-powered flashcard generator.",
    images: ["/og-image.png"],
  },
};

export default function CreateDeckUsingManualPage() {

  return (
    <div className="create-deck-page flex justify-center p-4">
      <Suspense fallback={<FlashcardDeckCreatorLoading />}>
        <FlashcardDeckCreator variant="pdf" />
      </Suspense>
    </div>
  )
}
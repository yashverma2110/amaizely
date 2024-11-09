import { Suspense } from "react";
import { cookies } from "next/headers";
import SubscriptionForm from "@/components/SubscriptionForm";
import { GET_USER } from "@/services/AuthService";
import { setHeaders } from "@/config/AxiosService";
import { GET_TOTAL_DECKS } from "@/services/DeckService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Flashcard Decks | Amaizely",
  description: "Purchase decks to unlock more flashcard generation capabilities. Pay as you go with no subscription hassle.",
  keywords: [
    "flashcard pricing",
    "buy flashcard decks",
    "pay as you go flashcards",
    "AI flashcard pricing",
    "study material purchase",
    "learning tools pricing"
  ],
  openGraph: {
    title: "Buy Decks | Amaizely",
    description: "Purchase decks to unlock more flashcard generation capabilities. Pay as you go with no subscription hassle.",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 400,
        alt: "Amaizely Deck Pricing"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Decks | Amaizely",
    description: "Purchase decks to unlock more flashcard generation capabilities. Pay as you go with no subscription hassle.",
    images: ["/og-image.png"],
  },
};

export default async function SubscriptionPage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;

  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  let userResponse: any, totalDecksResponse: any;
  if (authSid) {
    [userResponse, totalDecksResponse] = await Promise.all([GET_USER(), GET_TOTAL_DECKS()])
  }

  function getProgressType() {
    if (!userResponse?.user?.totalDecks) {
      return 'progress-primary'
    }

    if (totalDecksResponse?.count / (userResponse.user?.totalDecks) > 0.74) {
      return 'progress-error'
    }

    return 'progress-primary'
  }

  return (
    <section className="subscription-page flex flex-col items-center gap-4 p-4">
      <div className="relative card bg-base-100 border-y-2 border-warning w-full md:max-w-xl shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Buy decks & unlock</h1>

          <Suspense fallback={<div className="skeleton rounded-lg bg-gray-300 h-80 w-full drop-shadow"></div>}>
            <SubscriptionForm country={userResponse?.country} />
          </Suspense>
        </div>
      </div>

      {
        userResponse?.user?.totalDecks && (
          <div className="card bg-base-100 flex-1 w-full md:max-w-xl">
            <div className="card-body">
              <h2 className="card-title">Your balance</h2>
              <p><span>{totalDecksResponse.count}</span> out of <strong>{userResponse.user?.totalDecks}</strong> decks created</p>
              <progress className={`progress w-full ${getProgressType()}`} value={totalDecksResponse.count} max={userResponse.user?.totalDecks}></progress>
            </div>
          </div>
        )
      }
    </section>
  )
}
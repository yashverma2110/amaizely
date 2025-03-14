import { Suspense } from "react";
import { cookies } from "next/headers";
import SubscriptionForm from "@/components/SubscriptionForm";
import { GET_USER } from "@/services/AuthService";
import { setHeaders } from "@/config/AxiosService";
import { GET_TOTAL_DECKS } from "@/services/DeckService";
import { Metadata } from "next";
import Image from "next/image";

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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Blob Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" 
              alt="am(AI)zely" 
              width={48}
              height={48}
              className="transition-transform duration-300 hover:scale-110" 
            />
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              Purchase Decks
            </span>
          </div>
          <p className="text-gray-300 text-lg">Unlock your learning potential with our flexible deck packages.</p>
        </div>

        {/* Purchase Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8">
            <Suspense fallback={
              <div className="w-full space-y-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-40 bg-slate-700/50 rounded-xl"></div>
                  <div className="h-36 bg-slate-700/50 rounded-xl"></div>
                  <div className="h-14 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl"></div>
                </div>
              </div>
            }>
              <SubscriptionForm country={userResponse?.country} isLoggedIn={!!authSid} />
            </Suspense>
          </div>

          {/* Balance Card */}
          {userResponse?.user?.totalDecks && (
            <div className="mt-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your Balance</h2>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="text-2xl font-bold text-white">{totalDecksResponse.count}</span>
                  <span className="mx-2">out of</span>
                  <span className="text-2xl font-bold text-white">{userResponse.user?.totalDecks}</span>
                  <span className="ml-2">decks created</span>
                </p>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-700">
                    <div
                      style={{ width: `${(totalDecksResponse.count / userResponse.user?.totalDecks) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressType()}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
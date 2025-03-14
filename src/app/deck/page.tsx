import { redirect } from "next/navigation";
import { GET_MY_DECKS } from "@/services/DeckService";
import DeckCard from '@/components/DeckCard';
import type { IDeck } from '@/types/IDeck';
import { cookies } from "next/headers";
import { setHeaders } from "@/config/AxiosService";
import { Suspense } from "react";
import DeckCreatorButton from "@/components/DeckCreatorButton";

export default async function DeckPage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  if (!authSid) {
    redirect('/login')
  }

  const deckResponse = await GET_MY_DECKS();

  const getDeckBgColor = (index: number) => {
    const colors = [
      'from-purple-500 to-blue-500',
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-amber-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-violet-500'
    ];
    return colors[index % colors.length];
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8 pt-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              Your Decks
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Manage and organize your learning journey. Create new decks or review existing ones.
            </p>
          </div>
          
          <div className="w-full md:w-auto min-w-[240px]">
            <Suspense fallback={<div className="skeleton h-12 w-full"></div>}>
              <DeckCreatorButton />
            </Suspense>
          </div>
        </div>

        {/* Loading State */}
        {!deckResponse && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-white/5"></div>
              </div>
            ))}
          </div>
        )}

        {/* Deck Grid with Categories */}
        {deckResponse?.data?.decks.length > 0 && (
          <div className="space-y-12">
            {/* In Progress Decks */}
            {deckResponse.data.decks.some((deck: IDeck) => deck.progress && deck.progress < 100) && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  In Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {deckResponse.data.decks
                    .filter((deck: IDeck) => deck.progress && deck.progress < 100)
                    .map((deck: IDeck, index: number) => (
                      <DeckCard 
                        key={deck._id} 
                        deck={deck} 
                        bgClass={getDeckBgColor(index)}
                      />
                    ))}
                </div>
              </section>
            )}

            {/* Draft Decks */}
            {deckResponse.data.decks.some((deck: IDeck) => deck.isDraft) && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Drafts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {deckResponse.data.decks
                    .filter((deck: IDeck) => deck.isDraft)
                    .map((deck: IDeck, index: number) => (
                      <DeckCard 
                        key={deck._id} 
                        deck={deck} 
                        bgClass={getDeckBgColor(index)}
                      />
                    ))}
                </div>
              </section>
            )}

            {/* Other Decks */}
            {deckResponse.data.decks.some((deck: IDeck) => !deck.isDraft && (!deck.progress || deck.progress === 100)) && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  All Decks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {deckResponse.data.decks
                    .filter((deck: IDeck) => !deck.isDraft && (!deck.progress || deck.progress === 100))
                    .map((deck: IDeck, index: number) => (
                      <DeckCard 
                        key={deck._id} 
                        deck={deck} 
                        bgClass={getDeckBgColor(index)}
                      />
                    ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Empty State */}
        {deckResponse?.data?.decks.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/10">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Learning Journey</h3>
                <p className="text-gray-300">
                  Create your first deck and begin organizing your knowledge effectively
                </p>
              </div>
              <Suspense fallback={<div className="skeleton h-12 w-full"></div>}>
                <DeckCreatorButton />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
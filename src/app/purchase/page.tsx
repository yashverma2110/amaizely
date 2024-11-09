import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SubscriptionForm from "@/components/SubscriptionForm";
import { GET_USER } from "@/services/AuthService";
import { setHeaders } from "@/config/AxiosService";
import { GET_TOTAL_DECKS } from "@/services/DeckService";


export default async function SubscriptionPage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  const [userResponse, totalDecksResponse] = await Promise.all([GET_USER(), GET_TOTAL_DECKS()])

  if (userResponse.status === 403 || userResponse.status === 401) {
    redirect('/login')
  }

  function getProgressType() {
    if (!userResponse.user?.totalDecks) {
      return 'progress-primary'
    }

    if (totalDecksResponse.count / (userResponse.user?.totalDecks) > 0.74) {
      return 'progress-error'
    }

    return 'progress-primary'
  }

  return (
    <section className="subscription-page flex flex-col gap-4 p-4">
      <div className="relative card bg-base-100 border-y-2 border-warning shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Buy decks & unlock</h1>

          <Suspense fallback={<div className="skeleton rounded-lg bg-gray-300 h-80 w-full drop-shadow"></div>}>
            <SubscriptionForm country={userResponse.country} />
          </Suspense>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Your balance</h2>
          <p><span>{totalDecksResponse.count}</span> out of <strong>{userResponse.user?.totalDecks}</strong> decks created</p>
          <progress className={`progress w-full ${getProgressType()}`} value={totalDecksResponse.count} max={userResponse.user?.totalDecks}></progress>
        </div>
      </div>
    </section>
  )
}
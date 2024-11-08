import FlashcardContainer from "@/components/FlashcardContainer";
import { setHeaders } from "@/config/AxiosService";
import { GET_FLASHCARDS_FOR_REVISION } from "@/services/FlashcardService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function RevisePage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  const response = await GET_FLASHCARDS_FOR_REVISION();

  if (!response.success) {
    return <div>Failed to load flashcards</div>
  }

  if (response.flashcards.length === 0) {
    return (
      <section className="empty-placeholder h-full p-4 flex items-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">No flashcards found</h2>
            <p>Create a deck to start with your smart revisions</p>
            <div className="card-actions">
              <Link href="/deck?mode=create" className="btn btn-primary w-full">
                <FontAwesomeIcon icon={faPlus} />
                Create a deck
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="revision-page h-[calc(100vh-8rem)]">
      <FlashcardContainer flashcards={response.flashcards} />
    </div>
  );
}
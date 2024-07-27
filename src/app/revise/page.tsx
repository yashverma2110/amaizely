import FlashcardContainer from "@/components/FlashcardContainer";
import FlashcardDisplay from "@/components/FlashcardDisplay";
import { setHeaders } from "@/config/AxiosService";
import { GET_FLASHCARDS_FOR_REVISION } from "@/services/FlashcardService";
import { cookies } from "next/headers";

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

  return (
    <div className="revision-page">
      <FlashcardContainer flashcards={response.flashcards} />
    </div>
  );
}
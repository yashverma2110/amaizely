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
      <div className="carousel carousel-vertical rounded-box h-[80vh]">
        {response.flashcards.map((flashcard: any) => (
          <div key={flashcard._id} className="carousel-item h-full">
            <div className="shadow-md w-full flex flex-col bg-white gap-4 m-4 p-4">
              <h1 className="font-semibold text-xl">{flashcard.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: flashcard.content }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
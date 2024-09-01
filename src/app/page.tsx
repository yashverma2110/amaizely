import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page min-h-screen">
      <section
        className="hero min-h-screen"
      >
        <div className="blob-bg h-1/2 w-full md:w-3/4 md:scale-150 fixed -top-[20%] -right-[25%]" />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Amaizely</h1>
            <p className="mb-5">
              Don&apos;t just read, remember! A smart way to create flashcards to help you stay ahead.
            </p>
            <button className="btn btn-primary">
              <Link href="/deck/create/youtube">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section className="fold-2 min-h-screen bg-white bg-opacity-80 p-4 gap-4 flex items-center flex-col">
        <div className="flex items-center gap-2">
          <label className="input input-bordered flex items-center gap-2">
            Topic
            <input type="text" className="grow pointer-events-none" placeholder="What can Amaizely do?" />
          </label>
          <button className="btn btn-primary">
            Generate
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Generate flashcards using AI</h2>
            <p>Generate flashcards from the content of <strong>Websites</strong>, <strong>YouTube</strong>, <strong>books</strong>, <strong>PDFs</strong>, and more!</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Smart revisions</h2>
            <p>Amaizely keeps track of the content you need to revise and helps you revise it using smart spaced repetition.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Choose your decks</h2>
            <p>Save other&apos;s decks or create your own and choose which one you want to revise.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Share your decks</h2>
            <p>Share your decks with your friends and family to collaborate and revise together!</p>
          </div>
        </div>
      </section>
    </main>
  );
}

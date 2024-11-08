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
            <h1 className="mb-5 text-5xl md:text-6xl font-bold">Amaizely</h1>
            <p className="mb-5 md:text-xl">
              Don&apos;t just read, remember! A smart way to create flashcards to help you stay ahead.
            </p>
            <button className="btn md:btn-lg btn-primary">
              <Link href="/login">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section className="fold-2 min-h-screen bg-purple-300 bg-opacity-30 p-4 gap-4 grid md:grid-cols-3 grid-cols-1 md:grid-rows-12">
        <div className="card bg-base-100 shadow-xl md:row-span-4">
          <div className="card-body">
            <h2 className="card-title">Generate using AI</h2>
            <p className="text-base md:text-lg">Generate flashcards from the content of <strong>Websites</strong>, <strong>YouTube</strong>, <strong>books</strong>, <strong>PDFs</strong>, and more!</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-6">
          <div className="card-body">
            <h2 className="card-title">Smart revisions</h2>
            <p className="text-base md:text-lg">Amaizely keeps track of the content you need to revise and helps you revise it using smart spaced repetition.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-4">
          <div className="card-body">
            <h2 className="card-title">Revise specific topics</h2>
            <p className="text-base md:text-lg">Amaizely allows you to revise decks of specific topics or subjects that you want to focus on.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-7">
          <div className="card-body">
            <h2 className="card-title">Formatting tools</h2>
            <p className="text-base md:text-lg">Amaizely has a set of tools to help you format your flashcards and make them look beautiful.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-3">
          <div className="card-body">
            <h2 className="card-title">Choose your decks</h2>
            <p className="text-base md:text-lg">Save other&apos;s decks or create your own and choose which one you want to revise.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-4">
          <div className="card-body">
            <h2 className="card-title">Share your decks</h2>
            <p className="text-base md:text-lg">Share your decks with your friends and family to revise together!</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-4 border-b-2 border-warning">
          <div className="card-body">
            <h2 className="card-title">Pay as you go</h2>
            <p className="text-base md:text-lg">Amaizely let&apos;s you buy decks as you go, escape the headache of managing multiple subscriptions.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

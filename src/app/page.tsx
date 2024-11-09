import Image from "next/image";
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
            <div className="flex justify-center items-center flex-row gap-4">
              <button className="btn btn-primary w-fit">
                <Link href="/login">
                  Get Started
                </Link>
              </button>
              <Link href="#features" className="btn w-fit btn-ghost">
                See features
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="fold-2 min-h-screen bg-purple-300 bg-opacity-30 p-4 gap-4 grid md:grid-cols-3 grid-cols-1 md:grid-rows-12">
        <div className="card bg-base-100 shadow-xl md:row-span-4">
          <div className="card-body">
            <h2 className="card-title">Flashcard generator using AI</h2>
            <p className="text-base md:text-lg">Generate flashcards from the content of <strong>Websites</strong>, <strong>YouTube</strong>, <strong>books</strong>, <strong>PDFs</strong>, and more!</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-5">
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

        <div className="card bg-base-100 shadow-xl md:row-span-4">
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

        <div className="card bg-base-100 shadow-xl md:row-span-4">
          <div className="card-body">
            <h2 className="card-title">Pay as you go</h2>
            <p className="text-base md:text-lg">Amaizely let&apos;s you buy decks as you go, escape the headache of managing multiple subscriptions.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-4 border-b-2 border-warning">
          <div className="card-body">
            <h2 className="card-title">Be creative</h2>
            <p className="text-base md:text-lg">Amaizely has an amazing editor to let you create flashcards manually, for when you want to create your own flashcards.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl md:row-span-4">
          <div className="card-body">
            <h2 className="card-title">Coming soon..</h2>
            <p className="text-base md:text-lg">
              AI generated <strong>quizzes</strong> to help you test your knowledge with dashboards to track your progress.
            </p>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer bg-purple-900/80 text-white p-10">
        <aside>
          <Image src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" alt="amaizely_logo" width={60} height={60} />
          <p>
            Amaizely
            <br />
            Learn smarter, remember longer.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link className="link link-hover" href="/login">Login</Link>
          <Link className="link link-hover" href="/register">Register</Link>
          <Link className="link link-hover" href="/purchase">Pricing</Link>
          <Link className="link link-hover" href="/about-us">About Us</Link>
          <Link className="link link-hover" href="/contact-us">Contact Us</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Blog</h6>
          <Link className="link link-hover" href="/blog">Flashcard maker</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          {/* <Link className="link link-hover" href="/terms">Terms of use</Link> */}
          {/* <Link className="link link-hover" href="/privacy">Privacy policy</Link> */}
          <Link className="link link-hover" href="/cookie-policy.html">Cookie policy</Link>
        </nav>
      </footer>
    </main>
  );
}

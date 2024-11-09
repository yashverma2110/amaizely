import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Flashcard Maker | Amaizely",
  description: "Create personalized flashcards instantly with our AI-powered flashcard maker. Convert any content from websites, YouTube videos, books, or PDFs into effective study materials.",
  keywords: [
    "AI flashcard creator",
    "automatic flashcard generator",
    "digital flashcards",
    "smart study cards",
    "online flashcard maker",
    "PDF to flashcards",
    "YouTube to flashcards",
    "study material generator"
  ],
  openGraph: {
    title: "AI Flashcard Maker | Amaizely",
    description: "Create personalized flashcards instantly with our AI-powered flashcard maker. Convert any content from websites, YouTube videos, books, or PDFs into effective study materials.",
    images: [
      {
        url: "/og-image.png", // Consider creating a specific image for this feature
        width: 800,
        height: 400,
        alt: "Amaizely AI Flashcard Maker"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Flashcard Maker | Amaizely",
    description: "Create personalized flashcards instantly with our AI-powered flashcard maker. Convert any content into effective study materials.",
    images: ["/og-image.png"],
  },
}

export default function FlashcardMaker() {
  return (
    <main className="min-h-screen">
      <article className="prose prose-purple max-w-4xl mx-auto p-4 md:p-8">
        <header>
          <h1 className="text-2xl md:text-5xl text-purple-900 font-bold mb-4">
            AI-Powered Flashcard Maker: How to create effective study materials instantly?
          </h1>

          <p className="text-base md:text-lg text-slate-900/70 mb-8">
            Transform any learning material into effective flashcards with Amaizely&apos;s intelligent flashcard maker. Our AI-powered flashcard generator helps you create personalized study materials from various sources, making learning more efficient and engaging.
          </p>
        </header>

        <section aria-labelledby="creation-methods">
          <h2 id="creation-methods" className="text-2xl md:text-3xl font-semibold text-purple-800 mt-12 mb-8">
            Multiple Ways to Create Flashcards
          </h2>

          <div className="space-y-8">
            <section aria-labelledby="youtube-section" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 id="youtube-section" className="text-lg md:text-2xl font-medium text-purple-800 mb-4">
                1. YouTube Video Flashcards
              </h3>
              <hr className="my-4 border-purple-200" />
              <p className="text-slate-900/70 mb-4">Convert educational videos into structured flashcards:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-900/70" role="list">
                <li>Simply paste any YouTube video URL</li>
                <li>Our AI watches and analyzes the content</li>
                <li>Get automatically generated flashcards from video content</li>
                <li>Perfect for video lectures and tutorials</li>
              </ul>
            </section>

            <section aria-labelledby="website-section" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 id="website-section" className="text-lg md:text-2xl font-medium text-purple-800 mb-4">
                2. Website Content Flashcards
              </h3>
              <hr className="my-4 border-purple-200" />
              <p className="text-slate-900/70 mb-4">Transform web articles and resources into study materials:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-900/70" role="list">
                <li>Enter any website URL with educational content</li>
                <li>AI extracts and processes key information</li>
                <li>Receive organized flashcards from web content</li>
                <li>Ideal for online articles and research papers</li>
              </ul>
            </section>

            <section aria-labelledby="pdf-section" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 id="pdf-section" className="text-lg md:text-2xl font-medium text-purple-800 mb-4">
                3. PDF Document Flashcards
              </h3>
              <hr className="my-4 border-purple-200" />
              <p className="text-slate-900/70 mb-4">Convert your PDF materials into interactive flashcards:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-900/70" role="list">
                <li>Upload any PDF document</li>
                <li>AI analyzes and extracts important concepts</li>
                <li>Get structured flashcards from your documents</li>
                <li>Great for textbooks and study guides</li>
              </ul>
            </section>

            <section aria-labelledby="text-section" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 id="text-section" className="text-lg md:text-2xl font-medium text-purple-800 mb-4">
                4. Text-Based Flashcards
              </h3>
              <hr className="my-4 border-purple-200" />
              <p className="text-slate-900/70 mb-4">Create flashcards from your own notes:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-900/70" role="list">
                <li>Paste any text content</li>
                <li>AI processes and organizes the information</li>
                <li>Receive well-structured learning materials</li>
                <li>Perfect for personal notes and summaries</li>
              </ul>
            </section>

            <section aria-labelledby="manual-section" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 id="manual-section" className="text-lg md:text-2xl font-medium text-purple-800 mb-4">
                5. Manual Creation with Rich Editor
              </h3>
              <hr className="my-4 border-purple-200" />
              <p className="text-slate-900/70 mb-4">Create custom flashcards with our feature-rich editor:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-900/70" role="list">
                <li>Format text with bold, italic, and underline options</li>
                <li>Create ordered and unordered lists</li>
                <li>Add code snippets for technical content</li>
                <li>Complete control over your flashcard content</li>
              </ul>
            </section>
          </div>
        </section>

        <section aria-labelledby="features">
          <h2 id="features" className="text-3xl font-semibold text-purple-800 mt-16 mb-8">
            Smart Features for Better Learning
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <section aria-labelledby="spaced-repetition" className="bg-purple-50 rounded-lg p-6">
              <h3 id="spaced-repetition" className="text-xl font-medium text-purple-800 mb-3">
                Spaced Repetition
              </h3>
              <p className="text-purple-900/70">
                Our platform uses intelligent spaced repetition to help you review flashcards at optimal intervals, enhancing long-term retention and learning efficiency.
              </p>
            </section>
            <section aria-labelledby="spaced-repetition" className="bg-purple-50 rounded-lg p-6">
              <h3 id="spaced-repetition" className="text-xl font-medium text-purple-800 mb-3">
                Flexible Organization
              </h3>
              <p className="text-purple-900/70">
                Organize your flashcards into decks, making it easy to focus on specific topics or subjects during your study sessions.
              </p>
            </section>
            <section aria-labelledby="spaced-repetition" className="bg-purple-50 rounded-lg p-6">
              <h3 id="spaced-repetition" className="text-xl font-medium text-purple-800 mb-3">
                Share with your friends
              </h3>
              <p className="text-purple-900/70">
                Share your flashcard decks with friends and study groups, by making them public or private.
              </p>
            </section>
          </div>
        </section>

        <section aria-labelledby="getting-started">
          <h2 id="getting-started" className="text-3xl font-semibold text-purple-800 mt-12 mb-8">
            Getting Started
          </h2>

          <ol className="list-decimal pl-6 space-y-4 text-purple-900/70 mb-12" role="list">
            <li>Choose your preferred content source (YouTube, website, PDF, text, or manual creation)</li>
            <li>Input your content or create flashcards using our editor</li>
            <li>Save and organize your flashcards into decks for efficient studying</li>
          </ol>
        </section>

        <section aria-labelledby="cta" className="bg-purple-100 rounded-xl p-8 mt-12">
          <h3 id="cta" className="text-2xl font-semibold text-purple-800 mb-4">
            Ready to Transform Your Study Material?
          </h3>
          <p className="text-purple-900/70 mb-6">
            Start creating effective flashcards today with our AI-powered tools. Sign up now to experience smarter learning!
          </p>
          <nav className="cta-navigation">
            <a
              href="/register"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              role="button"
              aria-label="Sign up to create flashcards"
            >
              Get Started
            </a>
          </nav>
        </section>
      </article>
    </main>
  );
}
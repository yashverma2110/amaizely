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
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <article className="prose prose-purple max-w-4xl mx-auto p-4 md:p-8 pt-16">
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-6xl text-purple-900 font-extrabold mb-6 leading-tight">
            AI-Powered Flashcard Maker: Create Effective Study Materials Instantly
          </h1>

          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Transform any learning material into effective flashcards with Amaizely&apos;s intelligent flashcard maker. Our AI-powered generator helps you create personalized study materials from various sources, making learning more efficient and engaging.
          </p>
        </header>

        <section aria-labelledby="creation-methods">
          <h2 id="creation-methods" className="text-3xl md:text-4xl font-bold text-purple-900 mt-20 mb-12 text-center">
            Multiple Ways to Create Flashcards
          </h2>

          <div className="space-y-6">
            <section aria-labelledby="youtube-section" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 id="youtube-section" className="text-2xl md:text-3xl font-bold text-purple-800 mb-6">
                1. YouTube Video Flashcards
              </h3>
              <div className="h-1 w-20 bg-purple-500 mb-6"></div>
              <p className="text-lg text-slate-700 mb-6">Convert educational videos into structured flashcards:</p>
              <ul className="list-none space-y-4 text-slate-600" role="list">
                {[
                  "Simply paste any YouTube video URL",
                  "Our AI watches and analyzes the content",
                  "Get automatically generated flashcards from video content",
                  "Perfect for video lectures and tutorials"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-4 flex items-center justify-center">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="website-section" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 id="website-section" className="text-2xl md:text-3xl font-bold text-purple-800 mb-6">
                2. Website Content Flashcards
              </h3>
              <div className="h-1 w-20 bg-purple-500 mb-6"></div>
              <p className="text-lg text-slate-700 mb-6">Transform web articles and resources into study materials:</p>
              <ul className="list-none space-y-4 text-slate-600" role="list">
                {[
                  "Enter any website URL with educational content",
                  "AI extracts and processes key information",
                  "Receive organized flashcards from web content",
                  "Ideal for online articles and research papers"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-4 flex items-center justify-center">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="pdf-section" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 id="pdf-section" className="text-2xl md:text-3xl font-bold text-purple-800 mb-6">
                3. PDF Document Flashcards
              </h3>
              <div className="h-1 w-20 bg-purple-500 mb-6"></div>
              <p className="text-lg text-slate-700 mb-6">Convert your PDF materials into interactive flashcards:</p>
              <ul className="list-none space-y-4 text-slate-600" role="list">
                {[
                  "Upload any PDF document",
                  "AI analyzes and extracts important concepts",
                  "Get structured flashcards from your documents",
                  "Great for textbooks and study guides"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-4 flex items-center justify-center">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="text-section" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 id="text-section" className="text-2xl md:text-3xl font-bold text-purple-800 mb-6">
                4. Text-Based Flashcards
              </h3>
              <div className="h-1 w-20 bg-purple-500 mb-6"></div>
              <p className="text-lg text-slate-700 mb-6">Create flashcards from your own notes:</p>
              <ul className="list-none space-y-4 text-slate-600" role="list">
                {[
                  "Paste any text content",
                  "AI processes and organizes the information",
                  "Receive well-structured learning materials",
                  "Perfect for personal notes and summaries"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-4 flex items-center justify-center">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="manual-section" className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 id="manual-section" className="text-2xl md:text-3xl font-bold text-purple-800 mb-6">
                5. Manual Creation with Rich Editor
              </h3>
              <div className="h-1 w-20 bg-purple-500 mb-6"></div>
              <p className="text-lg text-slate-700 mb-6">Create custom flashcards with our feature-rich editor:</p>
              <ul className="list-none space-y-4 text-slate-600" role="list">
                {[
                  "Format text with bold, italic, and underline options",
                  "Create ordered and unordered lists",
                  "Add code snippets for technical content",
                  "Complete control over your flashcard content"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-4 flex items-center justify-center">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section aria-labelledby="features" className="mt-24">
          <h2 id="features" className="text-3xl md:text-4xl font-bold text-purple-900 mb-12 text-center">
            Smart Features for Better Learning
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Spaced Repetition",
                description: "Our platform uses intelligent spaced repetition to help you review flashcards at optimal intervals, enhancing long-term retention and learning efficiency."
              },
              {
                title: "Flexible Organization",
                description: "Organize your flashcards into decks, making it easy to focus on specific topics or subjects during your study sessions."
              },
              {
                title: "Share with Friends",
                description: "Share your flashcard decks with friends and study groups, by making them public or private."
              }
            ].map((feature, index) => (
              <section key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  {feature.title}
                </h3>
                <div className="h-1 w-16 bg-purple-500 mb-6"></div>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="getting-started" className="mb-16">
          <h2 id="getting-started" className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
            Getting Started
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ol className="space-y-6 text-lg text-slate-700" role="list">
              {[
                "Choose your preferred content source (YouTube, website, PDF, text, or manual creation)",
                "Input your content or create flashcards using our editor",
                "Save and organize your flashcards into decks for efficient studying"
              ].map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold mr-4">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="cta" className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-12 mt-20 text-center">
          <h3 id="cta" className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Study Material?
          </h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start creating effective flashcards today with our AI-powered tools. Sign up now to experience smarter learning!
          </p>
          <nav className="cta-navigation">
            <a
              href="/register"
              className="inline-block bg-white text-purple-800 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-purple-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              role="button"
              aria-label="Sign up to create flashcards"
            >
              Get Started Now
            </a>
          </nav>
        </section>
      </article>
    </main>
  );
}
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBrain, faGraduationCap, faLightbulb, faRocket } from "@fortawesome/free-solid-svg-icons";

export default function AboutUsPage() {
  return (
    <main className="about-us-page min-h-screen">
      <section className="hero min-h-[60vh] relative">
        <div className="blob-bg h-1/2 w-full md:w-3/4 md:scale-150 fixed -top-[20%] -right-[25%]" />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl md:text-6xl font-bold">About Us</h1>
            <p className="mb-5 md:text-xl">
              We&apos;re on a mission to revolutionize learning through AI-powered flashcards and smart revision techniques.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-section py-12 px-4">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FontAwesomeIcon icon={faBrain} className="h-8 w-8 text-primary mb-4" />
              <h2 className="card-title">Our Mission</h2>
              <p>
                To make learning more efficient and effective by combining the power of AI with proven learning techniques.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FontAwesomeIcon icon={faLightbulb} className="h-8 w-8 text-warning mb-4" />
              <h2 className="card-title">Our Vision</h2>
              <p>
                To become the leading platform for personalized learning and knowledge retention through innovative technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section py-12 px-4 bg-purple-300 bg-opacity-30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What Sets Us Apart</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <FontAwesomeIcon icon={faRocket} className="h-6 w-6 text-success mb-2" />
                <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                <p>
                  We leverage cutting-edge AI technology to transform any content into effective learning materials.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <FontAwesomeIcon icon={faGraduationCap} className="h-6 w-6 text-info mb-2" />
                <h3 className="text-xl font-semibold mb-2">Learning Science</h3>
                <p>
                  Our platform is built on proven learning techniques like spaced repetition and active recall.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="mb-8 text-lg">
            Join learners who are already using Amaizely to study smarter, not harder.
          </p>
          <Link href="/register" className="btn btn-primary btn-lg">
            Get Started
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      
      <section className="hero min-h-screen relative overflow-hidden flex items-center">
        {/* Professional geometric background elements */}
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-left z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                Master Your Learning Journey
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Transform your study experience with AI-powered flashcards. Create, learn, and retain knowledge more effectively than ever before.
              </p>
              <div className="flex flex-row gap-6">
                <Link href="/login">
                  <button className="btn btn-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                    Get Started Free
                  </button>
                </Link>
                <Link href="#features">
                  <button className="btn btn-lg btn-outline text-white hover:bg-white/10 border-2">
                    Explore Features
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <Image
                  src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1741960308/image-Photoroom-min_hxliiy.webp"
                  alt="Amaizely Platform Preview"
                  width={500}
                  height={500}
                  className="object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Powerful Features for Enhanced Learning
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* Feature cards */}
            <div className="group">
              <div className="card bg-slate-900/50 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="card-body p-8">
                  <div className="text-purple-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="card-title text-2xl font-bold text-white mb-4">AI-Powered Generation</h3>
                  <p className="text-gray-300">Create comprehensive flashcards instantly from any content source - websites, videos, PDFs, and more.</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="card bg-slate-900/50 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="card-body p-8">
                  <div className="text-blue-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="card-title text-2xl font-bold text-white mb-4">Smart Revision System</h3>
                  <p className="text-gray-300">Optimize your learning with our intelligent spaced repetition algorithm that adapts to your progress.</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="card bg-slate-900/50 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="card-body p-8">
                  <div className="text-indigo-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="card-title text-2xl font-bold text-white mb-4">Customizable Learning</h3>
                  <p className="text-gray-300">Tailor your study experience with advanced formatting tools and personalized deck organization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-900/80 backdrop-blur-lg text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <Image 
                  src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" 
                  alt="amaizely_logo" 
                  width={48} 
                  height={48}
                  className="hover:rotate-12 transition-all duration-300" 
                />
                <div>
                  <h3 className="text-xl font-bold">Amaizely</h3>
                  <p className="text-gray-400">Learn smarter, remember longer.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h6 className="text-lg font-semibold mb-4">Company</h6>
              <ul className="space-y-3">
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/login">Login</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/register">Register</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/purchase">Pricing</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/about-us">About Us</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/contact-us">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h6 className="text-lg font-semibold mb-4">Resources</h6>
              <ul className="space-y-3">
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/blog/flashcard-maker">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h6 className="text-lg font-semibold mb-4">Legal</h6>
              <ul className="space-y-3">
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="/cookie-policy.html">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Amaizely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

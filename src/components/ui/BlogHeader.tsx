import Image from "next/image";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-semibold text-purple-900 hover:opacity-90 transition-opacity"
          >
            <Image 
              src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" 
              alt="amaizely_logo" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <span className="flex items-baseline">
              am
              <span className="text-purple-600 text-sm mx-0.5">(AI)</span>
              zely
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-purple-900 hover:text-purple-700 font-medium text-sm transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
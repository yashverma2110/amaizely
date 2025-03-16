'use client';

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCog, faComments, faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import '@/styles/header.css';

export default function AppHeader() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 bg-slate-700/50 rounded-lg"></div>
            <div className="h-6 w-24 bg-slate-700/50 rounded-lg"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-20 bg-slate-700/50 rounded-lg"></div>
            <div className="h-10 w-24 bg-slate-700/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href={isAuthenticated ? "/deck" : "/"} className="flex items-center gap-3 group">
          <Image 
            src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" 
            alt="am(AI)zely" 
            width={32}
            height={32}
            className="transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
            am(AI)zely
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link 
                href="/deck" 
                className={`nav-link ${pathname === '/deck' ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
                <span>My Decks</span>
              </Link>
              <Link 
                href="/settings" 
                className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <Link 
                href="/purchase" 
                className={`nav-link ${pathname === '/purchase' ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                <span>Purchase</span>
              </Link>
              <a 
                href="https://www.reddit.com/r/amaizely/submit/" 
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <FontAwesomeIcon icon={faComments} className="w-4 h-4" />
                <span>Feedback</span>
              </a>
              <div className="h-6 w-px bg-white/10"></div>
              <Link 
                href="/logout" 
                className="nav-link text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                <span>Logout</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className="btn btn-ghost text-white hover:bg-white/10 transition-all duration-200"
              >
                Log In
              </Link>
              <Link 
                href="/register"
                className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
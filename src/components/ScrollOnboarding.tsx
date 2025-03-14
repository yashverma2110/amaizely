'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function ScrollOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenScrollOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenScrollOnboarding', 'true');
  };

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 max-w-sm mx-4 pointer-events-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white">Scroll to Navigate</h3>
            <button 
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-300 mb-6">
            Scroll up and down to navigate between flashcards. Each card will snap into place as you scroll.
          </p>
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className="h-6 w-6 text-purple-400 animate-bounce" 
            />
            <button
              onClick={handleDismiss}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
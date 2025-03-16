'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import type { IDeck } from "@/types/IDeck";

export default function ExportDeck({ deck }: { deck: IDeck }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnkiExport = async () => {
    // TODO: Implement Anki export
    console.log("Exporting to Anki...");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full btn btn-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-lg transition-all duration-200 hover:shadow-lg group"
      >
        <FontAwesomeIcon icon={faFileExport} className="h-4 w-4 group-hover:scale-110 transition-transform" />
        <span>Export</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl shadow-purple-500/10">
            <h3 className="text-xl font-bold text-white mb-4">
              Export {deck.title}
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={handleAnkiExport}
                className="w-full btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-200"
              >
                Export to Anki
              </button>
              
              {/* Placeholder for future export options */}
              <div className="text-sm text-gray-400 text-center mt-4">
                More export options coming soon
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
} 
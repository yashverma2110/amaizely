'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faFileLines, faFilePdf, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { usePathname } from "next/navigation"
import Link from 'next/link';

const tabs = [
  {
    href: '/deck/create/youtube',
    label: 'YouTube',
    icon: faYoutube,
    gradient: 'from-red-500 to-red-600'
  },
  {
    href: '/deck/create/website',
    label: 'Website',
    icon: faGlobe,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    href: '/deck/create/pdf',
    label: 'PDF',
    icon: faFilePdf,
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    href: '/deck/create/text',
    label: 'Text',
    icon: faFileLines,
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    href: '/deck/create/manual',
    label: 'Manual',
    icon: faPenFancy,
    gradient: 'from-amber-500 to-amber-600'
  }
];

export default function DeckTabVariants() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <nav className="max-w-4xl mx-auto px-4 md:px-6" role="tablist">
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto py-2 md:py-3 scrollbar-none">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              role="tab"
              href={tab.href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300',
                'hover:bg-white/5',
                {
                  'bg-gradient-to-r text-white shadow-lg': pathname === tab.href,
                  [tab.gradient]: pathname === tab.href,
                  'text-gray-400 hover:text-white': pathname !== tab.href,
                }
              )}
            >
              <FontAwesomeIcon 
                icon={tab.icon} 
                className={clsx(
                  'h-4 w-4 transition-transform duration-300',
                  { 'scale-110': pathname === tab.href }
                )}
              />
              <span className="whitespace-nowrap">{tab.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
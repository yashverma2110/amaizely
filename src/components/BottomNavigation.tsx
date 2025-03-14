"use client"

import { faCompass, faBagShopping, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function BottomNavigation({ className }: { className?: string }) {
  const pathname = usePathname();

  function getNavItemClass(path: string) {
    const baseClasses = "relative flex flex-col items-center justify-center w-full py-2 transition-all duration-300";
    const activeClasses = "text-purple-400 before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-8 before:h-1 before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 before:rounded-full";
    const inactiveClasses = "text-gray-400 hover:text-purple-300";
    
    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  }

  function getIconClass(path: string) {
    return `h-6 w-6 transition-transform duration-300 ${pathname === path ? 'scale-110' : 'scale-100'}`;
  }

  function getTextClass(path: string) {
    const baseClasses = "text-[10px] font-medium transition-all duration-300 mt-1";
    const activeClasses = "opacity-100 transform translate-y-0";
    const inactiveClasses = "opacity-70 group-hover:opacity-100";
    
    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  }

  return (
    <nav
      id="bottom-navigation"
      className={`fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 pb-safe-bottom ${className}`}
    >
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-4">
          <Link href="/deck" className="group touch-none">
            <div className={getNavItemClass("/deck")}>
              <FontAwesomeIcon icon={faLayerGroup} className={getIconClass("/deck")} />
              <span className={getTextClass('/deck')}>Deck</span>
            </div>
          </Link>

          <Link href="/revise" className="group touch-none">
            <div className={getNavItemClass("/revise")}>
              <FontAwesomeIcon icon={faCompass} className={getIconClass("/revise")} />
              <span className={getTextClass('/revise')}>Revise</span>
            </div>
          </Link>

          <Link href="/settings" className="group touch-none">
            <div className={getNavItemClass("/settings")}>
              <FontAwesomeIcon icon={faGear} className={getIconClass("/settings")} />
              <span className={getTextClass('/settings')}>Settings</span>
            </div>
          </Link>

          <Link href="/purchase" className="group touch-none">
            <div className={getNavItemClass("/purchase")}>
              <FontAwesomeIcon icon={faBagShopping} className={getIconClass("/purchase")} />
              <span className={getTextClass('/purchase')}>Purchase</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Active Tab Glow */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0"></div>
    </nav>
  );
}
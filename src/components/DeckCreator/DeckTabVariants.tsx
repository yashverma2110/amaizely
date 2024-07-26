'use client'

import clsx from 'clsx';
import { usePathname } from "next/navigation"
import Link from 'next/link';

export default function DeckTabVariants() {
  const pathname = usePathname();

  return (
    <div role="tablist" className="tabs tabs-lg tabs-bordered">
      <Link role="tab" href="/deck/create/youtube" className={clsx(['tab', {
        'tab-active': pathname === '/deck/create/youtube'
      }])}>YouTube</Link>
      <Link role="tab" href="/deck/create/website" className={clsx(['tab', {
        'tab-active': pathname === '/deck/create/website'
      }])}>Website</Link>
      <Link role="tab" href="/deck/create/text" className={clsx(['tab', {
        'tab-active': pathname === '/deck/create/text'
      }])}>Text</Link>
    </div>
  )
}
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
      <Link role="tab" href="/deck/create/pdf" className={clsx(['tab', {
        'tab-active': pathname === '/deck/create/pdf'
      }])}>PDF</Link>
      <Link role="tab" href="/deck/create/doc" className={clsx(['tab', {
        'tab-active': pathname === '/deck/create/doc'
      }])}>Google Doc</Link>
    </div>
  )
}
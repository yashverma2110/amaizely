'use client'

import clsx from 'clsx';
import { usePathname } from "next/navigation"
import Link from 'next/link';

export default function DeckTabVariants() {
  const pathname = usePathname();

  return (
    <div role="tablist" className="md:border-l md:border-neutral-200 shadow-inner tabs tabs-md md:tabs-lg bg-slate-50 tabs-bordered">
      <Link
        role="tab"
        href="/deck/create/youtube"
        className={clsx(['tab', {
          'tab-active': pathname === '/deck/create/youtube'
        }])}
      >
        YouTube
      </Link>
      <Link
        role="tab"
        href="/deck/create/website"
        className={clsx(['tab', {
          'tab-active': pathname === '/deck/create/website'
        }])}
      >
        Website
      </Link>
      <Link
        role="tab"
        href="/deck/create/pdf"
        className={clsx(['tab', {
          'tab-active': pathname === '/deck/create/pdf'
        }])}
      >
        PDF
      </Link>
      <Link
        role="tab"
        href="/deck/create/text"
        className={clsx(['tab', {
          'tab-active': pathname === '/deck/create/text'
        }])}
      >
        Text
      </Link>
      <Link
        role="tab"
        href="/deck/create/manual"
        className={clsx(['tab', {
          'tab-active': pathname === '/deck/create/manual'
        }])}
      >
        Manual
      </Link>
    </div>
  )
}
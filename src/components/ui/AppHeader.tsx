import Link from "next/link";

export default function AppHeader({ className }: { className: string }) {
  return (
    <div className={`navbar z-50 bg-base-100 shadow-md ${className}`}>
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl p-0" href="/deck">
          <p>am<span>(AI)</span>zely</p>
        </Link>
      </div>
    </div>
  )
}
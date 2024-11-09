import Image from "next/image";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <header className="blog-header navbar bg-base-100 border-b border-neutral-200 drop-shadow">
      <Link className="btn btn-ghost flex items-center gap-2 text-xl p-0" href="/">
        <Image src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" alt="amaizely_logo" width={30} height={30} />
        <p>am<span>(AI)</span>zely</p>
      </Link>
      <div className="flex-none ml-auto">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link href="/login" className="btn btn-ghost btn-sm">Login</Link></li>
          <li><Link href="/register" className="btn btn-primary btn-sm">Register</Link></li>
        </ul>
      </div>
    </header>
  )
}
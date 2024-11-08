import Link from "next/link";

interface IDeckLimitIndicatorProps {
  current: number
  total: number
}
export default async function DeckLimitIndicator({ current, total }: IDeckLimitIndicatorProps) {
  function getProgressType() {
    if (!total) {
      return 'progress-primary'
    }

    if (current / total > 0.74) {
      return 'progress-error'
    }

    return 'progress-primary'
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex md:flex-col md:gap-2 justify-between text-xs md:text-sm items-center">
        <p><span>{current}</span> out of <strong>{total}</strong> decks created</p>
        <progress className={`progress w-full hidden md:block ${getProgressType()}`} value={current} max={total}></progress>
        <Link href="/purchase" className="md:w-full">
          <button className="btn btn-warning btn-xs md:btn-sm w-full">Purchase</button>
        </Link>
      </div>
      <progress className={`progress md:hidden w-full ${getProgressType()}`} value={current} max={total}></progress>
    </div>
  )
}
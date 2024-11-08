export default function DeckLoading() {
  return (
    <section className="deck-loading w-full flex flex-col items-center p-4 gap-4">
      <div className="skeleton bg-gray-300 h-12 rounded w-full drop-shadow"></div>
      <div className="w-full flex justify-between">
        <div className="skeleton bg-gray-300 h-4 w-10 drop-shadow"></div>
        <div className="skeleton bg-gray-300 h-4 w-24 drop-shadow"></div>
      </div>
      <div className="skeleton bg-gray-300 h-4 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 h-36 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 h-36 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 h-36 w-full drop-shadow"></div>
    </section>
  )
}
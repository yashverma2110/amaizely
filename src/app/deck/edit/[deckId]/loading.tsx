export default function DeckLoading() {
  return (
    <section className="deck-loading w-full flex flex-col items-center p-4 gap-4">
      <div className="skeleton bg-gray-300 h-12 rounded w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 h-12 rounded w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 h-52 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 h-52 w-full drop-shadow"></div>
    </section>
  )
}
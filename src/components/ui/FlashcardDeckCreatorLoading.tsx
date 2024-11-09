export default function FlashcardDeckCreatorLoading() {
  return (
    <div className="page-loading-section h-screen w-full grid grid-rows-12 gap-4 my-2">
      <div className="skeleton bg-gray-300 row-span-3 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 row-span-1 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 row-span-2 w-full drop-shadow"></div>
      <div className="skeleton bg-gray-300 row-span-2 w-full drop-shadow"></div>
    </div>
  )
}
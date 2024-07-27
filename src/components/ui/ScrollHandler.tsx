"use client"
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IScrollContextType {
  scrollTop: number;
  setScrollTop: Dispatch<SetStateAction<number>>;
  onRemind?: () => Promise<void>;
}
export const ScrollContext = createContext<IScrollContextType>({
  scrollTop: 0,
  setScrollTop: () => { },
});

export function ScrollHandler({ className, children }: { className: string; children: React.ReactNode }) {
  const [scrollTop, setScrollTop] = useState(0);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setScrollTop(e.currentTarget.scrollTop);
  }

  return (
    <ScrollContext.Provider value={{ scrollTop, setScrollTop }}>
      <div className={className} onScroll={handleScroll}>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
"use client"
import debounce from "@/utils/debounce";
import { createContext, Dispatch, SetStateAction, UIEvent, useCallback, useEffect, useRef, useState } from "react";

interface IScrollContextType {
  scrollTop: number;
  clientHeight: number;
  setScrollTop: Dispatch<SetStateAction<number>>;
  onRemind?: () => Promise<void>;
}
export const ScrollContext = createContext<IScrollContextType>({
  scrollTop: 0,
  clientHeight: 0,
  setScrollTop: () => { },
});

export function ScrollHandler({ className, children }: { className: string; children: React.ReactNode }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = scrollContainerRef.current;

    if (target) {
      setScrollTop(target.scrollTop);
      setClientHeight(target.clientHeight);
      scrollContainerRef.current = null;
    }
  }, [])

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target) {
      setScrollTop(target.scrollTop);
      setClientHeight(target.clientHeight);
    }
  }, []);

  const debouncedScrollHandler = useCallback(
    debounce(handleScroll, 500),
    [handleScroll]
  );

  return (
    <ScrollContext.Provider value={{ scrollTop, clientHeight, setScrollTop }}>
      <div ref={scrollContainerRef} className={className} onScroll={debouncedScrollHandler}>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
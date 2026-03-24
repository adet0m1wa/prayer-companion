import { useState, useEffect, useRef } from "react";

const cache = new Set<string>();

export function useImagePreloader(urls: string[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const uncached = urls.filter((u) => !cache.has(u));

    if (uncached.length === 0) {
      setIsLoaded(true);
      return;
    }

    const promises = uncached.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            cache.add(src);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
          if (img.complete) {
            cache.add(src);
            resolve();
          }
        }),
    );

    Promise.all(promises).then(() => {
      if (mounted.current) setIsLoaded(true);
    });

    return () => {
      mounted.current = false;
    };
  }, [urls.join(",")]);

  return isLoaded;
}

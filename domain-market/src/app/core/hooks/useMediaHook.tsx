import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    const media = window.matchMedia(query);
    return media.matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addListener(listener);

    return () => {
      media.removeListener(listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

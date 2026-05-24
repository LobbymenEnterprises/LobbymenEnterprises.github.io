import { useEffect } from 'react';

// Keeps <title> in sync per route (HashRouter doesn't change it for us).
export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

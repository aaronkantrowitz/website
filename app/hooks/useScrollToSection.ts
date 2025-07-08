import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollToSection(refs: Record<string, HTMLElement | null>) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash && refs[hash.slice(1)]) {
      refs[hash.slice(1)]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [hash, refs]);
}

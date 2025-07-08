import { useRef } from 'react';

export function useSectionRefs(sectionIds: string[]) {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  sectionIds.forEach((id) => {
    if (!refs.current[id]) refs.current[id] = null;
  });
  return refs;
}

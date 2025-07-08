import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function useActiveSection(
  sectionIds: string[],
  refs: Record<string, HTMLElement | null>
) {
  const [active, setActive] = useState(sectionIds[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          setActive(id);
          if (window.location.hash !== `#${id}`) {
            navigate(`#${id}`, { replace: true });
          }
        }
      },
      { threshold: 0.5 }
    );
    sectionIds.forEach((id) => {
      const el = refs[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds, refs, navigate]);

  return active;
}

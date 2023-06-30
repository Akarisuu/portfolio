import { RefObject, useEffect } from 'react';

export function useIntersectRouter(ref: RefObject<HTMLElement>, href: string) {
  useEffect(() => {
    const element = ref.current;

    const routerObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            history.replaceState({}, '', href);
          }
        }),
      { threshold: 1, rootMargin: '0px 0px -50%' },
    );

    if (element) routerObserver.observe(element);

    return () => {
      if (element) routerObserver.unobserve(element);
    };
  }, [href, ref]);
}

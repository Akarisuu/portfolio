import { useRouter } from "next/router";
import { RefObject, useEffect } from "react";

export default function intersectRouter(
  ref: RefObject<HTMLElement>,
  href: string
) {
  const router = useRouter();

  useEffect(() => {
    const routerObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            history.replaceState({}, "", href);
          }
        }),
      { threshold: 1, rootMargin: "0px 0px -50%" }
    );

    if (ref.current) routerObserver.observe(ref.current);

    return () => {
      if (ref.current) routerObserver.unobserve(ref.current);
    };
  }, []);
}

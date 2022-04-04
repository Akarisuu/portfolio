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
          if (entry.isIntersecting) router.replace("/");
        }),
      { threshold: 1 }
    );

    if (ref.current) routerObserver.observe(ref.current);

    return () => {
      if (ref.current) routerObserver.unobserve(ref.current);
    };
  }, []);
}

import { projectsContent } from "utils/types";
import Star from "public/icons/star.svg";
import { useEffect, useRef, useState } from "react";
import intersectRouter from "hooks/intersectRouter";
import Project from "./components/project";

export default function ProjectsSection({
  content,
}: {
  content: projectsContent;
}) {
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [visibleId, setVisibleId] = useState<null | number>(null);

  useEffect(() => {
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            fadeInObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: window.innerWidth >= 768 ? 0.7 : 0.3,
      }
    );

    const focusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute("data-key");
          if (entry.isIntersecting) {
            return setVisibleId(Number(index));
          }
        });
      },
      {
        threshold: window.innerWidth >= 768 ? 1 : 0.5,
        rootMargin: "-10% 0px",
      }
    );

    if (projectsWrapperRef.current) {
      Array.from(projectsWrapperRef.current?.children).forEach((el) => {
        fadeInObserver.observe(el);
        focusObserver.observe(el);
      });
    }

    return () => {
      if (projectsWrapperRef.current) {
        Array.from(projectsWrapperRef.current?.children).forEach((el) => {
          fadeInObserver.unobserve(el);
          focusObserver.unobserve(el);
        });
      }
    };
  }, []);

  intersectRouter(headerRef, "/#projects");

  return (
    <section className=" bg-secondaryBackground pt-9 md:pt-20" id="projects">
      <h2
        className="font-bold text-3xl px-mobile md:text-4xl xl:px-desktop xl:text-5xl"
        ref={headerRef}
      >
        {content.header}
        <span className="text-secondary">.</span>
      </h2>
      <div className="flex flex-col mt-20 relative" ref={projectsWrapperRef}>
        {content.projects.map((projectContent, index) => (
          <Project
            content={projectContent}
            pre={content.pre}
            index={index}
            visibleId={visibleId}
            key={index}
          />
        ))}
        <div className="absolute top-0 right-0 w-full h-full flex items-end justify-end">
          <div className="w-full max-w-[500px] sticky bottom-4 overflow-hidden flex justify-end xl:w-[45%] xl:max-w-[700px]">
            <div className="w-full relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-tr after:from-secondaryBackground after:to-secondaryBackground/30">
              <Star className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Star from 'public/icons/star.svg';
import { useEffect, useRef, useState } from 'react';
import { useIntersectRouter } from 'hooks/useIntersectRouter';
import Project from './components/project/Project';
import { useTranslation } from 'next-i18next';

export default function ProjectsSection() {
  const { t } = useTranslation('projects');
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [visibleId, setVisibleId] = useState<null | number>(null);

  useIntersectRouter(headerRef, '/#projects');

  useEffect(() => {
    const projectsWrapper = projectsWrapperRef.current;
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            fadeInObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: window.innerWidth >= 768 ? 0.7 : 0.3,
      },
    );

    const focusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute('data-key');
          if (entry.isIntersecting) {
            return setVisibleId(Number(index));
          }
        });
      },
      {
        threshold: window.innerWidth >= 768 ? 1 : 0.5,
        rootMargin: '-10% 0px',
      },
    );

    if (projectsWrapper) {
      Array.from(projectsWrapper?.children).forEach((el) => {
        fadeInObserver.observe(el);
        focusObserver.observe(el);
      });
    }

    return () => {
      if (projectsWrapper) {
        Array.from(projectsWrapper?.children).forEach((el) => {
          fadeInObserver.unobserve(el);
          focusObserver.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section className=" bg-secondary-bg pt-9 md:pt-20" id="projects">
      <h2 className="px-mobile text-3xl font-bold md:text-4xl xl:px-desktop xl:text-5xl" ref={headerRef}>
        {t(['header'])}
        <span className="text-secondary">.</span>
      </h2>
      <div className="relative mt-20 flex flex-col" ref={projectsWrapperRef}>
        {t(['projects'], { returnObjects: true }).map((data, index) => (
          <Project content={data} isVisible={visibleId === index} key={index} id={index} />
        ))}
        <div className="absolute right-0 top-0 flex h-full w-full items-end justify-end">
          <div className="sticky bottom-4 flex w-full max-w-[500px] justify-end overflow-hidden xl:w-[45%] xl:max-w-[700px]">
            <div className="relative w-full after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-tr after:from-secondary-bg after:to-secondary-bg/30 after:content-['']">
              <Star className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

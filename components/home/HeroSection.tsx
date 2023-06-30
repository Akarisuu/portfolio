import Lines from 'public/backgroundLines/heroLines.svg';
import Arrow from 'public/icons/arrow.svg';
import { useEffect, useRef } from 'react';
import gsap, { Power2 } from 'gsap';
import { useIntersectRouter } from 'hooks/useIntersectRouter';
import { useTranslation } from 'next-i18next';

export default function HeroSection() {
  const { t } = useTranslation(['hero']);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const backTextRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useIntersectRouter(headerRef, '/#home');

  useEffect(() => {
    const tl = gsap.timeline();

    const linesSVG = document.querySelector('#lines');
    const lines = linesSVG?.children;

    tl.fromTo(
      headerRef.current,
      { opacity: 0, translateY: '-10%' },
      {
        opacity: 1,
        translateY: 0,
        duration: 0.6,
        ease: Power2.easeOut,
        delay: 1,
      },
    );
    tl.fromTo(
      descRef.current,
      { opacity: 0, translateY: '-10%' },
      { opacity: 1, translateY: 0, duration: 0.6, ease: Power2.easeOut },
      '-=0.2',
    );
    if (lines) {
      Array.from(lines).forEach((el) => {
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: Power2.easeOut }, '-=0.4');
      });
    }
    tl.fromTo(
      scrollRef.current,
      { opacity: 0, translateY: '-18px' },
      { opacity: 1, translateY: 0, duration: 0.6, ease: Power2.easeOut },
      '-=0.2',
    );
    tl.fromTo(backTextRef.current, { opacity: 0 }, { opacity: 0.05, duration: 1, ease: Power2.easeOut }, '+=0.5');
  }, []);

  return (
    <section className="relative flex h-[90vh] flex-col md:h-[80vh] xl:h-[90vh]" id="home">
      <div className="absolute right-0 top-0 overflow-hidden after:absolute after:right-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-tr after:from-primary-bg after:to-primary-bg/20 after:content-['']">
        <Lines className="h-[500px] w-auto translate-x-[20%] md:h-[50vh] md:translate-x-0 xl:h-[75vh]" id="lines" />
      </div>
      <div className="z-[10] mb-6 mt-36 flex h-full flex-col px-mobile xl:mt-48 xl:px-desktop">
        <div className="relative">
          <h1
            className="whitespace-pre-wrap text-center text-3xl font-bold md:text-left md:text-4xl xl:text-5xl"
            ref={headerRef}
          >
            {t(['header'])
              .split('#')
              .map((text, index) =>
                index % 2 === 0 ? (
                  text
                ) : (
                  <span className="text-primary" key={index}>
                    {text}
                  </span>
                ),
              )}
          </h1>
          <span
            className="absolute left-0 top-0 z-[-1] hidden -translate-x-6 -translate-y-1/2 font-header text-[100px] font-bold leading-[150px] opacity-5 md:block xl:-translate-x-12 xl:text-[130px]"
            ref={backTextRef}
          >
            {t(['backText'])}
          </span>
          <p
            className="mt-4 text-justify text-sm md:mt-10 md:w-[60%] md:text-base xl:w-[50%] xl:min-w-[600px]"
            ref={descRef}
          >
            {t(['description'])}
          </p>
        </div>
        <div className="mt-auto flex items-center text-primary md:mb-8" ref={scrollRef}>
          <span className="mr-3 font-header font-bold uppercase xl:text-xl">{t(['scrollHint'])}</span>
          <Arrow className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

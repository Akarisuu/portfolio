import Lines from "public/heroLines.svg";
import Arrow from "public/icons/arrow.svg";
import { heroContent } from "utils/types";
import { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";
import intersectRouter from "hooks/intersectRouter";

export default function Hero({ content }: { content: heroContent }) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const backTextRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    const linesSVG = document.querySelector("#lines");
    const lines = linesSVG?.children;

    tl.fromTo(
      headerRef.current,
      { opacity: 0, translateY: "-10%" },
      {
        opacity: 1,
        translateY: 0,
        duration: 0.6,
        ease: Power2.easeOut,
        delay: 1,
      }
    );
    tl.fromTo(
      descRef.current,
      { opacity: 0, translateY: "-10%" },
      { opacity: 1, translateY: 0, duration: 0.6, ease: Power2.easeOut },
      "-=0.2"
    );
    if (lines) {
      Array.from(lines).forEach((el) => {
        tl.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: Power2.easeOut },
          "-=0.4"
        );
      });
    }
    tl.fromTo(
      scrollRef.current,
      { opacity: 0, translateY: "-18px" },
      { opacity: 1, translateY: 0, duration: 0.6, ease: Power2.easeOut },
      "-=0.2"
    );
    tl.fromTo(
      backTextRef.current,
      { opacity: 0 },
      { opacity: 0.05, duration: 1, ease: Power2.easeOut },
      "+=0.5"
    );
  }, []);

  intersectRouter(headerRef, "/#home");

  return (
    <section
      className="flex flex-col relative h-[90vh] md:h-[80vh] xl:h-[90vh]"
      id="home"
    >
      <div className="absolute top-0 right-0 after:content-[''] overflow-hidden after:absolute after:right-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-tr after:from-primaryBackground after:to-primaryBackground/20">
        <Lines
          className="h-[500px] w-auto translate-x-[20%] md:h-[50vh] md:translate-x-0 xl:h-[75vh]"
          id="lines"
        />
      </div>
      <div className="z-[10] mt-36 mb-6 px-mobile flex flex-col h-full xl:px-desktop xl:mt-48">
        <div className="relative">
          <h1
            className="text-center whitespace-pre-wrap text-3xl font-bold md:text-left md:text-4xl xl:text-5xl"
            ref={headerRef}
          >
            {content.header.split("#").map((text, index) => {
              if (index % 2 === 0) return text;
              return (
                <span className="text-primary" key={index}>
                  {text}
                </span>
              );
            })}
          </h1>
          <span
            className="absolute text-[100px] top-0 left-0 leading-[150px] hidden -translate-y-1/2 -translate-x-6 z-[-1] font-header font-bold opacity-5 md:block xl:text-[130px] xl:-translate-x-12"
            ref={backTextRef}
          >
            {content.backText}
          </span>
          <p
            className="text-justify mt-4 text-sm md:mt-10 md:w-[60%] md:text-base xl:w-[50%] xl:min-w-[600px]"
            ref={descRef}
          >
            {content.description}
          </p>
        </div>
        <div
          className="mt-auto flex items-center text-primary md:mb-8"
          ref={scrollRef}
        >
          <span className="mr-3 uppercase font-header font-bold xl:text-xl">
            {content.scrollHint}
          </span>
          <Arrow className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

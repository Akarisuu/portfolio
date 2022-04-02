import LinesMobile from "public/heroLinesMobile.svg";
import Lines from "public/heroLines.svg";
import Arrow from "public/arrow.svg";
import { heroContent } from "utils/types";
import useWindowWidth from "hooks/useWindowWidth";

export default function Hero({ content }: { content: heroContent }) {
  const windowWidth = useWindowWidth();

  return (
    <section className="flex flex-col relative h-[90vh] md:h-[80vh]">
      <div className="absolute top-0 right-0 after:content-[''] after:absolute after:right-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-tr after:from-primaryBackground after:to-primaryBackground/20">
        {windowWidth >= 768 ? (
          <Lines className="h-[50vh] w-auto" />
        ) : (
          <LinesMobile className="h-[500px] w-auto" />
        )}
      </div>
      <div className="z-[10] mt-36 mb-6 px-mobile flex flex-col h-full">
        <div className="relative">
          <h1 className="text-center whitespace-pre-wrap text-3xl font-bold md:text-left md:text-4xl">
            {content.header.split("#").map((text, index) => {
              if (index % 2 === 0) return text;
              return <span className="text-primary">{text}</span>;
            })}
          </h1>
          <span className="absolute text-[100px] top-0 left-0 leading-[150px] hidden -translate-y-1/2 -translate-x-6 z-[-1] font-header font-bold opacity-5 md:block">
            {content.backText}
          </span>
          <p className="text-justify mt-4 text-sm md:mt-10 md:w-[60%] md:text-base">
            {content.description}
          </p>
        </div>
        <div className="mt-auto flex items-center text-primary md:mb-8">
          <span className="mr-3 uppercase font-header font-bold">
            {content.scrollHint}
          </span>
          <Arrow />
        </div>
      </div>
    </section>
  );
}

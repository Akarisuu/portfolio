import LinesMobile from "public/heroLinesMobile.svg";
import Arrow from "public/arrow.svg";
import { heroContent } from "utils/types";

export default function Hero({ content }: { content: heroContent }) {
  return (
    <div className="flex flex-col relative h-screen">
      <div className="absolute top-0 right-0 after:content-[''] after:absolute after:right-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-tr after:from-primaryBackground after:to-primaryBackground/20">
        <LinesMobile className="h-[500px] w-auto" />
      </div>
      <div className="z-[10] mt-36 mb-6 px-mobile flex flex-col h-full">
        <div className="relative">
          <h1 className="text-center whitespace-pre-wrap text-3xl font-bold">
            {content.header.split("#").map((text, index) => {
              if (index % 2 === 0) return text;
              return <span className="text-primary">{text}</span>;
            })}
          </h1>
          <span className="absolute text-[150px] top-0 left-0 leading-[150px] hidden">
            {content.backText}
          </span>
          <p className="text-justify mt-4 text-sm">{content.description}</p>
        </div>
        <div className="mt-auto flex items-center text-primary">
          <span className="mr-3 uppercase font-header font-bold">
            {content.scrollHint}
          </span>
          <Arrow />
        </div>
      </div>
    </div>
  );
}

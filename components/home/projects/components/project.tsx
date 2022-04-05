import { singleProject } from "utils/types";
import Image from "next/image";
import IconLink from "./iconLink";
import Github from "public/icons/github.svg";
import LinkIcon from "public/icons/link.svg";

export default function Project({
  content,
  index,
  visibleId,
}: {
  content: singleProject;
  index: number;
  visibleId: number | null;
}) {
  const { name, employer, image, description, technologies, links } = content;

  return (
    <div
      className="flex flex-col mt-20 first:mt-0 z-10 transition-opacity duration-500 opacity-0 px-mobile md:flex-row md:items-center xl:px-desktop xl:justify-between"
      key={index}
      data-key={index}
    >
      <div className="relative w-full h-[57vw] md:w-1/2 md:h-[29vw] xl:w-[50%] xl:h-[42.5vh] shadow-lg">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className={`${
            visibleId === index ? "" : "saturate-0"
          } transition-all duration-300`}
        />
        <span
          className={`absolute w-full h-full opacity-30 top-0 left-0 transition-all duration-300 ${
            visibleId === index ? "" : "bg-secondary"
          }`}
        ></span>
      </div>
      <div className="mt-6 flex flex-col md:w-1/2 md:relative md:right-0 md:items-end xl:w-[50%]">
        <h4 className="text-xl font-bold text-secondary md:text-2xl">
          <span className="text-sm font-normal text-primaryText">
            {employer.pre}
          </span>{" "}
          {employer.name}
        </h4>
        <h3 className="text-xl font-bold md:text-2xl">{name}</h3>
        <p className="mt-2 px-5 py-6 rounded text-sm text-justify drop-shadow-md bg-primaryBackground md:w-[400px] md:min-w-[95%]">
          {description}
        </p>
        <div className="flex mt-6 text-xs font-light md:text-sm">
          {technologies.map((el, i) => (
            <span className="mr-6 last:mr-0" key={i}>
              {el}
            </span>
          ))}
        </div>
        <div className="flex mt-3">
          {links.external && <IconLink Icon={LinkIcon} href={links.external} />}
          {links.github && <IconLink Icon={Github} href={links.github} />}
        </div>
      </div>
    </div>
  );
}

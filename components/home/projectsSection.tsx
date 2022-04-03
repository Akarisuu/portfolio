import { projectsContent } from "utils/types";
import Image from "next/image";
import Github from "public/icons/github.svg";
import LinkIcon from "public/icons/link.svg";
import Star from "public/star.svg";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function IconLink({ Icon, href }: { Icon: any; href: string }) {
  return (
    <Link href={href} passHref>
      <a className="mr-2 last:mr-0" target="_blank">
        <Icon className="w-7 h-7 iconLink hover:iconSecondary" />
      </a>
    </Link>
  );
}

export default function ProjectsSection({
  content,
}: {
  content: projectsContent;
}) {
  const projectsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    if (projectsWrapperRef.current) {
      Array.from(projectsWrapperRef.current?.children).forEach((el) => {
        observer.observe(el);
      });
    }
  }, []);

  return (
    <section className=" bg-secondaryBackground pt-9 md:pt-20">
      <h2 className="font-bold text-3xl px-mobile md:text-4xl xl:px-desktop xl:text-5xl">
        {content.header}
        <span className="text-secondary">.</span>
      </h2>
      <div className="flex flex-col mt-20 relative" ref={projectsWrapperRef}>
        {content.projects.map(
          ({ name, employer, image, description, technologies, links }) => (
            <div className="flex flex-col mt-20 first:mt-0 z-10 transition-opacity duration-500 opacity-0 px-mobile md:flex-row md:items-center xl:px-desktop xl:justify-between">
              <div className="relative w-full h-[57vw] md:w-1/2 md:h-[29vw] xl:w-[50%] xl:h-[42.5vh] shadow-lg hover:projectImage">
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="saturate-0 transition-all duration-300"
                />
                <span className="absolute w-full h-full bg-secondary opacity-30 top-0 left-0 transition-all duration-300"></span>
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
                  {technologies.map((el) => (
                    <span className="mr-6 last:mr-0">{el}</span>
                  ))}
                </div>
                <div className="flex mt-3">
                  {links.external && (
                    <IconLink Icon={LinkIcon} href={links.external} />
                  )}
                  {links.github && (
                    <IconLink Icon={Github} href={links.github} />
                  )}
                </div>
              </div>
            </div>
          )
        )}
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

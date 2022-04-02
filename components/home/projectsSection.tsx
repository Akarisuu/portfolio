import { projectsContent } from "utils/types";
import Image from "next/image";
import Github from "public/icons/github.svg";
import LinkIcon from "public/icons/link.svg";
import Star from "public/star.svg";
import Link from "next/link";

function IconLink({ Icon, href }: { Icon: any; href: string }) {
  return (
    <Link href={href} passHref>
      <a className="mr-2 last:mr-0" target="_blank">
        <Icon className="w-7 h-7" />
      </a>
    </Link>
  );
}

export default function ProjectsSection({
  content,
}: {
  content: projectsContent;
}) {
  return (
    <section className=" bg-secondaryBackground pt-9 md:pt-20">
      <h2 className="font-bold text-3xl px-mobile md:text-4xl">
        {content.header}
        <span className="text-secondary">.</span>
      </h2>
      <div className="flex flex-col mt-20 relative">
        {content.projects.map(
          ({ name, employer, image, description, technologies, links }) => (
            <div className="flex flex-col mt-20 first:mt-0 z-10 px-mobile md:flex-row md:items-center">
              <div className="relative w-full h-[57vw] md:w-1/2 md:h-[29vw]">
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="saturate-0"
                />
                <span className="absolute w-full h-full bg-secondary opacity-30 top-0 left-0"></span>
              </div>
              <div className="mt-6 flex flex-col md:w-1/2 md:relative md:right-0 md:items-end">
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
          <div className="w-full max-w-[500px] sticky bottom-0 overflow-hidden flex justify-end">
            <div className="w-full max-w-[500px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-tr after:from-secondaryBackground after:to-secondaryBackground/30">
              <Star className="w-full translate-x-[10%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

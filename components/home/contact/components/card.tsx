import { contactContent } from "utils/types";
import Github from "public/icons/github.svg";
import Email from "public/icons/email.svg";
import Linkedin from "public/icons/linkedin.svg";
import MediaLink from "./mediaLink";

export default function ContactCard({
  content,
}: {
  content: contactContent["others"];
}) {
  return (
    <div className="mt-14 px-4 pt-10 pb-5 bg-gradient-to-b from-tertiary/10 to-tertiary min-h-[450px] flex flex-col rounded-md xl:px-5 xl:mt-0 xl:w-full xl:row-start-1 xl:row-end-4 xl:col-start-3">
      <h3 className="font-bold text-2xl mb-8">{content.header}</h3>
      <p className="text-sm">{content.description}</p>
      <div className="flex flex-col mt-auto border-t-2">
        {content.links.github && (
          <MediaLink
            Icon={Github}
            href={content.links.github.href}
            text={content.links.github.text}
          />
        )}
        {content.links.linkedin && (
          <MediaLink
            Icon={Linkedin}
            href={content.links.linkedin.href}
            text={content.links.linkedin.text}
          />
        )}
        {content.links.email && (
          <MediaLink
            Icon={Email}
            href={content.links.email.href}
            text={content.links.email.text}
          />
        )}
      </div>
    </div>
  );
}

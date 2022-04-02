import Link from "next/link";
import { useState } from "react";
import { contactContent } from "utils/types";
import Github from "public/icons/github.svg";
import Email from "public/icons/email.svg";
import Linkedin from "public/icons/linkedin.svg";
import DoubleArrow from "public/icons/doubleArrow.svg";

function MediaLink({
  href,
  Icon,
  text,
}: {
  href: string;
  Icon: any;
  text: string;
}) {
  return (
    <Link href={href} passHref>
      <a className="first:mt-4 mt-2 flex items-center" target="_blank">
        <Icon className="w-6 h-6 mr-3" />
        <span>{text}</span>
      </a>
    </Link>
  );
}

export default function ContactSection({
  content,
}: {
  content: contactContent;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  return (
    <section className="bg-secondaryBackground flex flex-col px-mobile pt-32 pb-28 xl:px-desktop">
      <h2 className="font-bold text-3xl">
        {content.header}
        <span className="text-tertiary">.</span>
      </h2>
      <div className="flex flex-col mt-12 xl:flex-row xl:justify-between">
        <form className="flex flex-col xl:w-[62.5%] xl:grid xl:grid-cols-2 xl:row-auto">
          <div className="first:mt-0 relative xl:w-[95%]">
            <input
              type="text"
              placeholder={content.form.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input peer"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
          </div>
          <div className="mt-3 relative xl:mt-0 xl:w-[95%] xl:justify-self-end">
            <input
              type="email"
              placeholder={content.form.email}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input peer"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
          </div>
          <div className="mt-3 relative xl:col-span-full">
            <input
              type="text"
              placeholder={content.form.topic}
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="input peer"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
          </div>
          <div className="mt-3 relative flex xl:col-span-full">
            <textarea
              placeholder={content.form.message}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input peer resize-none h-[250px]"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
          </div>
          <button
            type="submit"
            className="bg-tertiary self-start mt-7 px-4 py-2 flex items-center rounded-md font-bold xl:justify-self-start"
          >
            {content.form.submit}
            <DoubleArrow className="ml-5 h-3 w-3" />
          </button>
        </form>
        <div className="mt-14 px-4 pt-10 pb-5 bg-gradient-to-b from-tertiary/10 to-tertiary min-h-[450px] flex flex-col rounded-md xl:mt-0 xl:w-1/3">
          <h3 className="font-bold text-2xl mb-8">{content.others.header}</h3>
          <p className="text-sm">{content.others.description}</p>
          <div className="flex flex-col mt-auto border-t-2">
            {content.others.links.github && (
              <MediaLink
                Icon={Github}
                href={content.others.links.github.href}
                text={content.others.links.github.text}
              />
            )}
            {content.others.links.linkedin && (
              <MediaLink
                Icon={Linkedin}
                href={content.others.links.linkedin.href}
                text={content.others.links.linkedin.text}
              />
            )}
            {content.others.links.email && (
              <MediaLink
                Icon={Email}
                href={content.others.links.email.href}
                text={content.others.links.email.text}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

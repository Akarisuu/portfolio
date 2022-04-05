import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { contactContent } from "utils/types";
import ContactLines from "public/contactLines.svg";

import intersectRouter from "hooks/intersectRouter";
import ContactForm from "./components/form";

export default function ContactSection({
  content,
}: {
  content: contactContent;
}) {
  const headerRef = useRef<HTMLHeadingElement>(null);

  intersectRouter(headerRef, "/#contact");

  return (
    <section
      className="bg-secondaryBackground flex flex-col px-mobile pt-32 pb-24 relative xl:px-desktop xl:pb-44"
      id="contact"
    >
      <div className="absolute left-0 bottom-0 w-[50%] translate-y-[5%] hidden xl:block after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-tr after:from-secondaryBackground/10 after:to-secondaryBackground">
        <ContactLines />
      </div>
      <h2 className="font-bold text-3xl xl:text-5xl" ref={headerRef}>
        {content.header}
        <span className="text-tertiary">.</span>
      </h2>
      <ContactForm content={content.form} cardContent={content.others} />
    </section>
  );
}

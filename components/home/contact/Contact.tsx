import { useRef } from 'react';
import ContactLines from 'public/backgroundLines/contactLines.svg';
import { useIntersectRouter } from 'hooks/useIntersectRouter';
import ContactForm from './components/form/Form';
import { useTranslation } from 'next-i18next';

export default function ContactSection() {
  const { t } = useTranslation('contact');

  const headerRef = useRef<HTMLHeadingElement>(null);

  useIntersectRouter(headerRef, '/#contact');

  return (
    <section
      className="relative flex flex-col bg-secondary-bg px-mobile pb-24 pt-32 xl:px-desktop xl:pb-44"
      id="contact"
    >
      <div className="absolute bottom-0 left-0 hidden w-[50%] translate-y-[5%] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-tr after:from-secondary-bg/10 after:to-secondary-bg xl:block">
        <ContactLines />
      </div>
      <h2 className="text-3xl font-bold xl:text-5xl" ref={headerRef}>
        {t(['header'])}
        <span className="text-tertiary">.</span>
      </h2>
      <ContactForm />
    </section>
  );
}

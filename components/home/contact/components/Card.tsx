import Github from 'public/icons/github.svg';
import Email from 'public/icons/email.svg';
import Linkedin from 'public/icons/linkedin.svg';
import MediaLink from './mediaLink/MediaLink';
import { useTranslation } from 'next-i18next';

export default function ContactCard() {
  const { t } = useTranslation('contact');

  return (
    <div className="mt-14 flex min-h-[450px] flex-col rounded-md bg-gradient-to-b from-tertiary/10 to-tertiary px-4 pt-10 pb-5 xl:col-start-3 xl:row-start-1 xl:row-end-4 xl:mt-0 xl:w-full xl:px-5">
      <h3 className="mb-8 text-2xl font-bold">{t(['others.header'])}</h3>
      <p className="text-sm">{t(['others.description'])}</p>
      <div className="mt-auto flex flex-col border-t-2">
        <MediaLink Icon={Github} href={t(['others.links.github.href'])} text={t(['others.links.github.text'])} />
        <MediaLink Icon={Linkedin} href={t(['others.links.linkedin.href'])} text={t(['others.links.linkedin.text'])} />
        <MediaLink Icon={Email} href={t(['others.links.email.href'])} text={t(['others.links.email.text'])} />
      </div>
    </div>
  );
}

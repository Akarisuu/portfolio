import Image from 'next/image';
import LinkIcon from 'public/icons/link.svg';
import { useTranslation } from 'next-i18next';
import { ProjectProps } from './Project.types';
import LinkedProjectTitle from '../linkedProjectTitle/LinkedProjectTitle';

export default function Project({ content, isVisible, id }: ProjectProps) {
  const { t } = useTranslation('projects');
  const { name, employer, image, description, technologies, link } = content;

  return (
    <div
      data-key={id}
      className="z-10 mt-20 flex flex-col px-mobile opacity-0 transition-opacity duration-500 first:mt-0 md:flex-row md:items-center md:gap-6 xl:justify-between xl:px-desktop"
    >
      <div className="relative h-[57vw] w-full shadow-lg md:h-[29vw] md:w-1/2 xl:h-[42.5vh] xl:w-[50%]">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className={`${!isVisible && 'saturate-0'} rounded-md transition-all duration-300`}
        />
        <span
          className={`absolute left-0 top-0 h-full w-full rounded-md opacity-30 transition-all duration-300 ${
            !isVisible && 'bg-secondary'
          }`}
        />
      </div>
      <div className="mt-6 flex flex-col md:relative md:right-0 md:w-[400px] md:items-start xl:w-[50%]">
        <LinkedProjectTitle Icon={LinkIcon} title={name} href={link} />
        <h4 className="text-xl font-bold text-secondary md:text-xl">
          <span className="text-sm font-normal text-primary-text">{t(['pre'])}</span> {employer}
        </h4>
        <p className="mt-2 rounded bg-primary-bg px-4 py-6 text-justify text-sm drop-shadow-md md:min-w-[95%]">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-light md:text-sm">
          {technologies.map((el, i) => (
            <>
              <span key={i}>{el}</span>
              {i !== technologies.length - 1 && <span className="text-primary-text">|</span>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

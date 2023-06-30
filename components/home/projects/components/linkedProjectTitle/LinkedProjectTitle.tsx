import Link from 'next/link';
import { LinkedProjectTitleProps, ProjectTitleProps } from './LinkedProjectTitle.types';

const ProjectTitle = ({ title }: ProjectTitleProps) => {
  return (
    <h3 className="text-xl font-bold leading-5 transition-colors duration-300 group-hover:text-zinc-300 md:text-2xl md:leading-6">
      {title}
    </h3>
  );
};

export default function LinkedProjectTitle({ Icon, href, title }: LinkedProjectTitleProps) {
  if (!href) {
    return <ProjectTitle title={title} />;
  }

  return (
    <Link href={href} passHref>
      <a target="_blank" className="group flex items-center gap-2">
        <ProjectTitle title={title} />
        <Icon className="h-5 w-5 group-hover:[&>path]:fill-zinc-300 group-hover:[&>path]:transition-colors group-hover:[&>path]:duration-300" />
      </a>
    </Link>
  );
}

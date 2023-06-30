import Link from 'next/link';
import { MediaLinkProps } from './MediaLink.types';

export default function MediaLink({ href, Icon, text }: MediaLinkProps) {
  return (
    <Link href={href} passHref>
      <a
        className="mt-2 flex items-center transition-colors duration-300 first:mt-4 hover:text-secondary-bg [&>path]:transition-colors [&>path]:duration-300"
        target="_blank"
      >
        <Icon className="mr-3 h-6 w-6" />
        <span>{text}</span>
      </a>
    </Link>
  );
}

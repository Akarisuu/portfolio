import Link from "next/link";

export default function MediaLink({
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
      <a
        className="first:mt-4 mt-2 flex items-center transition-colors mediaLink hover:mediaLinkToDark"
        target="_blank"
      >
        <Icon className="w-6 h-6 mr-3" />
        <span>{text}</span>
      </a>
    </Link>
  );
}

import Link from "next/link";

export default function IconLink({ Icon, href }: { Icon: any; href: string }) {
  return (
    <Link href={href} passHref>
      <a className="mr-2 last:mr-0" target="_blank">
        <Icon className="w-7 h-7 iconLink hover:iconSecondary" />
      </a>
    </Link>
  );
}

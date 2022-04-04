import Link from "next/link";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/#projects",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function Navbar() {
  return (
    <nav className="flex fixed top-0 px-mobile justify-center w-full z-50 py-5 bg-gradient-to-b from-primaryBackground font-header font-bold text-lg to-transparent">
      {links.map(({ label, href }, index) => (
        <Link href={href} passHref scroll={false}>
          <a
            className={`first:ml-0 ml-10 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 ${
              index === 0
                ? "after:bg-primary"
                : index === 1
                ? "after:bg-secondary"
                : "after:bg-tertiary"
            }`}
          >
            {label}
          </a>
        </Link>
      ))}
    </nav>
  );
}

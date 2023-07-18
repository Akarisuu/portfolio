import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Locales } from 'utils/consts';

const UNDERLINE_BACKGROUND_COLORS = ['after:bg-primary', 'after:bg-secondary', 'after:bg-tertiary'];

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation();

  const navbarItems = t(['navbar'], { returnObjects: true }) ?? [];

  return (
    <nav className=" fixed top-0 z-50 flex w-full justify-center bg-gradient-to-b from-primary-bg to-transparent px-mobile py-5 font-header text-lg font-bold xl:justify-start xl:px-[10%] xl:py-7">
      {navbarItems.map(({ label, href }, index) => {
        return (
          <Link href={href} passHref scroll={false} key={index}>
            <a
              className={`relative ml-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 first:ml-0 hover:after:w-full ${
                UNDERLINE_BACKGROUND_COLORS[index % UNDERLINE_BACKGROUND_COLORS.length]
              } xl:ml-16`}
            >
              {label}
            </a>
          </Link>
        );
      })}
      <div className="ml-auto">
        <Link
          locale={router.locale === Locales.PL ? Locales.EN : Locales.PL}
          href="?"
          as={router.pathname}
          scroll={false}
        >
          {router.locale === Locales.PL ? Locales.EN.toUpperCase() : Locales.PL.toUpperCase()}
        </Link>
      </div>
    </nav>
  );
}

import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useRef } from "react";
import { navbarElement } from "utils/types";

export default function Navbar({ content }: { content?: navbarElement[] }) {
  const router = useRouter();
  const isAnimatingRef = useRef<any>(false);
  const tl = gsap.timeline();

  function handleClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const circle = e.currentTarget.querySelector("div") as HTMLDivElement;
    const mainHeader = circle.firstChild;
    const secondHeader = circle.lastChild;

    document.body.style.overflow = "hidden";

    tl.fromTo(
      circle,
      { width: 0, height: 0, marginLeft: 0 },
      {
        height: window.innerWidth < 1280 ? "300vh" : "300vw",
        width: window.innerWidth < 1280 ? "300vh" : "300vw",
        marginLeft: window.innerWidth < 1280 ? "-150vh" : "-150vw",
        duration: 1,
      }
    );
    tl.fromTo(
      mainHeader,
      { translateX: "-32px", display: "block" },
      { opacity: 1, translateX: 0, duration: 1 }
    );
    tl.fromTo(
      secondHeader,
      { display: "block" },
      { opacity: 0.2, duration: 1 },
      "-=0.5"
    );
    tl.to(
      [mainHeader, secondHeader],
      { opacity: 0, display: "none", duration: 0.5 },
      "+=1"
    );
    tl.to(
      circle,
      { width: 0, height: 0, marginLeft: 0, duration: 0.5 },
      "-=0.3"
    );
    setTimeout(() => {
      router.push(href, undefined, { shallow: true, scroll: false });

      document.body.style.overflow = "visible";
      isAnimatingRef.current = false;
    }, 3400);
  }

  return (
    <nav className="flex fixed top-0 px-mobile justify-center w-full z-50 py-5 bg-gradient-to-b from-primaryBackground font-header font-bold text-lg to-transparent xl:justify-start xl:py-7 xl:px-[10%]">
      {content &&
        content.map(({ label, href }, index) => {
          const bgColor =
            index === 0
              ? "bg-primary"
              : index === 1
              ? "bg-secondary"
              : "bg-tertiary";

          const afterBgColor =
            index === 0
              ? "after:bg-primary"
              : index === 1
              ? "after:bg-secondary"
              : "after:bg-tertiary";

          return (
            <Link href={href} passHref scroll={false} key={index}>
              <a
                className={`first:ml-0 ml-5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:transition-all after:duration-300 hover:after:w-full after:h-0.5 ${afterBgColor} xl:ml-16`}
                onClick={(e) => handleClick(e, href)}
              >
                {label}
                <div
                  className={`absolute w-0 h-0 left-1/2 z-[100] top-0 bottom-0 my-auto rounded-full ${bgColor} overflow-hidden cursor-default`}
                >
                  <span className="fixed top-[20%] left-[10%] text-5xl font-base opacity-0 hidden xl:text-[170px]">
                    {label}
                  </span>
                  <span className="fixed top-[5%] left-[20%] rotate-90 origin-bottom-left text-[130px] font-base opacity-0 hidden xl:text-[250px] xl:left-[10%]">
                    {label}
                  </span>
                </div>
              </a>
            </Link>
          );
        })}
      <div className="ml-auto">
        <Link
          locale={router.locale === "pl" ? "en" : "pl"}
          href="?"
          as={router.pathname}
          scroll={false}
        >
          <a>{router.locale === "pl" ? "EN" : "PL"}</a>
        </Link>
      </div>
    </nav>
  );
}

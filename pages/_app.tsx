import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Footer from "components/shared/footer";
import Navbar from "components/shared/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { navbarElement } from "utils/types";

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [navbarContent, setNavbarContent] = useState<
    navbarElement[] | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const navbarContent = (await import(`data/${locale}/global.json`)).default
        .navbar;

      setNavbarContent(navbarContent);
    })();
  }, [locale]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar content={navbarContent} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

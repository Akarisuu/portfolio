import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Footer from 'components/shared/Footer';
import Navbar from 'components/shared/Navbar';
import { appWithTranslation } from 'next-i18next';
import { AlertContextController } from 'context/alertContext/alertContextController/AlertContextController';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <Navbar />
      <AlertContextController>
        <Component {...pageProps} />
      </AlertContextController>
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);

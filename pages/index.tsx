import ContactSection from 'components/home/contact/Contact';
import HeroSection from 'components/home/HeroSection';
import ProjectsSection from 'components/home/projects/Projects';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t(['metadata.title'])}</title>
        <meta name="description" content={t(['metadata.description'])} />
        <meta property="og:title" content={t(['metadata.title'])} />
        <meta property="og:description" content={t(['metadata.description'])} />
        <meta property="og:type" content={t(['metadata.type'])} />
      </Head>
      <main>
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ['global', 'hero', 'projects', 'contact']);

  return {
    props: {
      ...translations,
    },
    revalidate: 60,
  };
};

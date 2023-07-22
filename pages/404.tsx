import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  const translations = await serverSideTranslations(locale ?? defaultLocale ?? '', ['global']);

  return {
    props: {
      ...translations,
    },
  };
};

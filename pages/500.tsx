import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  const translations = await serverSideTranslations(locale ?? defaultLocale ?? '', ['global']);

  return {
    props: {
      ...translations,
    },
  };
};

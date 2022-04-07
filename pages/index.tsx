import ContactSection from "components/home/contact/main";
import Hero from "components/home/heroSection";
import ProjectsSection from "components/home/projects/main";
import Head from "next/head";
import {
  contactContent,
  heroContent,
  metadata,
  projectsContent,
} from "utils/types";

export default function Home({
  heroContent,
  projectsContent,
  contactContent,
  metadata,
}: {
  heroContent: heroContent;
  projectsContent: projectsContent;
  contactContent: contactContent;
  metadata: metadata;
}) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content={metadata.type} />
        <meta property="og:image" content={metadata.image} />
      </Head>
      <main>
        <Hero content={heroContent} />
        <ProjectsSection content={projectsContent} />
        <ContactSection content={contactContent} />
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const metadata = (await import(`/data/${locale}/global.json`)).default
    .metadata;
  const heroContent = (await import(`/data/${locale}/hero.json`)).default;
  const projectsContent = (await import(`/data/${locale}/projects.json`))
    .default;
  const contactContent = (await import(`/data/${locale}/contact.json`)).default;

  return {
    props: {
      heroContent,
      projectsContent,
      contactContent,
      metadata,
    },
    revalidate: 30,
  };
};

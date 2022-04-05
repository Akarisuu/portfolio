import ContactSection from "components/home/contact/main";
import Hero from "components/home/heroSection";
import ProjectsSection from "components/home/projects/main";
import fs from "fs";
import { contactContent, heroContent, projectsContent } from "utils/types";

export default function Home({
  heroContent,
  projectsContent,
  contactContent,
}: {
  heroContent: heroContent;
  projectsContent: projectsContent;
  contactContent: contactContent;
}) {
  return (
    <main>
      <Hero content={heroContent} />
      <ProjectsSection content={projectsContent} />
      <ContactSection content={contactContent} />
    </main>
  );
}

export const getStaticProps = () => {
  const stringHeroContent = fs
    .readFileSync(`${process.cwd()}/data/en/hero.json`)
    .toString();
  const stringProjectsContent = fs
    .readFileSync(`${process.cwd()}/data/en/projects.json`)
    .toString();
  const stringContactContent = fs
    .readFileSync(`${process.cwd()}/data/en/contact.json`)
    .toString();

  const heroContent = JSON.parse(stringHeroContent);
  const projectsContent = JSON.parse(stringProjectsContent);
  const contactContent = JSON.parse(stringContactContent);

  return {
    props: {
      heroContent,
      projectsContent,
      contactContent,
    },
  };
};

import Hero from "components/home/heroSection";
import ProjectsSection from "components/home/projectsSection";
import fs from "fs";
import { heroContent, projectsContent } from "utils/types";

export default function Home({
  heroContent,
  projectsContent,
}: {
  heroContent: heroContent;
  projectsContent: projectsContent;
}) {
  return (
    <main>
      <Hero content={heroContent} />
      <ProjectsSection content={projectsContent} />
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

  const heroContent = JSON.parse(stringHeroContent);
  const projectsContent = JSON.parse(stringProjectsContent);

  return {
    props: {
      heroContent,
      projectsContent,
    },
  };
};

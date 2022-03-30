import { projectsContent } from "utils/types";

export default function ProjectsSection({
  content,
}: {
  content: projectsContent;
}) {
  return (
    <section className="px-mobile">
      <h2>
        {content.header}
        <span className="text-secondary">.</span>
      </h2>
      <div className="flex flex-col">
        {content.projects.map(
          ({ name, employer, image, description, technologies, links }) => (
            <div></div>
          )
        )}
      </div>
    </section>
  );
}

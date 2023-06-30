type Project = {
  image: string;
  name: string;
  employer: string;
  description: string;
  technologies: string[];
  link?: string;
};

export type ProjectProps = {
  content: Project;
  id: number;
  isVisible: boolean;
};

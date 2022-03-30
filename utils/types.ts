export interface heroContent {
  header: string;
  backText: string;
  description: string;
  scrollHint: string;
}

export interface projectsContent {
  header: string;
  projects: [
    {
      image: string;
      employer: {
        pre: string;
        name: string;
      };
      name: string;
      description: string;
      technologies: string[];
      links: {
        github?: string;
        external?: string;
      };
    }
  ];
}

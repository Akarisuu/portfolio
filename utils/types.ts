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

interface link {
  href: string;
  text: string;
}

export interface contactContent {
  header: string;
  form: {
    name: string;
    email: string;
    topic: string;
    message: string;
    submit: string;
  };
  others: {
    header: string;
    description: string;
    links: {
      github?: link;
      linkedin?: link;
      email?: link;
    };
  };
}

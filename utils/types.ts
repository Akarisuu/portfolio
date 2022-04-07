export interface heroContent {
  header: string;
  backText: string;
  description: string;
  scrollHint: string;
}

export interface singleProject {
  image: string;
  employer: string;
  name: string;
  description: string;
  technologies: string[];
  links: {
    github?: string;
    external?: string;
  };
}

export interface projectsContent {
  header: string;
  pre: string;
  projects: singleProject[];
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
    submit: {
      base: string;
      pending: string;
    };
    alert: {
      success: string;
      error: string;
    };
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

export interface alert {
  status: null | "success" | "error";
  message: null | string;
  visible: boolean;
}

export interface navbarElement {
  label: string;
  href: string;
}

export interface metadata {
  title: string;
  description: string;
  type: string;
  image: string;
}

export interface globalContent {
  metadata: metadata;
  navbar: navbarElement[];
}

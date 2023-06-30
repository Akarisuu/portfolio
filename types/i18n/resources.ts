import global from 'public/locales/en/global.json';
import hero from 'public/locales/en/hero.json';
import projects from 'public/locales/en/projects.json';
import contact from 'public/locales/en/contact.json';

export const translationResources = {
  global,
  hero,
  projects,
  contact,
} as const;

export type I18nResources = typeof translationResources;
export type I18nNamespaces = {
  [K in keyof I18nResources]: K;
};

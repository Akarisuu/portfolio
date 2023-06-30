import 'i18next';
import { I18nNamespaces, I18nResources } from './resources.js';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: I18nNamespaces['global'];
    resources: I18nResources;
  }
}

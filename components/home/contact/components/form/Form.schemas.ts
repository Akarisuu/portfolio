import { object, string } from 'zod';

export const ContactFormSchema = object({
  name: string(),
  email: string().email(),
  topic: string(),
  message: string(),
});

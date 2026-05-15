import { z } from 'zod';

export const articleUrlSchema = z.object({
  url: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL')
    .refine(
      url => url.startsWith('http://') || url.startsWith('https://'),
      'URL must start with http:// or https://'
    ),
});

export type ArticleUrlInput = z.infer<typeof articleUrlSchema>;

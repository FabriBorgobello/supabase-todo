import { z } from 'zod';

export const configSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export const config: Config = configSchema.parse(import.meta.env);

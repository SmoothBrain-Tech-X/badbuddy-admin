import { z } from "zod";

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  play_level: z.string(),
  location: z.string(),
  bio: z.string(),
  avatar_url: z.string(),
});

export type UserSchemaType = z.infer<typeof userSchema>;

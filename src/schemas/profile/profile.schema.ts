import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  play_level: z.string(),
  location: z.string(),
  bio: z.string(),
  avatar_url: z.string(),
});
export type ProfileSchemaType = z.infer<typeof profileSchema>;

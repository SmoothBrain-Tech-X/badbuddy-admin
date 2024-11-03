import { z } from "zod";

export const courtSchema = z.object({
  court_id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  price_per_hour: z.number(),
  status: z.string().optional(),
});

export type CourtSchemaType = z.infer<typeof courtSchema>;

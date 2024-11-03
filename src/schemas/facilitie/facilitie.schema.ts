import { z } from "zod";

export const facilitieSchema = z.object({
  facilitie_id: z.string().optional(),
  name: z.string(),
});

export type FacilitieSchemaType = z.infer<typeof facilitieSchema>;

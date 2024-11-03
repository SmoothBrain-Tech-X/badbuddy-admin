import { z } from "zod";

export const venueSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  open_time: z.string(),
  close_time: z.string(),
  image_urls: z.string(),
  status: z.string(),
});

export type VenueSchemaType = z.infer<typeof venueSchema>;

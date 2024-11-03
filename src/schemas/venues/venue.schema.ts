import { z } from "zod";

export const venueSchema = z.object({
  venue_id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  location: z.string(),
  phone: z.string(),
  email: z.string(),
  open_range: z
    .array(
      z.object({
        day: z.string().min(1),
        is_open: z.boolean(),
        open_time: z.string().min(1),
        close_time: z.string().min(1),
      }),
    )
    .min(1),
  image_urls: z.string(),
  facilities: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .min(1),
  rules: z.array(
    z.object({
      rule: z.string().min(1),
    }),
  ),
  status: z.string().optional(),
});

export type VenueSchemaType = z.infer<typeof venueSchema>;

import { z } from "zod";

export const updateRoleSchema = z.object({
  user_id: z.string(),
  role: z.string(),
});

export type UpdateRoleSchemaType = z.infer<typeof updateRoleSchema>;
import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  bio: z.string().trim().optional(),
});

export const updateAuthorSchema = createAuthorSchema;
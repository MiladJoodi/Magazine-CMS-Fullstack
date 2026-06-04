import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().min(1, "Description is required"),
  })
  .refine(
    (data) => data.name.trim() !== data.description.trim(),
    {
      message: "Description cannot be the same as name",
      path: ["description"],
    }
  );

export const updateCategorySchema = createCategorySchema;

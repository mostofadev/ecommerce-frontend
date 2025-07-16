import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  cta: z.string().optional(),
  cta_url: z.string().url("Must be a valid URL").optional(),
  status: z.boolean().default(true),
  image: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Image is required",
    }),
});

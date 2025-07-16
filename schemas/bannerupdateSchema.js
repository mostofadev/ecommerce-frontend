import { z } from "zod";

export const updateBannerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  cta: z.string().optional(),
  cta_url: z.string().url("Must be a valid URL").optional(),
  status: z.boolean().default(true),

  image: z
    .any()
    .refine(
      (file) => {
        // If no file, accept as optional (i.e., old image used)
        if (!file) return true;
        // If FileList or Array, allow empty or 1-file
        return file instanceof FileList
          ? file.length === 0 || file.length > 0
          : true;
      },
      { message: "Invalid image file." }
    )
    
    .optional(),
});

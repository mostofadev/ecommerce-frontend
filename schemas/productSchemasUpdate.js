import { z } from "zod";

export const productSchemaUpdate = z.object({
  name: z.string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),

  sku: z.string({ required_error: "SKU is required" })
    .min(1, "SKU is required")
    .max(100, "SKU must be less than 100 characters"),

  slug: z.string({ required_error: "Slug is required" })
    .min(1, "Slug is required")
    .max(255, "Slug must be less than 255 characters"),

  description: z.string({ required_error: "Description is required" })
    .min(1, "Description is required"),

  summary: z.string({ required_error: "Summary is required" })
    .min(1, "Summary is required"),

  price: z.coerce.number({ required_error: "Price is required" })
    .min(0, "Price must be at least 0"),

  original_price: z.coerce.number({ required_error: "Original price is required" })
    .min(0, "Original price must be at least 0"),

  discount_type: z.enum(["none", "fixed", "percentage"], {
    required_error: "Discount type is required"
  }),

  discount_value: z.coerce.number().min(0, "Discount must be at least 0").optional(),

  final_price: z.coerce.number().min(0, "Final price must be at least 0").optional(),

  quantity: z.coerce.number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .min(0, "Quantity must be at least 0"),

  brand_id: z.union([z.string(), z.number()], {
    required_error: "Brand is required"
  }),

  category_id: z.union([z.string(), z.number()], {
    required_error: "Category is required"
  }),

  sub_category_id: z.union([z.string(), z.number()]).optional(),

  status: z.enum(["active", "inactive"], {
    required_error: "Status is required"
  }),

  // ✅ Optional Thumbnail
  thumbnail: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "Thumbnail must be a file",
    })
    .refine((file) => !file || file?.type?.startsWith("image/"), {
      message: "Thumbnail must be an image",
    })
    .refine((file) => !file || file?.size <= 2 * 1024 * 1024, {
      message: "Image must be less than 2MB",
    }),

  // ✅ Optional Images
  images: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.length === 0 || files.every((file) => file instanceof File), {
      message: "All uploaded files must be valid files",
    })
    .refine((files) => !files || files.length === 0 || files.every((file) => file.type?.startsWith("image/")), {
      message: "All files must be images",
    })
    .refine((files) => !files || files.length === 0 || files.every((file) => file.size <= 2 * 1024 * 1024), {
      message: "Each image must be less than 2MB",
    }),

  // ✅ Optional Variant
  variants: z
    .array(z.object({
      color: z.string().max(100, "Color max 100 characters").optional(),
      size: z.string().max(100, "Size max 100 characters").optional(),
      quantity: z.coerce.number({ required_error: "Variant quantity is required" })
        .int("Must be an integer")
        .min(0, "Must be at least 0"),
    }))
    .optional(),

  meta_title: z.string({ required_error: "Meta title is required" })
    .min(1, "Meta title is required")
    .max(255, "Meta title max 255 characters"),

  meta_description: z.string({ required_error: "Meta description is required" })
    .min(1, "Meta description is required")
    .max(500, "Meta description max 500 characters"),

  meta_keyword: z.string({ required_error: "Meta keyword is required" })
    .min(1, "Meta keyword is required")
    .max(255, "Meta keyword max 255 characters"),

new_product: z.union([z.boolean(), z.number()]).optional(),
best_seller: z.union([z.boolean(), z.number()]).optional(),
});

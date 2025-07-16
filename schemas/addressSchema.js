import { z } from "zod";

// Optional text field (empty string converted to undefined)
const optionalText = (max, label) =>
  z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().max(max, `${label} must be at most ${max} characters`).optional()
  );

const optionalEmail = (max) =>
  z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email").max(max).optional()
  );

export const addressSchema = z.object({
  type: z.enum(["billing", "shipping"], {
    required_error: "Address type is required",
  }),

  label: optionalText(100, "Label"),

  name: z
    .string({ required_error: "Name is required" })
    .max(100, "Name must be at most 100 characters"),

  phone: z
    .string({ required_error: "Phone is required" })
    .max(20, "Phone must be at most 20 characters"),

  email: optionalEmail(100),

  country_code: z
    .string({ required_error: "Country code is required" })
    .max(10, "Country code must be at most 10 characters"),

  division_id: z
    .string({ required_error: "Division is required" })
    .min(1, "Division is required"),

  district_id: z
    .string({ required_error: "District is required" })
    .min(1, "District is required"),

  upazila_id: z
    .string({ required_error: "Upazila is required" })
    .min(1, "Upazila is required"),

  postal_code: optionalText(10, "Postal code"),

  street_address: z
    .string({ required_error: "Street address is required" })
    .min(1, "Street address is required"),

  landmark: optionalText(150, "Landmark"),

  is_default: z.boolean().optional(),
});

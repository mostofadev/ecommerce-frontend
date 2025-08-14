"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { toast } from "react-toastify";

import FormWrapper from "../../ui/form/FormWrapper";
import TextInput from "../../ui/form/input";
import FileInput from "../../ui/form/FileInput";
import FormButton from "../../ui/button/FormBtn";

import { useBrandContext } from "@/app/context/BrandContext";
import { showCustomToast } from "@/app/lib/showCustomToast";
import { useRouter } from "next/navigation";

// ✅ Zod Schema with Safe File Checks
const schema = z.object({
  name: z.string().min(1, "Brand name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 2 * 1024 * 1024, "Image must be under 2MB")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      "Unsupported file type"
    ),
});

// ✅ Slug Generator
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

export default function BrandForm() {
  const { CreateBrands, loading } = useBrandContext();
  const [preview, setPreview] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      image: null,
    },
  });

  const name = watch("name");

  // Auto-generate slug from name
  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug(name), { shouldValidate: true });
    }
  }, [name, setValue]);

  // Handle image input
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setValue("image", file, { shouldValidate: true });
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("image", data.image);

    try {
      const res = await CreateBrands(formData);
      reset();
      setPreview(null);
      if (res.status === true) {
        showCustomToast({
          title: "Brand created",
          message: "Brand created successfully!",
          type: "success",
        });
        router.push("/admin/brand");
      }
    } catch (error) {}
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Brand</h2>

      <TextInput
        label="Name"
        name="name"
        {...register("name")}
        error={errors.name?.message}
        placeholder="Enter Brand Name"
      />

      <TextInput
        label="Slug"
        name="slug"
        {...register("slug")}
        readOnly
        error={errors.slug?.message}
        placeholder="Auto-generated slug"
      />

      <FileInput
        label="Brand Image"
        name="image"
        register={register("image")}
        onChange={handleImageChange}
        error={errors.image?.message}
      />

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={100}
          height={100}
          className="w-24 h-24 object-cover rounded border mt-2"
        />
      )}

      <FormButton
        type="submit"
        loading={loading}
        disabled={!isValid}
        IsValid={isValid}
      >
        Create
      </FormButton>
    </FormWrapper>
  );
}

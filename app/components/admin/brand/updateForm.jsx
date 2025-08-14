"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormWrapper from "../../ui/form/FormWrapper";
import TextInput from "../../ui/form/input";
import FileInput from "../../ui/form/FileInput";
import FormButton from "../../ui/button/FormBtn";
import { useBrandContext } from "@/app/context/BrandContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { showCustomToast } from "@/app/lib/showCustomToast";


const schema = z.object({
  name: z.string().min(1, "Brand name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Image must be a valid file"
    )
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      "Image must be under 2MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      "Unsupported image format"
    ),
});

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

export default function UpdateBrandForm({ id }) {
  const { UpdateBrands, GetSingleBrand, singleBrandGet, loading } =
    useBrandContext();
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors,isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode:"onChange",
    defaultValues: {
      name: "",
      slug: "",
      image: undefined,
    },
  });

  const name = watch("name");

  //  Fetch brand data
  useEffect(() => {
    GetSingleBrand(id);
  }, [id]);

  useEffect(() => {
    if (singleBrandGet) {
      reset({
        name: singleBrandGet.name || "",
        slug: singleBrandGet.slug || "",
        image: undefined,
      });
      setPreview(`${URL_IMAGE}${singleBrandGet.image}`);
    }
  }, [singleBrandGet, reset]);

  //  Auto-generate slug
  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug(name), { shouldValidate: true });
    }
  }, [name, setValue]);

 
   const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    } else {
      setValue('image', null);
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    if (!singleBrandGet) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    formData.append("_method", "PATCH");

    try {
    const res =  await UpdateBrands(id, formData);
      reset();
      setPreview(null);
       if(res.success === true){
         showCustomToast({
           title: "Brand updated",
           message: 'Brand updated successfully!',
           type: "success",
         });
         router.push("/admin/brand");
       }
    } catch (error) {
     
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Brand</h2>

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
        onChange={handleImageChange}
        register={register('image')}
        error={errors.image?.message}
      />

      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded border"
          />
        </div>
      )}

      <FormButton type="submit" loading={loading} disabled={!isValid} IsValid = {isValid}>
        Update
      </FormButton>
    </FormWrapper>
  );
}

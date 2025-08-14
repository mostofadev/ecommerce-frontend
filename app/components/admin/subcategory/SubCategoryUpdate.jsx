"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as z from "zod";

import FormWrapper from "../../ui/form/FormWrapper";
import TextInput from "../../ui/form/input";
import FileInput from "../../ui/form/FileInput";
import FormButton from "../../ui/button/FormBtn";
import SelectInput from "../../ui/form/SelectInput";

import { useSubCategoryContext } from "@/app/context/SubCategoryContext";
import { showCustomToast } from "@/app/lib/showCustomToast";

const schema = z.object({
  name: z.string().min(1, "Sub-category name is required"),
  slug: z.string().min(1, "Slug is required"),
  category_id: z
    .string()
    .min(1, "Please select a category"),
  image: z
    .any()
    .refine((file) => file === null || file instanceof File, "Image must be a file")
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, "Image must be under 2MB")
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type),
      "Unsupported file format"
    ),
});

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

export default function UpdateSubCategoryForm({ id }) {
  const router = useRouter();
  const {
    formCategories,
    getAllCategories,
    getSingleSubCategory,
    singleSubCategory,
    updateSubCategoryHandler,
    loading,
  } = useSubCategoryContext();

  const [preview, setPreview] = useState(null);
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors,isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode:"onChange",
    defaultValues: {
      name: "",
      slug: "",
      category_id: "",
      image: null,
    },
  });

  const name = watch("name");

  useEffect(() => {
    getAllCategories();
    getSingleSubCategory(id);
  }, [id]);

  useEffect(() => {
    if (singleSubCategory) {
      reset({
        name: singleSubCategory.name || "",
        slug: singleSubCategory.slug || "",
        category_id: String(singleSubCategory.category_id) || "",
        image: null,
      });
      setPreview(`${URL_IMAGE}${singleSubCategory.image}`);
    }
  }, [singleSubCategory, reset]);

  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug(name));
    }
  }, [name, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    } else {
      setValue("image", null);
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("category_id", data.category_id);
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    formData.append("_method", "PATCH");

    try {
     const res = await updateSubCategoryHandler(id, formData);
      
      if(res.success === true){
        showCustomToast({
          title: "Sub-Category updated",
          message: 'Sub-Category updated successfully!',
          type: "success",
        });
        router.push("/admin/subcategory");
      }
    } catch (error) {
     
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Sub-Category</h2>

      <TextInput
        label="Name"
        {...register("name")}
        error={errors.name?.message}
        placeholder="Enter Sub-Category Name"
      />

      <TextInput
        label="Slug"
        {...register("slug")}
        error={errors.slug?.message}
        readOnly
        placeholder="Auto-generated slug"
      />

      <SelectInput
        label="Parent Category"
        name="category_id"
        value={watch("category_id")}
        onChange={(e) =>
          setValue("category_id", e.target.value, { shouldValidate: true })
        }
        error={errors.category_id?.message}
        options={[
          { value: "", label: "-- Select Category --" },
          ...formCategories.map((cat) => ({
            value: String(cat.id),
            label: cat.name,
          })),
        ]}
      />

      <FileInput
        label="Sub-Category Image"
        name="image"
        register={register("image")}
        onChange={handleImageChange}
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

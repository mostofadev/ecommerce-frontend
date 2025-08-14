"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

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
  category_id: z.coerce
    .number({
      required_error: "Please select a category",
      invalid_type_error: "Category must be selected",
    })
    .int()
    .positive("Please select a valid category"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .refine(
      (file) => file && file.size <= 2 * 1024 * 1024,
      "Image must be under 2MB"
    )
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type),
      "Unsupported file format"
    ),
});

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

export default function SubCategoryForm() {
  const router = useRouter();
  const { error:ServerError,formCategories, getAllCategories, createSubCategoryHandler, loading } =
    useSubCategoryContext();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors,isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      image: null,
      category_id: 0, // numeric default
    },
  });

  const name = watch("name");

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug(name));
    }
  }, [name, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file, { shouldValidate: true });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("category_id", data.category_id);
      formData.append("image", data.image);

     const res = await createSubCategoryHandler(formData);
      if(res.status === true){
        showCustomToast({
          title: "Sub-category created",
          message: 'Sub-category created successfully!',
          type: "success",
        });
        router.push("/admin/subcategory");
      }
    } catch (err) {
     
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Sub-Category</h2>

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
         {...register("category_id")}
        error={errors.category_id?.message}
        options={[
          ...formCategories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          })),
        ]}
      />

      <FileInput
        label="Sub-Category Image"
        name="image"
        onChange={handleImageChange}
        register={register("image")}
        error={errors.image?.message}
      />

      {preview && (
        <Image
          src={preview}
          width={100}
          height={100}
          alt="Preview"
          className="w-24 h-24 rounded border object-cover mt-2"
        />
      )}

      <FormButton type="submit" loading={loading} disabled={!isValid} IsValid = {isValid}>
        Create
      </FormButton>
    </FormWrapper>
  );
}

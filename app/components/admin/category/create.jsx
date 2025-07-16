"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import FormWrapper from "../../ui/form/FormWrapper";
import FormButton from "../../ui/button/FormBtn";
import TextInput from "../../ui/form/input";
import FileInput from "../../ui/form/FileInput";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCategoryContext } from "@/app/context/CategoryContext";
import { showCustomToast } from "@/app/lib/showCustomToast";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  image: yup
    .mixed()
    .test("required", "Image is required", (value) => {
      return value instanceof File;
    })
    .test("fileSize", "Image must be less than 2MB", (value) => {
      return value instanceof File ? value.size <= 2 * 1024 * 1024 : true;
    })
    .test("fileType", "Unsupported file type", (value) => {
      return value instanceof File
        ? ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type)
        : true;
    }),
});

export default function CategoryForm() {
  const {error:ServerError,loading,CreateCategory}=useCategoryContext()
  const router = useRouter()
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      image: null,
    },
  });

  // Watch name for slug auto-generation
  const name = watch("name");

  useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [name, setValue]);

const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    if (data.image) formData.append("image", data.image);

  const res=  await CreateCategory(formData);
  console.log(res);
  
    if(res.data.status === true){
      showCustomToast({
        title: "Category created",
        message: 'Category created successfully!',
        type: "success",
      });
      router.push("/admin/category");
    }
  } catch (err) {

  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    } else {
      setValue("image", null, { shouldValidate: true });
      setPreview(null);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Category</h2>

      <TextInput
        label="Name"
        name="name"
        placeholder="Enter category name"
        {...register("name")}
        error={errors.name?.message || ServerError?.name}
      />

      <TextInput
        label="Slug"
        name="slug"
        placeholder="Auto-generated slug"
        {...register("slug")}
        error={errors.slug?.message || ServerError?.slug}
      />

      <FileInput
        label="Image"
        name="image"
        onChange={handleImageChange}
        error={errors.image?.message  || ServerError?.image}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border mt-2"
        />
      )}

      <FormButton type="submit" loading={loading}>
        Create
      </FormButton>
    </FormWrapper>
  );
}

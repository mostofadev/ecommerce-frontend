"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import FormWrapper from "@/app/components/ui/form/FormWrapper";
import TextInput from "@/app/components/ui/form/input";
import FileInput from "@/app/components/ui/form/FileInput";
import FormButton from "@/app/components/ui/button/FormBtn";
import Checkbox from "@/app/components/ui/form/Checkbox";
import { updateBannerSchema } from "@/schemas/bannerupdateSchema";
import { useBannerContext } from "@/app/context/BannerContext";
import { showCustomToast } from "@/app/lib/showCustomToast";

export default function UpdateBannerForm({ id }) {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  const { loading, updateBannerHandler, getSingleBannerHandler } = useBannerContext();
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(updateBannerSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      cta: "",
      cta_url: "",
      status: true,
      image: null,
    },
  });

  // Fetch banner data
  useEffect(() => {
    if (id) {
      getSingleBannerHandler(id).then((res) => {
        const data = res?.data;
        if (data) {
          reset({
            title: data.title || "",
            subtitle: data.subtitle || "",
            cta: data.cta || "",
            cta_url: data.cta_url || "",
            status: !!data.status,
            image: null,
          });
          setPreview(`${URL_IMAGE}${data.image}`);
        }
      });
    }
  }, [id, getSingleBannerHandler, reset]);

  // Image preview on change
  const imageWatch = watch("image");

  useEffect(() => {
    if (imageWatch && imageWatch.length > 0) {
      const file = imageWatch[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [imageWatch]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle || "");
    formData.append("cta", data.cta || "");
    formData.append("cta_url", data.cta_url || "");
    formData.append("status", data.status ? "1" : "0");

    // Append image if exists
    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    formData.append("_method", "PUT");

    try {
      const res = await updateBannerHandler(id, formData);
      if (res.status === true) {
        showCustomToast({
          title: "Banner update",
          message: "Banner updated successfully!",
          type: "success",
        });
        router.push("/admin/setting/banner");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Banner</h2>

      <TextInput label="Title" {...register("title")} error={errors.title?.message} />
      <TextInput label="Subtitle" {...register("subtitle")} error={errors.subtitle?.message} />
      <TextInput label="CTA" {...register("cta")} error={errors.cta?.message} />
      <TextInput label="CTA URL" {...register("cta_url")} error={errors.cta_url?.message} />
      <Checkbox label="Status" {...register("status")} />

      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <FileInput
            label="Image"
            accept="image/*,.avif"
            name="image"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                field.onChange(e.target.files); // <-- REQUIRED
              } else {
                setPreview(null);
                field.onChange(null);
              }
            }}
            error={fieldState.error?.message}
          />
        )}
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

      <FormButton type="submit" loading={loading} disabled={!isValid} IsValid={isValid}>
        {loading ? "Updating..." : "Update Banner"}
      </FormButton>
    </FormWrapper>
  );
}

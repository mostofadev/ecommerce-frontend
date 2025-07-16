"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import Image from "next/image";
import FormWrapper from "@/app/components/ui/form/FormWrapper";
import TextInput from "@/app/components/ui/form/input";
import FileInput from "@/app/components/ui/form/FileInput";
import FormButton from "@/app/components/ui/button/FormBtn";
import { bannerSchema } from "@/schemas/bannerSchema";
import { useBannerContext } from "@/app/context/BannerContext";
import Checkbox from "@/app/components/ui/form/Checkbox";
import { showCustomToast } from "@/app/lib/showCustomToast";
import { useRouter } from "next/navigation";

export default function BannerForm() {
  const [preview, setPreview] = useState(null);
  const { loading, error, createBannerHandler } = useBannerContext();
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      cta: "",
      cta_url: "",
      status: true,
      image: null,
    },
  });
const handleImageChange = (e) => {
  const files = e.target.files;
  if (files && files?.length > 0) {
    setValue("image", files, { shouldValidate: true }); // ✅ FileList পাঠাও
  } else {
    setValue("image", null);
  }
};
  const imageWatch = watch("image");

  useEffect(() => {
    if (imageWatch && imageWatch?.length > 0) {
      const file = imageWatch[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [imageWatch]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle || "");
    formData.append("cta", data.cta || "");
    formData.append("cta_url", data.cta_url || "");
    formData.append("status", data.status ? "1" : "0");
    formData.append("image", data.image[0]);

    try {
      const res = await createBannerHandler(formData);
      console.log("Banner created:", res);
      if(res.status === true){
        showCustomToast({
          title: "Banner created",
          message: 'Banner created successfully!',
          type: "success",
        });
        router.push("/admin/setting/banner");
      }
      // Optionally reset form or show success message here
    } catch (err) {
      
    }
  };

 // SQLSTATE[28000] [1045] Access denied for user 'mostofa3_database'@'localhost' (useing password:yes) (connection:mysql,sql:delete from `cache`)
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Banner</h2>

      <TextInput
        label="Title"
        name="title"
        {...register("title")}
        error={errors.title?.message}
      />

      <TextInput
        label="Subtitle"
        name="subtitle"
        {...register("subtitle")}
        error={errors.subtitle?.message}
      />

      <TextInput
        label="CTA"
        name="cta"
        {...register("cta")}
        error={errors.cta?.message}
      />

      <TextInput
        label="CTA URL"
        name="cta_url"
        {...register("cta_url")}
        error={errors.cta_url?.message}
      />

      <Checkbox
        label="Status"
        name="status"
        {...register("status")}
      />

      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <FileInput
            label="Image"
            accept="image/*,.avif"
            name="image"
            onChange={handleImageChange}
            error={errors.image?.message}
          />
        )}
      />

      {preview && (
        <Image
          src={preview}
          width={120}
          height={120}
          alt="Image Preview"
          className="rounded border mt-2 object-cover"
        />
      )}

      <FormButton type="submit" loading={loading} disabled={!isValid} IsValid = {isValid} >
        {loading ? "Create" :"Create Banner"}
      </FormButton>
    </FormWrapper>
  );
}
//base64:/9Hnoa250zrQ6dabZXfCW7K6xmPvMlJHCACM8Q8FRT4=
// JnV(Ctkmn$+)rJZz
// sqlstate[28000] [1045] access denied for user 'mostofa3_database'@'localhost' (using password:YES) (connection:mysql,sql,select Experimental_CssVarsProvider(select 1 from information_schema.tables where table_schema = schema() and table_name="migrations" and table_type in ('BASE TABLE','SYSTEM VERSIONED')) as `exists`)

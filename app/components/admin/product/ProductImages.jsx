"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import FileInput from "../../ui/form/FileInput";

export default function ProductImages() {
  const { control, setValue, watch } = useFormContext();
  const images = watch("images") || [];
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const newPreviews = images
      .map((image) => {
        if (typeof image === "string") return image;
        if (image instanceof File) return URL.createObjectURL(image);
        return null;
      })
      .filter(Boolean);

    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((preview) => {
        if (preview?.startsWith?.("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [images]);

  const handleFilesChange = (event) => {
    const newFiles = event.target.files;
    if (!newFiles || newFiles?.length === 0) return;
    const fileArray = Array.from(newFiles);
    setValue("images", [...images, ...fileArray], { shouldValidate: true });
  };

  const removeImage = (indexToRemove) => {
    const updated = images.filter((_, index) => index !== indexToRemove);
    setValue("images", updated, { shouldValidate: true });
  };

  return (
    <Controller
      control={control}
      name="images"
      render={() => (
        <div className="space-y-4">
          <FileInput
            label="Product Images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
          />

          <div className="flex flex-wrap gap-4 mt-4">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-md overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Preview ${index}`}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  unoptimized={src.startsWith("blob:")}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
}

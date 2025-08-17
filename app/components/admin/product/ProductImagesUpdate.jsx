"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import FileInput from "../../ui/form/FileInput";

export default function ProductImagesUpdate({ existingImages = [] }) {
    console.log('exis', existingImages);
    
  const { control, setValue, watch } = useFormContext();
  const images = watch("images") || []; // new uploaded files
  const [previews, setPreviews] = useState([]);
  const [removedExisting, setRemovedExisting] = useState([]); // removed old images
  const BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  useEffect(() => {
    // Filter out removed existing images
    const existingPreviews = existingImages
      .filter((img) => !removedExisting.includes(img))
      .map((img) => BASE_URL + 'uploads/products/gallery/'+ img);

    const newFilePreviews = images
      .filter((f) => f instanceof File)
      .map((file) => URL.createObjectURL(file));

    setPreviews([...existingPreviews, ...newFilePreviews]);

    // Cleanup blob URLs
    return () => {
      newFilePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images, existingImages, removedExisting]);

  const handleFilesChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setValue("images", [...images, ...newFiles], { shouldValidate: true });
  };

  const removeImage = (indexToRemove) => {
    const existingCount = existingImages.length - removedExisting.length;

    if (indexToRemove < existingCount) {
      // Remove from existing images
      const imgToRemove = existingImages.filter(
        (img) => !removedExisting.includes(img)
      )[indexToRemove];

      setRemovedExisting((prev) => [...prev, imgToRemove]);
    } else {
      // Remove from new uploaded files
      const newIndex = indexToRemove - existingCount;
      const updatedNewFiles = images.filter((_, i) => i !== newIndex);
      setValue("images", updatedNewFiles, { shouldValidate: true });
    }
  };
  console.log("srccs", previews);

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
                  unoptimized={true} 
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

"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import TextInput from "../../ui/form/input";
import TextArea from "../../ui/form/TextArea";
import SelectInput from "../../ui/form/SelectInput";
import FileInput from "../../ui/form/FileInput";
import FormButton from "../../ui/button/FormBtn";
import CheckboxGroup from "../../ui/form/Checkbox";
import TextEditor from "../../ui/form/TextEditor";
import VariantMatrix from "./VariantProduct";
import FormWrapper from "../../ui/form/FormWrapper";

import { useSubCategoryContext } from "../../../context/SubCategoryContext";
import { useProductContext } from "@/app/context/ProductContext";
import { productSchemaUpdate } from "@/schemas/productSchemasUpdate";
import { showCustomToast } from "@/app/lib/showCustomToast";
import ProductImages from "./ProductImages";
import ProductImagesUpdate from "./ProductImagesUpdate";

export default function ProductUpdateForm({ productId }) {
  const router = useRouter();
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState(null);
  const [existingImageUrls, setExistingImageUrls] = useState([]);

  const methods = useForm({
    resolver: zodResolver(productSchemaUpdate),
    mode: "onChange",
    defaultValues: {
      name: "",
      sku: "",
      slug: "",
      description: "",
      summary: "",
      price: "",
      original_price: "",
      discount_type: "none",
      discount_value: 0,
      final_price: "",
      quantity: "",
      brand_id: "",
      category_id: "",
      sub_category_id: "",
      status: "active",
      thumbnail: null,
      images: [],
      variants: [],
      new_product: false,
      best_seller: false,
      meta_title: "",
      meta_description: "",
      meta_keyword: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const {
    formCategories,
    formSubCategories,
    formBrands,
    getAllCategories,
    getAllSubCategory,
    getAllBrand,
  } = useSubCategoryContext();

  const {
    getSingleProduct,
    singleProduct,
    updateProductHandler,
    loading,
    error: serverError,
  } = useProductContext();

  useEffect(() => {
    getAllCategories();
    getAllSubCategory();
    getAllBrand();
    getSingleProduct(productId);
  }, [productId]);
  useEffect(() => {}, [watch(), errors, isValid]);
  useEffect(() => {
    if (singleProduct) {
      reset({
        ...singleProduct,
        brand_id: String(singleProduct.brand_id || ""),
        category_id: String(singleProduct.category_id || ""),
        sub_category_id: String(singleProduct.sub_category_id || ""),
        status: singleProduct.status || "active",
        thumbnail: null,
        images: [],
        variants: singleProduct.variants || [],
      });
      setExistingThumbnailUrl(singleProduct.thumbnail_url || null);
      setExistingImageUrls(singleProduct.image_urls || []);
    }
  }, [singleProduct, reset]);
  // console.log("ima", singleProduct.images);

  useEffect(() => {
  const name = watch("name");
  const slug = name
    ? encodeURIComponent(
        name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")        // spaces → "-"
          .replace(/[^a-z0-9\-]/g, "") // unsafe char remove
      )
    : "";
  setValue("slug", slug);
}, [watch("name")]);

  const selectedCategoryId = watch("category_id");
  const filteredSubCategories = formSubCategories.filter(
    (sub) => String(sub.category_id) === selectedCategoryId
  );

  const price = parseFloat(watch("price")) || 0;
  const discountType = watch("discount_type");
  const discountValue = parseFloat(watch("discount_value")) || 0;

  useEffect(() => {
    let final = price;
    if (discountType === "percentage")
      final = price - (price * discountValue) / 100;
    if (discountType === "fixed") final = price - discountValue;
    if (final < 0) final = 0;
    setValue("final_price", final.toFixed(2));
  }, [price, discountType, discountValue]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setValue("thumbnail", file, { shouldValidate: true });
    if (file) setExistingThumbnailUrl(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("images", files, { shouldValidate: true });
    if (files?.length)
      setExistingImageUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PATCH");

    Object.entries(data).forEach(([key, val]) => {
      if (key === "images" || key === "variants") return;
      if (key === "thumbnail" && val instanceof File) formData.append(key, val);
      else if (typeof val === "boolean") formData.append(key, val ? "1" : "0");
      else if (val != null) formData.append(key, val);
    });

    data.images.forEach((file, i) => formData.append(`images[${i}]`, file));
    data.variants.forEach((variant, i) =>
      Object.entries(variant).forEach(([k, v]) =>
        formData.append(`variants[${i}][${k}]`, v)
      )
    );

    try {
      const res = await updateProductHandler(productId, formData);
      if (res.status === true) {
        showCustomToast({
          title: "Update Product",
          message: "Product Update Successfully.",
          type: "success",
        });
        router.push("/admin/product");
      }
    } catch (err) {}
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name?.message || serverError?.name}
        />
        <TextInput
          label="SKU"
          {...register("sku")}
          error={errors.sku?.message || serverError?.sku}
        />
        <TextInput
          label="Slug"
          readOnly
          {...register("slug")}
          error={errors.slug?.message || serverError?.slug}
        />
        <TextArea
          label="Description"
          {...register("description")}
          error={errors.description?.message || serverError?.description}
        />
        {/* <TextEditor
          label="Summary"
          name="summary"
          value={watch("summary")}
          onChange={(n, c) => setValue(n, c, { shouldValidate: true })}
          error={errors.summary?.message || serverError?.summary}
        /> */}
        <TextArea
          label="Summary"
          name="summary"
          error={errors.summary?.message || serverError?.summary}
          {...register("summary")}
        />

        <TextInput
          label="Price"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <TextInput
          label="Original Price"
          type="number"
          {...register("original_price", { valueAsNumber: true })}
          error={errors.original_price?.message || serverError?.original_price}
        />

        <Controller
          name="discount_type"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Discount Type"
              options={[
                { label: "None", value: "none" },
                { label: "Percentage", value: "percentage" },
                { label: "Fixed", value: "fixed" },
              ]}
              {...field}
              error={
                errors.discount_type?.message || serverError?.discount_type
              }
            />
          )}
        />

        {(discountType === "percentage" || discountType === "fixed") && (
          <TextInput
            label="Discount Value"
            type="number"
            {...register("discount_value", { valueAsNumber: true })}
            error={
              errors.discount_value?.message || serverError?.discount_value
            }
          />
        )}

        <TextInput
          label="Final Price"
          readOnly
          {...register("final_price")}
          error={errors.final_price?.message || serverError?.final_price}
        />
        <TextInput
          label="Quantity"
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          error={errors.quantity?.message || serverError?.quantity}
        />

        <Controller
          name="brand_id"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Brand"
              options={formBrands.map((b) => ({
                label: b.name,
                value: String(b.id),
              }))}
              {...field}
              error={errors.brand_id?.message || serverError?.brand_id}
            />
          )}
        />

        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Category"
              options={formCategories.map((c) => ({
                label: c.name,
                value: String(c.id),
              }))}
              {...field}
              error={errors.category_id?.message || serverError?.category_id}
            />
          )}
        />

        <Controller
          name="sub_category_id"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Subcategory"
              options={filteredSubCategories.map((s) => ({
                label: s.name,
                value: String(s.id),
              }))}
              {...field}
              error={
                errors.sub_category_id?.message || serverError?.sub_category_id
              }
            />
          )}
        />

        <FileInput
          label="Thumbnail"
          name="thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
          error={errors.thumbnail?.message || serverError?.thumbnail}
        />
        {existingThumbnailUrl && (
          <img
            src={existingThumbnailUrl}
            alt="Existing Thumbnail"
            className="w-24 h-24"
          />
        )}

        {/* <FileInput
          label="Images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          error={errors.images?.message || serverError?.images}
        />
        <div className="flex flex-wrap gap-2">
          {existingImageUrls.map((url, i) => (
            <img key={i} src={url} className="w-24 h-24" />
          ))}
        </div> */}

        <ProductImagesUpdate
          existingImages={singleProduct?.images.map((img) => img.image) || []}
        />



        <VariantMatrix name="variants" />

        {/* <CheckboxGroup label="New Product" {...register("new_product")} />
        <CheckboxGroup label="Best Seller" {...register("best_seller")} /> */}
        <div className="flex gap-6">
          <Controller
            name="new_product"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckboxGroup
                label="New Product"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <Controller
            name="best_seller"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckboxGroup
                label="Best Seller"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>

        <TextInput
          label="Meta Title"
          {...register("meta_title")}
          error={errors.meta_title?.message || serverError?.meta_title}
        />
        <TextArea
          label="Meta Description"
          {...register("meta_description")}
          error={
            errors.meta_description?.message || serverError?.meta_description
          }
        />
        <TextInput
          label="Meta Keywords"
          {...register("meta_keyword")}
          error={errors.meta_keyword?.message || serverError?.meta_keyword}
        />

        <FormButton
          type="submit"
          IsValid={isValid}
          loading={loading}
          disabled={!isValid}
        >
          {loading ? "Updating..." : "Update Product"}
        </FormButton>
      </FormWrapper>
    </FormProvider>
  );
}

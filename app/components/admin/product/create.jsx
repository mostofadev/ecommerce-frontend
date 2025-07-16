"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchemaStore } from "@/schemas/productSchemasStore";

import TextInput from "../../ui/form/input";
import TextArea from "../../ui/form/TextArea";
import SelectInput from "../../ui/form/SelectInput";
import FileInput from "../../ui/form/FileInput";
import FormButton from "../../ui/button/FormBtn";
import CheckboxGroup from "../../ui/form/Checkbox";
import TextEditor from "../../ui/form/TextEditor";
import HookSelectInput from "../../ui/form/hookSelectInput";
import ProductImages from "./ProductImages";
import VariantMatrix from "./VariantProduct";
import FormWrapper from "../../ui/form/FormWrapper";

import { useSubCategoryContext } from "../../../context/SubCategoryContext";
import { useProductContext } from "@/app/context/ProductContext";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/app/lib/showCustomToast";

export default function ProductForm() {
  const router = useRouter()
  

  const methods = useForm({
    resolver: zodResolver(productSchemaStore),
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
     formState: { errors,isValid } 
    } = methods;

  const { 
    formCategories, 
    formSubCategories, 
    formBrands, 
    getAllCategories, 
    getAllSubCategory, 
    getAllBrand 
  } = useSubCategoryContext();

  const { 
    error: serverError, 
    createProductHandler, 
    loading 
  } = useProductContext();

  // Fetch dropdown data
  useEffect(() => {
    getAllCategories();
    getAllSubCategory();
    getAllBrand();
  }, []);
  const selectedCategoryId = watch("category_id");
  
 const filteredSubCategories = formSubCategories.filter(
  sub => sub.category_id === parseInt(watch("category_id") || 0)
);

  // Auto-generate slug
  useEffect(() => {
    const nm = watch("name");
    const slug = nm ? nm.toLowerCase().replace(/\s+/g, "-") : "";
    setValue("slug", slug);
  }, [watch("name")]);

  // Calculate final price
  const price = parseFloat(watch("price")) || 0;
    const discountType = watch("discount_type");
    const discountValue = parseFloat(watch("discount_value")) || 0;
    console.log(discountType);
    
  useEffect(() => {
    
    let final = price;
    if (discountType === "percentage") final = price - (price * discountValue) / 100;
    if (discountType === "fixed") final = price - discountValue;
    if (final < 0) final = 0;
    setValue("final_price", final.toFixed(2));
  }, [watch("price"), watch("discount_type"), watch("discount_value")]);
   
  // File handlers
  const handleThumbnailChange = e => setValue("thumbnail", e.target.files[0], { shouldValidate: true });
  const handleImagesChange = e => setValue("images", Array.from(e.target.files), { shouldValidate: true });

  const onSubmit = async data => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === "images" || key === "variants") return;
      if (key === "thumbnail" && val instanceof File) formData.append(key, val);
      else if (typeof val === "boolean") formData.append(key, val ? "1" : "0");
      else if (val != null) formData.append(key, val);
    });
    data.images.forEach((f, i) => formData.append(`images[${i}]`, f));
    data.variants.forEach((v, i) => Object.entries(v).forEach(([k, vVal]) => formData.append(`variants[${i}][${k}]`, vVal)));
    console.log(formData);
    
    try {
    const res = await createProductHandler(formData);
    if(res.status === true){
       showCustomToast({
        title: "Product Create",
        message: "Product Create Successfully!",
        type: "success",
      });
       router.push("/admin/product");
    }


    } catch (error) {
      
    }
    
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-8 bg-white rounded shadow space-y-6">
        <h2 className="text-3xl font-bold">Create Product</h2>

        {/* Basic fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput 
          label="Name" 
          name="name" 
          error={errors.name?.message || serverError?.name} 
          {...register("name")} 
          />

          <TextInput 
          label="SKU" 
          name="sku"
          error={errors.sku?.message || serverError?.sku}
          {...register("sku")} 
          />

          <TextInput 
          label="Slug" 
          name="slug" 
          readOnly 
          {...register("slug")} 
          error={errors.slug?.message || serverError?.slug}
          />
        </div>

        {/* Description & Summary */}
        <TextArea 
        label="Description" 
        name="description" 
        error={errors.description?.message || serverError?.description} 
        {...register("description")}
        />

        <TextEditor 
        label="Summary" 
        name="summary" 
        value={watch("summary")} 
        onChange={(n, c) => setValue(n, c)} 
        error={errors.summary?.message || serverError?.summary} 
        />

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput 
          label="Price" 
          type="number" 
          name="price" 
          error={errors.price?.message || serverError?.price} 
          {...register("price", { valueAsNumber: true })} 
          />

          <TextInput 
          label="Original Price" 
          type="number" 
          name="original_price" 
          error={errors.original_price?.message || serverError?.original_price} 
          {...register("original_price", { valueAsNumber: true })} 
          />
          
          <SelectInput 
          label="Discount Type" 
          name="discount_type" 
          {...register("discount_type")} 
          options={[
          { label: "Percentage", value: "percentage" },
          { label: "Fixed", value: "fixed" }]} 
          error={errors.discount_type?.message || serverError?.discount_type} 
         
          
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* <TextInput 
          label="Discount Value" 
          type="number" 
          name="discount_value" 
          error={errors.discount_value?.message || serverError?.discount_value}
          {...register("discount_value", { valueAsNumber: true })} 
           disabled={discountType !== "percentage"} 
          /> */}
          <div style={{ display: discountType !== "percentage" ? "none" : "block" }}>
            <TextInput 
              label="Discount Value" 
              type="number" 
              name="discount_value" 
              error={errors.discount_value?.message || serverError?.discount_value}
              {...register("discount_value", { valueAsNumber: true })} 
              disabled={discountType !== "percentage"} 
            />
          </div>
          <TextInput 
          label="Final Price" 
          name="final_price" 
          readOnly 
          {...register("final_price")} 
          />

          <TextInput 
          label="Quantity" 
          type="number" 
          name="quantity" 
          error={errors.quantity?.message || serverError?.quantity} 
          {...register("quantity", { valueAsNumber: true })} 
          />
        </div>

        {/* Relations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput 
          label="Brand"
          options={formBrands.map(b => ({ label: b.name, value: b.id }))} 
          error={errors.brand_id?.message || serverError?.brand_id} 
          {...register("brand_id")} 
          />

          <SelectInput 
          label="Category" 
          options={formCategories.map(c => ({ label: c.name, value: c.id }))} 
          error={errors.category_id?.message || serverError?.category_id} 
          {...register("category_id")} 
          />

{/* ///{watch("category_id") && ( */}
            <SelectInput 
              label="Subcategory"
              options={filteredSubCategories.map(s => ({ label: s.name, value: s.id }))} 
              error={errors.sub_category_id?.message || serverError?.sub_category_id} 
              {...register("sub_category_id")} 
            />
          {/* )} */}
        </div>

        {/* Status & Flags */}
        <SelectInput 
        label="Status" 
        name="status" 
        {...register("status")} 
        options={[
          {label:"Active",value:"active"},
          {label:"Inactive",value:"inactive"}
          ]} 
          error={errors.status?.message || serverError?.status} 
          />

        <div className="flex gap-6">
          <CheckboxGroup 
          label="New Product" 
          {...register("new_product")} 
          />

          <CheckboxGroup 
          label="Best Seller" 
          {...register("best_seller")} 
          />

        </div>

        {/* Thumbnail & Images */}
        <FileInput 
        label="Thumbnail" 
        name="thumbnail" 
        accept="image/*" 
        onChange={handleThumbnailChange} 
        error={errors.thumbnail?.message}
        />

        {watch("thumbnail") &&
        <img 
        src={URL.createObjectURL(watch("thumbnail"))}
         alt="Thumb" 
         className="w-24 h-24 object-cover rounded" 
         />
         }

        <ProductImages 
        images={watch("images")} 
        setImages={files => setValue("images", files)}
        />

        {/* Variants */}
        <VariantMatrix 
        name="variants" 
        />

 {/* SEO Fields */}
      <TextInput
        label="Meta Title"
        {...register('meta_title')}
        placeholder="Meta title for SEO"
       // error={error?.meta_title && error.meta_title}
        errors={errors.meta_title?.message}
      />
      <TextArea
        label="Meta Description"
        {...register('meta_description')}
        placeholder="Meta description for SEO"
      //  error={error?.meta_description && error.meta_description}
        errors={errors.meta_description?.message}
        rows={3}
      />
      <TextInput
        label="Meta Keywords"
        {...register('meta_keyword')}
        placeholder="Meta keywords, comma separated"
      //  error={error?.meta_keyword && error.meta_keyword}
        errors={errors.meta_keyword?.message}
      />
{!isValid && <p className="text-red-500 text-sm">Please fix validation errors before submitting.</p>}

        {/* Submit */}
      <FormButton type="submit" loading={loading} disabled={!isValid} IsValid = {isValid}>
        {loading ? "Crate" : "Create Product"}
      </FormButton>
      </FormWrapper>
    </FormProvider>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

import { useCategoryContext } from '@/app/context/CategoryContext';
import FormWrapper from '../../ui/form/FormWrapper';
import FormButton from '../../ui/button/FormBtn';
import TextInput from '../../ui/form/input';
import FileInput from '../../ui/form/FileInput';
import Loader from '../../ui/loader/pageSpinner';
import { showCustomToast } from '@/app/lib/showCustomToast';
import { useRouter } from 'next/navigation';

//  Zod Schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  image: z
    .any()
    .refine((file) => !file || file instanceof File, {
      message: 'Image must be a valid file',
    })
    .refine((file) => !file || (file.size <= 2 * 1024 * 1024), {
      message: 'Image must be less than 2MB',
    })
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type),
      {
        message: 'Unsupported image format',
      }
    ),
});

export default function UpdateCategory({ id }) {
  const {
    singleCategoryGet,
    loading,
    GetSingleCategory,
    UpdateCategoryHandler,
  } = useCategoryContext();

  const [preview, setPreview] = useState(null);
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors,isValid },
  } = useForm({
    resolver: zodResolver(schema),
    onChange:"onChange",
    defaultValues: {
      name: '',
      slug: '',
      image: null,
    },
  });

  const name = watch('name');

  //  Fetch single category
  useEffect(() => {
    if (id) {
      GetSingleCategory(id);
    }
  }, [id]);
  //  Load existing data into form
  useEffect(() => {
    if (singleCategoryGet?.data) {
      const category = singleCategoryGet.data;
      reset({
        name: category.name || '',
        slug: category.slug || '',
        image: null,
      });
      setPreview(`${URL_IMAGE}${category.image}`);
    }
  }, [singleCategoryGet, reset]);

  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
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

  //  Submit Handler
  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    formData.append('_method', 'PUT');
    try {
    const res =  await UpdateCategoryHandler(id, formData);
      reset();
      setPreview(null);
      if(res.data.success === true){
        showCustomToast({
          title: "Category updated",
          message: 'Category updated successfully!',
          type: "success",
        });
        router.push("/admin/category");
      }
    } catch (err) {
     
    }
  };

  if (!singleCategoryGet?.data) return <Loader />;

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Category</h2>

      <TextInput
        label="Name"
        placeholder="Enter category name"
        {...register('name')}
        error={errors.name?.message}
      />

      <TextInput
        label="Slug"
        readOnly
        {...register('slug')}
        error={errors.slug?.message}
      />

      <FileInput
        label="Image"
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

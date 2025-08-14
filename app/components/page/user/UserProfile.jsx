'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import FileInput from '../../ui/form/FileInput';
import UserInput from '../../ui/User/userInput';
import { UserSelectInput } from '../../ui/User/userSelectInput';
import { Button } from '../../admin/order/Button';
import AppImage from '../../ui/Image/AppImage';

import { useUser } from '@/app/context/UserContext';
import FormButton from '../../ui/button/FormBtn';
import UserProfileSkeleton from '../../Skeleton/Home/UserProfileSkeleton';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female']),
  phone: z.string().min(11, 'Minimum 11 digits').max(14, 'Maximum 14 digits'),
});

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const { user, information, fetchProfile, updateProfile, loading ,fetchLoading} = useUser();
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  const router = useRouter();
  const [error,setError] = useState(null)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors,isValid },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode:"onChange",
    defaultValues: {
      name: '',
      dob: '',
      gender: 'male',
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user && information) {
      reset({
        name: user.name,
        dob: information.dob || '',
        gender: information.gender || 'male',
        phone: information.mobile || '',
        email: user.email,
      });
      if (information.profile_image) {
      setProfileImage(`${URL_IMAGE}${information.profile_image}`);
    } 
    }
  }, [user, information, reset]);

  const handleImageChange = (e) => {
   const file = e.target.files[0];
    if (file && file.size <= 3 * 1024 * 1024) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('dob', data.dob);
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('mobile', data.phone);
    formData.append('affiliate_mobile', '');
    if (imageFile) formData.append('profile_image', imageFile);
    formData.append('_method', 'PUT');
    try {
      await updateProfile(formData);
      await fetchProfile();
      setIsEditing(false);
    } catch (err) {
      setError('Something is wrong')
    }
  };

  if(fetchLoading) return <UserProfileSkeleton />
  return (
  <div className="flex justify-center px-4 mt-10">
  <div className=" rounded-xl p-6 sm:p-8 space-y-8  w-full max-w-3xl  ">
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Profile Information
      </h2>
      {!isEditing && (
        <Button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
    </div>

    {/* Profile Image Section */}
    <div className="flex justify-center flex-row gap-6 md:gap-8">
      {profileImage && (
        <div className="w-[150px] h-[150px] relative overflow-hidden flex justify-center">
          {/* <AppImage
            src={profileImage}
            alt="Profile"
            fill={true}
            width={150}
            height={150}
            ImageClass="object-cover w-[150px] h-[150px] rounded-full"
            rounded="rounded"
          /> */}

          <img
            src={profileImage}
            alt="Profile"
            className="object-cover w-[150px] h-[150px] rounded-full"
            onError={(e) => {
              e.target.src = '/default-avatar.png'; // fallback image
            }}
          />
        </div>
      )}

      
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {isEditing && (
        <div className="w-full">
          <label className="block font-medium text-gray-700 ">
            Change Profile Picture
          </label>
          <FileInput name="user_photo" onChange={handleImageChange} />
          <p className="text-xs text-gray-400 mt-1">PNG/JPG/BMP, Max. 3MB</p>
        </div>
      )}
        <UserInput
          label="Full Name"
          {...register('name')}
          icon={FiUser}
          disabled={!isEditing}
          errorMessage={errors.name?.message}
        />
        <UserInput
          label="Date of Birth"
          type="date"
          {...register('dob')}
          icon={FiCalendar}
          disabled={!isEditing}
          errorMessage={errors.dob?.message}
        />
        <UserSelectInput
          label="Gender"
          name="gender"
          control={control}
          errorMessage={errors.gender?.message}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          disabled={!isEditing}
        />
        <UserInput
          label="Mobile Number"
          type="tel"
          {...register('phone')}
          icon={FiPhone}
          disabled={!isEditing}
          errorMessage={errors.phone?.message}
        />
        <UserInput
          label="Email Address"
          type="email"
          {...register('email')}
          icon={FiMail}
          disabled
        />
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <FormButton
            type="submit"
            loading={loading}
            disabled={!isValid}
            IsValid={isValid}
          >
            Save Changes
          </FormButton>
        </div>
      )}
    </form>
  </div>
</div>

  );
}

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

  const { user, information, fetchProfile, updateProfile, loading } = useUser();
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  const router = useRouter();

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
console.log('user log',user);

  useEffect(() => {
    if (user && information) {
      console.log('info',`${URL_IMAGE}${information.profile_image}`);
      
      reset({
        name: user.name,
        dob: information.dob || '',
        gender: information.gender || 'male',
        phone: information.mobile || '',
        email: user.email,
      });
      if (information.profile_image) {
      setProfileImage(`${URL_IMAGE}${information.profile_image}`);
      console.log('img',`${URL_IMAGE}${information.profile_image}`);
    } 
    }
  }, [user, information, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 3 * 1024 * 1024) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    } else {
      alert('Max file size is 3MB');
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('dob', data.dob);
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
      console.error('Update failed:', err);
    }
  };
console.log('profileImage',profileImage);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center px-4 mt-10 bg-gray-50">
      <div className="bg-white rounded-xl p-8 space-y-8 shadow-lg w-full max-w-3xl border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Profile Information</h2>
          {!isEditing && (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        {/* Profile Image */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {profileImage && (
            <div className="w-[150px] h-[150px] overflow-hidden relative">
              <AppImage
                src={profileImage}
                alt="Profile"
                fill={true}
                width={150}
                height={150}
                ImageClass="object-cover w-[150px] h-[150px] rounded-full"
                rounded="rounded"
              />
            </div>
          )}

          {isEditing && (
            <div className="w-full">
              <label className="block font-medium text-gray-700 mb-2">
                Change Profile Picture
              </label>
              <FileInput name="user_photo" onChange={handleImageChange} />
              <p className="text-xs text-gray-400 mt-1">PNG/JPG/BMP, Max. 3MB</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
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
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>

              {/* <Button type="submit"></Button> */}
              <FormButton type="submit" loading={loading} disabled={!isValid} IsValid = {isValid}>
                Save Changes
              </FormButton>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

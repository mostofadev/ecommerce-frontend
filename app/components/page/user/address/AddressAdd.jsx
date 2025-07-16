'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormWrapper from '@/app/components/ui/form/FormWrapper';
import UserInput from '@/app/components/ui/User/userInput';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiHome
} from 'react-icons/fi';
import { addressSchema } from '@/schemas/addressSchema';
import FormButton from '@/app/components/ui/button/FormBtn';
import { CheckboxInput } from '@/app/components/ui/User/userCheckboxInput';
import { UserSelectInput } from '@/app/components/ui/User/userSelectInput';

import { useLocation } from '../../../../context/LocationContext';
import { useAddress } from '@/app/context/AddressContext';
import { useRouter } from 'next/navigation';

export default function AddressAdd() {
  const router = useRouter();
  const {
    divisions,
    districts,
    upazilas,
    loadDistricts,
    loadUpazilas,
  } = useLocation();
  const { error, loading, addAddress } = useAddress();

  const defaultValues = {
    type: 'shipping',
    name: '',
    phone: '',
    email: '',
    country_code: 'BD',
    division_id: '',
    district_id: '',
    upazila_id: '',
    postal_code: '',
    street_address: '',
    landmark: '',
    is_default: false,
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues,
  });

  const division_id = watch('division_id');
  const district_id = watch('district_id');

  useEffect(() => {
    if (division_id) {
      loadDistricts(division_id);
    }
  }, [division_id]);

  useEffect(() => {
    if (district_id) {
      loadUpazilas(district_id);
    }
  }, [district_id]);

  const onSubmit = async (data) => {
    try {
      const cleanedData = Object.entries(data).reduce((acc, [key, val]) => {
        acc[key] = val === "" ? null : val;
        return acc;
      }, {});

      await addAddress(cleanedData);
      router.push("/user/address");
    } catch (err) {
      console.error("ঠিকমতো পাঠানো যায়নি", err);
    }
  };

  const typeOptions = [
    { label: 'Billing', value: 'billing' },
    { label: 'Shipping', value: 'shipping' },
  ];

  const countryOptions = [{ label: 'Bangladesh', value: 'BD' }];

  const divisionOptions = divisions.map((d) => ({
    label: d.name,
    value: String(d.id),
  }));

  const districtOptions = districts.map((d) => ({
    label: d.name,
    value: String(d.id),
  }));

  const upazilaOptions = upazilas.map((u) => ({
    label: u.name,
    value: String(u.id),
  }));

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      OnClass={false}
      className="w-full p-8 sm:p-10 space-y-6"
    >
      <UserSelectInput
        label="Type"
        options={typeOptions}
        control={control}
        name="type"
        errorMessage={errors.type?.message}
      />
      <UserInput
        label="Your Name"
        type="text"
        placeholder="Your Name"
        icon={FiUser}
        {...register('name',{ required: "Name is required" })}
        errorMessage={errors.name?.message}
      />

      <UserInput
        label="Phone"
        type="text"
        placeholder="Phone Number"
        icon={FiPhone}
        {...register('phone')}
        errorMessage={errors.phone?.message}
      />

      <UserInput
        label="Email"
        type="email"
        placeholder="Email (optional)"
        icon={FiMail}
        {...register('email')}
        errorMessage={errors.email?.message}
      />

      <UserSelectInput
        label="Country Code"
        options={countryOptions}
        control={control}
        name="country_code"
        errorMessage={errors.country_code?.message}
      />

      <UserSelectInput
        label="Division"
        options={divisionOptions}
        control={control}
        name="division_id"
        errorMessage={errors.division_id?.message}
      />

      <UserSelectInput
        label="District"
        options={districtOptions}
        control={control}
        name="district_id"
        errorMessage={errors.district_id?.message}
      />

      <UserSelectInput
        label="Upazila"
        options={upazilaOptions}
        control={control}
        name="upazila_id"
        errorMessage={errors.upazila_id?.message}
      />

      <UserInput
        label="Street Address"
        type="text"
        placeholder="Street Address"
        icon={FiHome}
        {...register('street_address')}
        errorMessage={errors.street_address?.message}
      />

      <UserInput
        label="Postal Code"
        type="text"
        placeholder="Postal Code (optional)"
        icon={FiHash}
        {...register('postal_code')}
        errorMessage={errors.postal_code?.message}
      />

      

      <UserInput
        label="Landmark"
        type="text"
        placeholder="Landmark (optional)"
        icon={FiGlobe}
        {...register('landmark')}
        errorMessage={errors.landmark?.message}
      />

      <CheckboxInput
        label="Set as Default Address"
        control={control}
        name="is_default"
      />

      <FormButton
        type="submit"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
        IsValid={isValid}
      >
        {loading ? 'Saving...' : 'Save Address'}
      </FormButton>
    </FormWrapper>
  );
}

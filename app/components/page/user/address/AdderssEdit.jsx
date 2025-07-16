'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormWrapper from '@/app/components/ui/form/FormWrapper';
import UserInput from '@/app/components/ui/User/userInput';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiFlag, FiHash, FiHome
} from 'react-icons/fi';
import { addressSchema } from '@/schemas/addressSchema';
import FormButton from '@/app/components/ui/button/FormBtn';
import { CheckboxInput } from '@/app/components/ui/User/userCheckboxInput';
import { UserSelectInput } from '@/app/components/ui/User/userSelectInput';

import { useLocation } from '../../../../context/LocationContext';
import { useAddress } from '@/app/context/AddressContext';
import { useRouter, useParams } from 'next/navigation';

export default function AddressUpdate() {
  const router = useRouter();
  const { id } = useParams();
  const {
    divisions,
    districts,
    upazilas,
    loadDistricts,
    loadUpazilas,
  } = useLocation();
  
  const { error, loading, updateAddress, SingleAddress, getAddressById } = useAddress();

  // Load address data when component mounts or id changes
  useEffect(() => {
    if (id) {
      getAddressById(id);
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  // Set form values when SingleAddress is loaded
  useEffect(() => {
    if (SingleAddress && Object.keys(SingleAddress)?.length > 0) {
      console.log('Setting form values with:', SingleAddress);
      reset({
        type: SingleAddress.type || 'shipping',
        label: SingleAddress.label || '',
        name: SingleAddress.name || '',
        phone: SingleAddress.phone || '',
        email: SingleAddress.email || '',
        country_code: SingleAddress.country_code || 'BD',
        division_id: SingleAddress.division_id ? String(SingleAddress.division_id) : '',
        district_id: SingleAddress.district_id ? String(SingleAddress.district_id) : '',
        upazila_id: SingleAddress.upazila_id ? String(SingleAddress.upazila_id) : '',
        postal_code: SingleAddress.postal_code || '',
        street_address: SingleAddress.street_address || '',
        landmark: SingleAddress.landmark || '',
        is_default: Boolean(SingleAddress.is_default),
      });
      
      // Load districts and upazilas if division/district IDs exist
      if (SingleAddress.division_id) {
        loadDistricts(String(SingleAddress.division_id));
      }
      if (SingleAddress.district_id) {
        loadUpazilas(String(SingleAddress.district_id));
      }
    }
  }, [SingleAddress, reset]);

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
      // Convert empty strings to null
      const cleanedData = Object.entries(data).reduce((acc, [key, val]) => {
        acc[key] = val === "" ? null : val;
        return acc;
      }, {});

      console.log('Submitting data:', cleanedData);
      
      // API call
      await updateAddress(id, cleanedData);
      router.push("/user/address");
    } catch (err) {
      console.error("Update failed", err);
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

  if (!SingleAddress || Object.keys(SingleAddress)?.length === 0) {
    return <div>Loading address data...</div>;
  }

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
        label="Label"
        type="text"
        placeholder="Address label (optional)"
        icon={FiFlag}
        {...register('label')}
        errorMessage={errors.label?.message}
      />

      <UserInput
        label="Your Name"
        type="text"
        placeholder="Your Name"
        icon={FiUser}
        {...register('name')}
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
        label="Postal Code"
        type="text"
        placeholder="Postal Code (optional)"
        icon={FiHash}
        {...register('postal_code')}
        errorMessage={errors.postal_code?.message}
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
        {loading ? 'Updating...' : 'Update Address'}
      </FormButton>
    </FormWrapper>
  );
}
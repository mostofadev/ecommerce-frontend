'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import FormWrapper from '@/app/components/ui/form/FormWrapper';
import UserInput from '@/app/components/ui/User/userInput';
import { addressSchema } from '@/schemas/addressSchema';

export const UserSelectInput = ({ label, options, errorMessage, control, name , disabled = false,}) =>{
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            {...field}
            disabled={disabled}
            className={`py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all px-4 text-sm text-gray-400 ${
              errorMessage ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      />
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </div>
  );
}
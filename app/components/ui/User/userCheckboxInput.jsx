import React from "react";
import { Controller } from "react-hook-form";

export const CheckboxInput = ({ label, name, control }) => {
  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <input
            type="checkbox"
            id={name}
            checked={field.value ?? false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
        )}
      />
      <label htmlFor={name} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

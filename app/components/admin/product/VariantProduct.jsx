"use client";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextInput from "../../ui/form/input";
import CloseIcon from "@mui/icons-material/Close";

export default function VariantMatrix({ name = "variants" }) {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name, // e.g. "variants"
  });

  const addCombination = () => {
    append({ size: "", color: "#000000", quantity: 0 });
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Variants (Size + Color + Quantity)
      </h3>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-wrap items-end gap-4 p-4 border border-gray-200 rounded-md bg-white"
          >
            <div className="flex-1 min-w-[150px]">
              <TextInput
                label="Size"
                placeholder="e.g. M"
                {...register(`${name}.${index}.size`)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="color"
                {...register(`${name}.${index}.color`)}
                defaultValue={field.color || "#000000"}
                className="w-12 h-10 border border-gray-300 rounded-md"
                title="Pick color"
              />
            </div>

            <div className="flex-1 min-w-[150px]">
              <TextInput
                label="Quantity"
                type="number"
                placeholder="e.g. 5"
                {...register(`${name}.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="self-center">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={addCombination}
          className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          + Add Variant
        </button>
      </div>
    </div>
  );
}

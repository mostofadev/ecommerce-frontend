"use client";

import { useForm } from "react-hook-form";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";
import UserInput from "@/app/components/ui/User/userInput";
import { Button } from "@/app/components/admin/order/Button";

import { FiLock, FiShield, FiUnlock, FiEye, FiEyeOff } from "react-icons/fi";
import FormButton from "@/app/components/ui/button/FormBtn";

export default function PasswordForm() {
  const { hasPassword, changePassword, checkPasswordStatus } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isValid},
  } = useForm(
   
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Password visibility toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage(null);
      await changePassword(data);
      await checkPasswordStatus();
      reset();
      setMessage({
        type: "success",
        text: "Password updated successfully.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          err.response?.data?.errors?.new_password?.[0] ||
          "Failed to update password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center lg:px-4 mt-10 ">
      <div className=" rounded-xl lg:p-8 space-y-8  w-full max-w-2xl ">
        <h2 className="text-2xl font-bold text-gray-800">
          {hasPassword ? "Change Password" : "Set Your Password"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {hasPassword && (
            <UserInput
              label="Current Password"
              type={showCurrent ? "text" : "password"}
              icon={FiUnlock}
              {...register("current_password", {
                required: "Current password is required",
              })}
              errorMessage={errors.current_password?.message}
              showPasswordToggle={true}
              showPasswordIcon={showCurrent ? FiEyeOff : FiEye}
              onToggleShowPassword={() => setShowCurrent(!showCurrent)}
            />
          )}

          <UserInput
            label="New Password"
            type={showNew ? "text" : "password"}
            icon={FiLock}
            {...register("new_password", {
              required: "New password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
            })}
            errorMessage={errors.new_password?.message}
            showPasswordToggle={true}
            showPasswordIcon={showNew ? FiEyeOff : FiEye}
            onToggleShowPassword={() => setShowNew(!showNew)}
          />

          <UserInput
            label="Confirm New Password"
            type={showConfirm ? "text" : "password"}
            icon={FiShield}
            {...register("new_password_confirmation", {
              required: "Please confirm your password",
            })}
            errorMessage={errors.new_password_confirmation?.message}
            showPasswordToggle={true}
            showPasswordIcon={showConfirm ? FiEyeOff : FiEye}
            onToggleShowPassword={() => setShowConfirm(!showConfirm)}
          />

          <div className="flex justify-center gap-4">
            <FormButton
              type="submit"
              ClassName="w-full"
              loading={loading}
              disabled={!isValid}
              IsValid={isValid}
            >
            {hasPassword
                ? "Change Password"
                : "Set Password"}
            </FormButton>
          </div>

          {message && (
            <p
              className={`text-sm mt-2 ${
                message.type === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

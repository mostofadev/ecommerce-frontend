"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useUserAuthContext } from "@/app/context/UserAuthContext";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import OtpStep from "./OtpStep";
import GoogleLoginButton from "./GoogleLogin";
import { showCustomToast } from "@/app/lib/showCustomToast";

export default function LoginPage() {
  const [step, setStep] = useState("email"); // email | password | otp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  const router = useRouter();
  const { fetchProfile } = useUser();
  const { sendOtpToEmail, checkUserEmail, loginWithPwd, loginWithOtpCode } =
    useUserAuthContext();

  const sendOtpEmail = async (email) => {
    try {
      await sendOtpToEmail(email);

      showCustomToast({
        title: "OTP Successfully send",
        message: "OTP sent to your email",
        type: "success",
      });
    } catch (error) {
      showCustomToast({
        title: "OTP Failed",
        message: "Failed to send OTP",
        type: "error",
      });
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const res = await checkUserEmail({ email });
      if (res.exists) {
        setHasPassword(res.has_password);
        if (res.has_password) {
          setStep("password");
        } else {
          await sendOtpEmail(email);
          setStep("otp");
        }
      } else {
        await sendOtpEmail(email);
        setStep("otp");
      }
    } catch (err) {
      showCustomToast({
        title: "Email check failed",
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginWithPwd({ email, password });
      await fetchProfile();
      router.push("/");
    } catch (err) {
      showCustomToast({
        title: "Invalid credentials",
        message: "Invalid email or password. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async () => {
    setLoading(true);
    try {
      await loginWithOtpCode({ email, otp });
      await fetchProfile();
      router.push("/user/profile");
    } catch (err) {
      showCustomToast({
        title: "Invalid OTP",
        message: "OTP is incorrect. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtpFromPasswordStep = async () => {
    setLoading(true);
    try {
      await sendOtpEmail(email);
      setStep("otp");
    } catch (err) {
      showCustomToast({
        title: "OTP Failed",
        message: "Failed to send OTP",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center py-6 justify-center bg-gray-100 px-2 sm:px-8">
      <div className="w-full max-w-md p-4 sm:p-5 bg-white rounded-2xl shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Login to access your dashboard
        </p>

        {step === "email" && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            handleNext={handleNext}
            loading={loading}
          />
        )}

        {step === "password" && (
          <PasswordStep
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            loading={loading}
            onSendOtp={handleSendOtpFromPasswordStep}
          />
        )}

        {step === "otp" && (
          <OtpStep
            otp={otp}
            setOtp={setOtp}
            handleOtpLogin={handleOtpLogin}
            loading={loading}
          />
        )}

        <div className="relative text-center text-sm text-gray-400">
          <span className="bg-white px-4 z-10 relative">or continue with</span>
          <div className="absolute inset-0 top-2 border-t border-gray-300"></div>
        </div>

        <div>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}

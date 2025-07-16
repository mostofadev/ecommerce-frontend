"use client";
import { useEffect } from "react";
import { showCustomToast } from "@/app/lib/showCustomToast";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/ui/loader/pageSpinner";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    showCustomToast({
      title: "Payment Successful",
      message: "Your payment has been completed successfully.",
      type: "success",
    });

    const timer = setTimeout(() => {
      router.push("/");
    }, 2000); // ২ সেকেন্ড পর redirect

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader />
      <p className="mt-4 text-gray-600">Redirecting to homepage...</p>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { showCustomToast } from "@/app/lib/showCustomToast";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/ui/loader/pageSpinner";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    showCustomToast({
  title: "Order Confirmed",
  message: "Your order has been placed with Cash on Delivery. Please keep the payment ready.",
  type: "success",
});

    const timer = setTimeout(() => {
      router.push("/");
    }, 500); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader />
      <p className="mt-4 text-gray-600">Redirecting to homepage...</p>
    </div>
  );
}

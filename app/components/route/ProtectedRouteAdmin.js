'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRouteAdmin = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
      } else {
        setHasToken(true);
      }
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) return null; // অথবা loading spinner দেখাতে পারো

  return hasToken ? children : null;
};

export default ProtectedRouteAdmin;

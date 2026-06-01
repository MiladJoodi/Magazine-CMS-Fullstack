"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/auth/auth-provider";

export function RegisterRedirect() {
  const router = useRouter();
  const { isReady, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isReady && isLoggedIn) {
      router.replace("/");
    }
  }, [isReady, isLoggedIn, router]);

  return null;
}

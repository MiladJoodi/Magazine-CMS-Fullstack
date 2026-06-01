"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/auth/auth-provider";

export function LoginRedirect() {
  const router = useRouter();
  const { isReady, isLoggedIn, isAdmin, isAuthor } = useAuth();

  useEffect(() => {
    if (isReady && isLoggedIn) {
      if (isAdmin) {
        router.replace("/admin");
      } else if (isAuthor) {
        router.replace("/admin/posts");
      } else {
        router.replace("/");
      }
    }
  }, [isReady, isLoggedIn, isAdmin, isAuthor, router]);

  return null;
}

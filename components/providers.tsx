"use client";

import { AuthProvider } from "@/components/auth/auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

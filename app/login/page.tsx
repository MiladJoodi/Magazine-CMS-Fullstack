import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { LoginRedirect } from "@/components/auth/login-redirect";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login | Northline",
  description: "Sign in to the Northline CMS (demo).",
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Sign in</CardTitle>
            <p className="text-sm text-muted-foreground">
              Access the Northline CMS to manage posts and settings.
            </p>
          </CardHeader>
          <CardContent>
            <LoginRedirect />
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link href="/register" className="font-medium underline-offset-4 hover:underline">
                Create one
              </Link>
              {" · "}
              <Link href="/" className="underline-offset-4 hover:underline">
                Back to site
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}

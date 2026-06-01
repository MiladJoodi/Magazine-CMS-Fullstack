import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";
import { RegisterRedirect } from "@/components/auth/register-redirect";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign up | Northline",
  description: "Create a Northline reader account (demo).",
};

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Create account</CardTitle>
            <p className="text-sm text-muted-foreground">
              Join Northline to comment and follow stories. CMS access requires an
              admin account.
            </p>
          </CardHeader>
          <CardContent>
            <RegisterRedirect />
            <RegisterForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
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

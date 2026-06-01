import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default function CategoryNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-semibold">Category not found</h1>
        <p className="max-w-md text-muted-foreground">
          We could not find that topic. Browse all categories instead.
        </p>
        <Button render={<Link href="/categories" />}>All categories</Button>
      </main>
      <SiteFooter />
    </>
  );
}

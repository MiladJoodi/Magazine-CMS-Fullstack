import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button-link";

export default function PostNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-semibold">Story not found</h1>
        <p className="max-w-md text-muted-foreground">
          The article you are looking for may have been moved or removed.
        </p>
        <ButtonLink href="/">Return home</ButtonLink>
      </main>
      <SiteFooter />
    </>
  );
}

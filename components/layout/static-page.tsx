import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type StaticPageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function StaticPage({ title, description, children }: StaticPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <header className="mb-10 space-y-3 border-b pb-8">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="text-lg text-muted-foreground">{description}</p>
            ) : null}
          </header>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { Search } from "lucide-react";

import { SiteHeaderAuth } from "@/components/layout/site-header-auth";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="font-heading text-xl font-semibold tracking-tight">
            Northline
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex w-full flex-col gap-3 sm:max-w-md sm:flex-row sm:items-center sm:justify-end">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search stories..."
              className="pl-8"
              aria-label="Search stories"
              readOnly
            />
          </div>
          <SiteHeaderAuth />
        </div>
      </div>
      <nav
        className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 pb-3 md:hidden"
        aria-label="Main mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 text-sm font-medium text-muted-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Separator />
    </header>
  );
}

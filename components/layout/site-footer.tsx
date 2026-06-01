import Link from "next/link";

import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="font-heading text-lg font-semibold">The Daily Chronicle</p>
            <p className="text-sm text-muted-foreground">
              Independent reporting on culture, cities, and the ideas shaping how we
              live. Stories worth your attention.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} The Daily Chronicle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";

import { Separator } from "@/components/ui/separator";

const authorLinks = [
  { href: "https://github.com/MiladJoodi", label: "GitHub" },
  { href: "https://www.linkedin.com/in/joodi/", label: "LinkedIn" },
  {
    href: "https://github.com/MiladJoodi/magazine-cms-fullstack",
    label: "Source code",
  },
];

const footerLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
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
        <div className="flex flex-col items-center gap-3 text-center text-xs text-muted-foreground sm:items-start sm:text-left">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start">
            <span>
              Made with{" "}
              <span className="text-red-500" aria-hidden>
                ♥
              </span>{" "}
              by{" "}
              <a
                href="https://github.com/MiladJoodi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-foreground"
              >
                Milad Joodi
              </a>
            </span>
            <span className="hidden text-muted-foreground/50 sm:inline" aria-hidden>
              ·
            </span>
            <nav
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start"
              aria-label="Author links"
            >
              {authorLinks.map((link, index) => (
                <span key={link.label} className="inline-flex items-center gap-3">
                  {index > 0 ? (
                    <span className="text-muted-foreground/50" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>
          </p>
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/MiladJoodi/magazine-cms-fullstack"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              magazine-cms-fullstack
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

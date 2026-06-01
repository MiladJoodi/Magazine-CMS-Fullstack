import type { Metadata } from "next";
import Link from "next/link";

import { StaticPage } from "@/components/layout/static-page";

export const metadata: Metadata = {
  title: "About | Northline",
  description:
    "Learn about Northline — independent magazine-style reporting and the team behind the platform.",
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Northline"
      description="Independent reporting on culture, cities, and the ideas shaping how we live."
    >
      <p className="text-foreground">
        Northline is an editorial magazine demo built to explore how modern
        news and culture sites can feel fast, readable, and trustworthy on the web.
      </p>
      <p>
        We cover urbanism, media, travel, science, and everyday culture—with room for
        long-form stories, trending sidebars, and thoughtful comment threads once the
        full backend is connected.
      </p>
      <p>
        This project is a <strong className="font-medium text-foreground">portfolio full-stack build</strong> by{" "}
        <a
          href="https://github.com/MiladJoodi"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Milad Joodi
        </a>
        , focused on Next.js, TypeScript, and a clear path to Prisma, PostgreSQL, and
        REST APIs for posts, views, and comments.
      </p>
      <p>
        Have a question or want to collaborate? Visit the{" "}
        <Link href="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
          Contact
        </Link>{" "}
        page—or explore the latest stories on the{" "}
        <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
          homepage
        </Link>
        .
      </p>
    </StaticPage>
  );
}

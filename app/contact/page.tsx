import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { StaticPage } from "@/components/layout/static-page";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Contact | Northline",
  description: "Get in touch with Milad Joodi about the Northline portfolio project.",
};

const contactLinks = [
  {
    label: "Email",
    href: "mailto:MiladJoodi1@gmail.com",
    value: "MiladJoodi1@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joodi/",
    value: "linkedin.com/in/joodi",
  },
  {
    label: "GitHub",
    href: "https://github.com/MiladJoodi",
    value: "github.com/MiladJoodi",
  },
  {
    label: "Source code",
    href: "https://github.com/MiladJoodi/magazine-cms-fullstack",
    value: "magazine-cms-fullstack",
  },
];

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact"
      description="Reach out about this project, collaborations, or opportunities."
    >
      <p className="text-foreground">
        Whether you are hiring, reviewing portfolio work, or want to discuss a
        collaboration, I would love to hear from you.
      </p>

      <ul className="space-y-4 rounded-xl border bg-card p-6">
        {contactLinks.map((item) => (
          <li key={item.label}>
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <a
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="text-sm transition-colors hover:text-foreground"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>

      <Separator />

      <div className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Send a message
        </h2>
        <p className="text-sm">
          Try the demo form below—a fake send with success feedback. Real delivery will
          connect to the API later.
        </p>
        <ContactForm />
      </div>
    </StaticPage>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PostBackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden />
      Back to home
    </Link>
  );
}

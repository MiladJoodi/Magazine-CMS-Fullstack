"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminSettingsForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");
  const [siteName, setSiteName] = useState("Northline");
  const [tagline, setTagline] = useState(
    "Stories on culture, cities, and ideas"
  );
  const [postsPerPage, setPostsPerPage] = useState("6");
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="animate-in fade-in zoom-in-95 max-w-lg rounded-xl border border-green-500/30 bg-green-500/5 px-6 py-8 text-center"
        role="status"
      >
        <CheckCircle2
          className="mx-auto size-10 text-green-600 dark:text-green-400"
          aria-hidden
        />
        <p className="mt-3 font-heading text-lg font-semibold">Settings saved (demo)</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Values stay in memory until you connect a real backend.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Edit again
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-6 rounded-xl border bg-card p-6"
    >
      <div className="space-y-2">
        <label htmlFor="siteName" className="text-sm font-medium">
          Site name
        </label>
        <Input
          id="siteName"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          disabled={status === "saving"}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="tagline" className="text-sm font-medium">
          Tagline
        </label>
        <Input
          id="tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          disabled={status === "saving"}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="postsPerPage" className="text-sm font-medium">
          Posts on homepage
        </label>
        <Input
          id="postsPerPage"
          type="number"
          min={1}
          max={20}
          value={postsPerPage}
          onChange={(e) => setPostsPerPage(e.target.value)}
          disabled={status === "saving"}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={commentsEnabled}
          onChange={(e) => setCommentsEnabled(e.target.checked)}
          disabled={status === "saving"}
          className="size-4 rounded border-input"
        />
        Enable comments on articles
      </label>
      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Saving...
          </>
        ) : (
          "Save settings"
        )}
      </Button>
    </form>
  );
}

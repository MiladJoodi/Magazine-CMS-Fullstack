"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDemoCategory } from "@/lib/mock";
import { cn } from "@/lib/utils";

type CategoryFormProps = {
  onAdded?: () => void;
};

export function CategoryForm({ onAdded }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("saving");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const result = addDemoCategory({ name, description });
    setStatus("idle");

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setName("");
    setDescription("");
    setStatus("success");
    onAdded?.();
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-card p-5"
    >
      <h3 className="font-heading text-lg font-semibold">Add category</h3>
      <div className="space-y-2">
        <label htmlFor="category-name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Technology"
          required
          disabled={status === "saving"}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="category-description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="category-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short blurb shown on the category page."
          required
          disabled={status === "saving"}
          className={cn(
            "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          )}
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <p className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-4" aria-hidden />
          Category added (saved in browser for demo).
        </p>
      ) : null}
      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Adding...
          </>
        ) : (
          "Add category"
        )}
      </Button>
    </form>
  );
}

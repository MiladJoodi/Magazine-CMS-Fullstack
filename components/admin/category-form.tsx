"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateCategory } from "@/lib/hooks/use-categories";
import { createCategorySchema } from "@/lib/validations/category";
import { cn } from "@/lib/utils";

export function CategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState("");

  const create = useCreateCategory();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    setLocalError("");

    const parsed = createCategorySchema.safeParse({ name, description });
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0].message);
      return;
    }

    create.mutate(
      { name: parsed.data.name, description: parsed.data.description },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        },
      }
    );
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
          disabled={create.isPending}
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
          disabled={create.isPending}
          className={cn(
            "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          )}
        />
      </div>

      {localError ? (
        <p className="text-sm text-destructive" role="alert">{localError}</p>
      ) : null}

      {create.error ? (
        <p className="text-sm text-destructive" role="alert">
          {create.error.message}
        </p>
      ) : null}

      {success ? (
        <p className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-4" aria-hidden />
          Category saved to database
        </p>
      ) : null}

      <Button type="submit" disabled={create.isPending}>
        {create.isPending ? (
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
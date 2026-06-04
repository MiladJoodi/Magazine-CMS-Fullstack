"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateCategory } from "@/lib/hooks/use-categories";
import type { Category } from "@/lib/types/category";
import { updateCategorySchema } from "@/lib/validations/category";
import { cn } from "@/lib/utils";

type CategoryEditFormProps = {
  category: Category;
  onCancel: () => void;
  onSaved: () => void;
};

export function CategoryEditForm({
  category,
  onCancel,
  onSaved,
}: CategoryEditFormProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [localError, setLocalError] = useState("");

  const update = useUpdateCategory();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalError("");

    const parsed = updateCategorySchema.safeParse({ name, description });
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0].message);
      return;
    }


    update.mutate(
      {
        slug: category.slug,
        input: {
          name: parsed.data.name,
          description: parsed.data.description,
        },
      },
      { onSuccess: () => onSaved() }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border bg-muted/30 p-4">
      <p className="text-xs text-muted-foreground">
        Editing <span className="font-medium">{category.slug}</span> (slug cannot change)
      </p>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={update.isPending}
      />

      <textarea
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        disabled={update.isPending}
        className={cn(
          "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
      />

      {localError ? (
        <p className="text-sm text-destructive" role="alert">{localError}</p>
      ) : null}

      {update.error ? (
        <p className="text-sm text-destructive">{update.error.message}</p>
      ) : null}

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={update.isPending}>
          {update.isPending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
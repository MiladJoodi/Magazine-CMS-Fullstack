"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type DeleteResult = { ok: true } | { ok: false; error: string };

type CmsDeleteButtonProps = {
  itemLabel: string;
  disabled?: boolean;
  disabledTitle?: string;
  onDelete: () => Promise<DeleteResult> | DeleteResult;
  onDeleted?: () => void;
};

export function CmsDeleteButton({
  itemLabel,
  disabled = false,
  disabledTitle,
  onDelete,
  onDeleted,
}: CmsDeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setError("");
    const result = await Promise.resolve(onDelete());
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setConfirming(false);
    onDeleted?.();
  }

  if (confirming) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex flex-wrap justify-end gap-1">
          <Button
            type="button"
            variant="destructive"
            size="xs"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={() => {
              setConfirming(false);
              setError("");
            }}
          >
            Cancel
          </Button>
        </div>
        <span className="max-w-[12rem] text-right text-xs text-muted-foreground">
          Delete {itemLabel}?
        </span>
        {error ? (
          <span className="max-w-[14rem] text-right text-xs text-destructive" role="alert">
            {error}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={disabled}
      title={disabled ? disabledTitle : `Delete ${itemLabel}`}
      onClick={() => setConfirming(true)}
    >
      <Trash2 className="size-3.5" aria-hidden />
      Delete
    </Button>
  );
}

import { cn } from "@/lib/utils";

export const selectClassName = cn(
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
);

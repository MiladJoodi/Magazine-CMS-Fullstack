import { cn } from "@/lib/utils";

type AspectRatio = "video" | "square" | "wide";

const aspectClasses: Record<AspectRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

type ImagePlaceholderProps = {
  aspectRatio?: AspectRatio;
  className?: string;
};

export function ImagePlaceholder({
  aspectRatio = "video",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label="Image placeholder"
      className={cn(
        "w-full shrink-0 rounded-md border border-dashed border-muted-foreground/30 bg-muted",
        aspectClasses[aspectRatio],
        className
      )}
    />
  );
}

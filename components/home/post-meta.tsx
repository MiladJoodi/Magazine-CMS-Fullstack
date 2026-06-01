import { Eye, MessageSquare } from "lucide-react";

import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

type PostMetaProps = {
  viewCount: number;
  commentCount: number;
  className?: string;
  size?: "sm" | "default";
};

export function PostMeta({
  viewCount,
  commentCount,
  className,
  size = "default",
}: PostMetaProps) {
  const iconClass = size === "sm" ? "size-3.5" : "size-4";
  const textClass = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground",
        textClass,
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Eye className={iconClass} aria-hidden />
        <span>{formatCount(viewCount)} views</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MessageSquare className={iconClass} aria-hidden />
        <span>{formatCount(commentCount)} comments</span>
      </span>
    </div>
  );
}

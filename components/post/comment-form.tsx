"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Comment } from "@/lib/types/post";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "success";

type CommentFormProps = {
  postSlug: string;
  onCommentPosted?: (comment: Comment) => void;
};

export function CommentForm({ postSlug, onCommentPosted }: CommentFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !body.trim()) {
      return;
    }

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newComment: Comment = {
      id: `${postSlug}-user-${Date.now()}`,
      author: name.trim(),
      publishedAt: new Date().toISOString(),
      body: body.trim(),
    };

    onCommentPosted?.(newComment);
    setStatus("success");
  }

  function handleReset() {
    setName("");
    setBody("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        className="animate-in fade-in zoom-in-95 rounded-xl border border-green-500/30 bg-green-500/5 px-6 py-8 text-center duration-500"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="mx-auto size-10 text-green-600 dark:text-green-400"
          aria-hidden
        />
        <p className="mt-3 font-heading text-lg font-semibold text-foreground">
          Your comment has been posted!
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Demo only—nothing was saved to a database, but it appears in the list
          below.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={handleReset}
        >
          Write another comment
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-xl border bg-card p-5"
      onSubmit={handleSubmit}
      aria-label="Leave a comment"
      noValidate
    >
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Leave a comment
      </h3>
      <div className="space-y-2">
        <label htmlFor={`comment-name-${postSlug}`} className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id={`comment-name-${postSlug}`}
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "sending"}
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor={`comment-body-${postSlug}`}
          className="text-sm font-medium text-foreground"
        >
          Comment
        </label>
        <textarea
          id={`comment-body-${postSlug}`}
          name="comment"
          rows={4}
          placeholder="Share your thoughts..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={status === "sending"}
          required
          className={cn(
            "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base text-foreground transition-colors outline-none",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
          )}
        />
      </div>
      <Button type="submit" disabled={status === "sending"} className="min-w-[140px]">
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Posting...
          </>
        ) : (
          "Post comment"
        )}
      </Button>
    </form>
  );
}

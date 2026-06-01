"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, getAllAuthorsMerged } from "@/lib/mock";
import { selectClassName } from "@/lib/select-styles";

type PostEditorFormProps = {
  mode?: "create" | "edit";
  initialTitle?: string;
  initialAuthor?: string;
  initialCategory?: string;
};

export function PostEditorForm({
  mode = "create",
  initialTitle = "",
  initialAuthor = "Milad Joodi",
  initialCategory,
}: PostEditorFormProps) {
  const router = useRouter();
  const { isAdmin, isAuthor, user, isReady: authReady } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");
  const [authorOptions, setAuthorOptions] = useState<string[]>([]);
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<string>(
    initialCategory ?? CATEGORIES[0] ?? "Urbanism"
  );
  const [author, setAuthor] = useState(initialAuthor);
  const [body, setBody] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (!authReady) {
      return;
    }

    if (isAuthor && user) {
      setAuthor(user.name);
      setAuthorOptions([user.name]);
      return;
    }

    const names = getAllAuthorsMerged().map((a) => a.name);
    setAuthorOptions(names);
    setAuthor((current) => {
      if (names.includes(current)) {
        return current;
      }
      if (names.includes(initialAuthor)) {
        return initialAuthor;
      }
      return names[0] ?? current;
    });
  }, [initialAuthor, isAuthor, user, authReady]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      return;
    }
    setStatus("saving");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="animate-in fade-in zoom-in-95 mx-auto max-w-lg rounded-xl border border-green-500/30 bg-green-500/5 px-6 py-10 text-center duration-500"
        role="status"
      >
        <CheckCircle2
          className="mx-auto size-10 text-green-600 dark:text-green-400"
          aria-hidden
        />
        <p className="mt-3 font-heading text-xl font-semibold">
          Post saved (demo)
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect Prisma and the API to persist posts to the live site.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>
            Back to posts
          </Button>
          <Button
            type="button"
            onClick={() => {
              setStatus("idle");
              setTitle("");
              setSlug("");
              setExcerpt("");
              setBody("");
            }}
          >
            Create another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-card p-6"
    >
      <div>
        <h2 className="font-heading text-xl font-semibold">
          {mode === "create" ? "New post" : "Edit post"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the fields below. Saving is simulated for the portfolio demo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
            disabled={status === "saving"}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug
          </label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-from-title"
            disabled={status === "saving"}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={status === "saving"}
            className={selectClassName}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="author" className="text-sm font-medium">
            Author
          </label>
          {isAdmin ? (
            <>
              <select
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={status === "saving" || authorOptions.length === 0}
                className={selectClassName}
              >
                {authorOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                Add more names under{" "}
                <a href="/admin/authors" className="underline-offset-4 hover:underline">
                  Authors
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <Input
                id="author"
                value={user?.name ?? author}
                readOnly
                disabled
                className="bg-muted"
                aria-describedby="author-locked-hint"
              />
              <p id="author-locked-hint" className="text-xs text-muted-foreground">
                Posts are published under your account. Only admins can assign a
                different author.
              </p>
            </>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            disabled={status === "saving"}
            className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="body" className="text-sm font-medium">
            Body
          </label>
          <textarea
            id="body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your article. One paragraph per line."
            disabled={status === "saving"}
            className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          />
        </div>
        {isAdmin ? (
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              disabled={status === "saving"}
              className="size-4 rounded border-input"
            />
            Feature on homepage
          </label>
        ) : null}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={status === "saving"}>
          {status === "saving" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Saving...
            </>
          ) : (
            "Save post"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={status === "saving"}
          onClick={() => router.push("/admin/posts")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

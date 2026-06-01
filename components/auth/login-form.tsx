"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DEMO_ADMIN_PASSWORD,
  DEMO_ADMIN_USERNAME,
  DEMO_AUTHOR_PASSWORD,
  DEMO_AUTHOR_USERNAME,
} from "@/lib/auth/demo-auth";

export function LoginForm() {
  const router = useRouter();
  const { login, loginAsAdminDemo, loginAsAuthorDemo } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const loggedInUser = login(username, password);
    setIsSubmitting(false);

    if (!loggedInUser) {
      setError("Invalid username or password.");
      return;
    }

    if (loggedInUser.role === "admin") {
      router.push("/admin");
    } else if (loggedInUser.role === "author") {
      router.push("/admin/posts");
    } else {
      router.push("/");
    }
    router.refresh();
  }

  function handleDemoAdmin() {
    loginAsAdminDemo();
    router.push("/admin");
    router.refresh();
  }

  function handleDemoAuthor() {
    loginAsAuthorDemo();
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-foreground">
            Username
          </label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            placeholder={DEMO_ADMIN_USERNAME}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Demo</span>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleDemoAdmin}
        >
          Enter as admin
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleDemoAuthor}
        >
          Enter as author
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        Admin:{" "}
        <code className="rounded bg-muted px-1 py-0.5">{DEMO_ADMIN_USERNAME}</code> /{" "}
        <code className="rounded bg-muted px-1 py-0.5">{DEMO_ADMIN_PASSWORD}</code>
        <br />
        Author:{" "}
        <code className="rounded bg-muted px-1 py-0.5">{DEMO_AUTHOR_USERNAME}</code> /{" "}
        <code className="rounded bg-muted px-1 py-0.5">{DEMO_AUTHOR_PASSWORD}</code>
      </p>
    </div>
  );
}

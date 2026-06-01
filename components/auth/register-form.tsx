"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success";

export function RegisterForm() {
  const router = useRouter();
  const { register, login } = useAuth();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = register({ name, email, username, password });
    if (!result.ok) {
      setStatus("idle");
      setError(result.error);
      return;
    }

    login(username, password);
    setStatus("success");

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);
  }

  if (status === "success") {
    return (
      <div
        className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-4 py-4 text-center duration-500"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="size-12 text-green-600 dark:text-green-400"
          aria-hidden
        />
        <div className="space-y-2">
          <p className="font-heading text-xl font-semibold text-foreground">
            Account created!
          </p>
          <p className="text-sm text-muted-foreground">
            Welcome to Northline. Redirecting you to the homepage…
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="reg-name" className="text-sm font-medium text-foreground">
          Full name
        </label>
        <Input
          id="reg-name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="reg-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="reg-username" className="text-sm font-medium text-foreground">
          Username
        </label>
        <Input
          id="reg-username"
          name="username"
          autoComplete="username"
          placeholder="joodi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="reg-password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <Input
          id="reg-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="reg-confirm"
          className="text-sm font-medium text-foreground"
        >
          Confirm password
        </label>
        <Input
          id="reg-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
      <p className={cn("text-center text-xs text-muted-foreground")}>
        Demo only — accounts are stored in your browser, not on a server.
      </p>
    </form>
  );
}

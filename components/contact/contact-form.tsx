"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  function handleReset() {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/5 px-6 py-10 text-center duration-500"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-12 text-green-600 dark:text-green-400" aria-hidden />
        <div className="space-y-2">
          <p className="font-heading text-xl font-semibold text-foreground">
            Your message has been sent!
          </p>
          <p className="text-sm text-muted-foreground">
            Thanks for reaching out. This is a demo—no email was actually sent, but
            your form worked.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleReset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      aria-label="Contact form"
      noValidate
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "sending"}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "sending"}
          required
          className={cn(
            "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base text-foreground transition-colors outline-none",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={status === "sending"}
        className="min-w-[140px]"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

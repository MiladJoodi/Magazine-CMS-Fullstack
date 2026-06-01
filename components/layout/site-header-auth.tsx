"use client";

import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export function SiteHeaderAuth() {
  const { isReady, isAdmin, isAuthor, canAccessCms, isLoggedIn, user, logout } =
    useAuth();

  if (!isReady) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" aria-hidden />
    );
  }

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden max-w-[120px] truncate text-sm text-muted-foreground sm:inline">
          {user.name}
        </span>
        {canAccessCms ? (
          <ButtonLink
            href={isAuthor ? "/admin/posts" : "/admin"}
            variant="outline"
            size="sm"
          >
            <LayoutDashboard aria-hidden />
            CMS
          </ButtonLink>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
        >
          <LogOut aria-hidden />
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <ButtonLink href="/register" variant="outline" size="sm">
        <UserPlus aria-hidden />
        Sign up
      </ButtonLink>
      <ButtonLink href="/login" variant="default" size="sm">
        <LogIn aria-hidden />
        Login
      </ButtonLink>
    </div>
  );
}

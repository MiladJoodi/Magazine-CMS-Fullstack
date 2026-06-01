"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

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
          <Button
            variant="outline"
            size="sm"
            render={<Link href={isAuthor ? "/admin/posts" : "/admin"} />}
          >
            <LayoutDashboard aria-hidden />
            CMS
          </Button>
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
      <Button variant="outline" size="sm" render={<Link href="/register" />}>
        <UserPlus aria-hidden />
        Sign up
      </Button>
      <Button variant="default" size="sm" render={<Link href="/login" />}>
        <LogIn aria-hidden />
        Login
      </Button>
    </div>
  );
}

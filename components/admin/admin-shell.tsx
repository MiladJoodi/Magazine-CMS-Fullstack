"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
  { href: "/admin/posts", label: "Posts", icon: FileText, adminOnly: false },
  { href: "/admin/posts/new", label: "New post", icon: PlusCircle, adminOnly: false },
  { href: "/admin/authors", label: "Authors", icon: Users, adminOnly: true },
  { href: "/admin/settings", label: "Settings", icon: Settings, adminOnly: true },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isReady, isAdmin, isAuthor, canAccessCms, user, logout } = useAuth();

  const visibleNav = useMemo(
    () => navItems.filter((item) => !item.adminOnly || isAdmin),
    [isAdmin]
  );

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!canAccessCms) {
      router.replace("/login");
      return;
    }
    if (isAuthor && pathname.startsWith("/admin/authors")) {
      router.replace("/admin/posts");
    }
    if (isAuthor && pathname.startsWith("/admin/settings")) {
      router.replace("/admin/posts");
    }
  }, [isReady, canAccessCms, isAuthor, pathname, router]);

  if (!isReady || !canAccessCms) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20">
        <p className="text-sm text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="flex w-64 shrink-0 flex-col border-r bg-card">
        <div className="space-y-1 border-b p-4">
          <Link href="/admin" className="font-heading text-lg font-semibold">
            Northline CMS
          </Link>
          <p className="text-xs text-muted-foreground">
            {user?.name} · {user?.role}
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="CMS">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : item.href === "/admin/posts"
                  ? pathname === "/admin/posts" ||
                    (pathname.startsWith("/admin/posts/") &&
                      pathname.endsWith("/edit"))
                  : pathname === item.href ||
                    (item.href === "/admin/posts/new" &&
                      pathname === "/admin/posts/new");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t p-3">
          <ButtonLink href="/" variant="outline" size="sm" className="w-full">
            View site
          </ButtonLink>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            <LogOut className="size-4" aria-hidden />
            Log out
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b bg-card px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Demo CMS — changes are not saved to the database yet.
            {isAuthor ? " Author role: posts only." : null}
          </p>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

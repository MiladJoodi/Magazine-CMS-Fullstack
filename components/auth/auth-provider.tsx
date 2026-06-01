"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  authenticateDemoUser,
  createDemoAdminUser,
  createAuthorUser,
  createReaderUser,
  DEMO_ADMIN_USERNAME,
  DEMO_AUTH_STORAGE_KEY,
  DEMO_AUTHOR_USERNAME,
  registerDemoUser,
  type DemoUser,
  type RegisterInput,
} from "@/lib/auth/demo-auth";

type AuthContextValue = {
  user: DemoUser | null;
  isReady: boolean;
  isAdmin: boolean;
  isAuthor: boolean;
  canAccessCms: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => DemoUser | null;
  register: (input: RegisterInput) => { ok: true } | { ok: false; error: string };
  loginAsAdminDemo: () => void;
  loginAsAuthorDemo: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): DemoUser | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = sessionStorage.getItem(DEMO_AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

function persistUser(user: DemoUser | null) {
  if (typeof window === "undefined") {
    return;
  }
  if (user) {
    sessionStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setIsReady(true);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const nextUser = authenticateDemoUser(username, password);
    if (!nextUser) {
      return null;
    }
    persistUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback((input: RegisterInput) => {
    return registerDemoUser(input);
  }, []);

  const loginAsAdminDemo = useCallback(() => {
    const nextUser = createDemoAdminUser(DEMO_ADMIN_USERNAME);
    persistUser(nextUser);
    setUser(nextUser);
  }, []);

  const loginAsAuthorDemo = useCallback(() => {
    const nextUser = createAuthorUser(DEMO_AUTHOR_USERNAME);
    persistUser(nextUser);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    persistUser(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAdmin: user?.role === "admin",
      isAuthor: user?.role === "author",
      canAccessCms: user?.role === "admin" || user?.role === "author",
      isLoggedIn: Boolean(user),
      login,
      register,
      loginAsAdminDemo,
      loginAsAuthorDemo,
      logout,
    }),
    [user, isReady, login, register, loginAsAdminDemo, loginAsAuthorDemo, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}


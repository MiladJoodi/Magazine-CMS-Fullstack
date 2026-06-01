export const DEMO_AUTH_STORAGE_KEY = "northline-demo-auth";
export const DEMO_USERS_STORAGE_KEY = "northline-demo-users";

export const DEMO_ADMIN_USERNAME = "admin";
export const DEMO_ADMIN_PASSWORD = "admin123";
export const DEMO_AUTHOR_USERNAME = "author";
export const DEMO_AUTHOR_PASSWORD = "author123";

export type DemoUserRole = "admin" | "author" | "reader";

export type DemoUser = {
  name: string;
  role: DemoUserRole;
  username: string;
};

export type RegisteredUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export function isValidDemoCredentials(
  username: string,
  password: string
): boolean {
  return (
    username.trim() === DEMO_ADMIN_USERNAME &&
    password === DEMO_ADMIN_PASSWORD
  );
}

export function createDemoAdminUser(username: string): DemoUser {
  return {
    name: "Milad Joodi",
    role: "admin",
    username: username.trim() || DEMO_ADMIN_USERNAME,
  };
}

export function createReaderUser(
  name: string,
  username: string
): DemoUser {
  return {
    name: name.trim(),
    role: "reader",
    username: username.trim(),
  };
}

export function isValidAuthorCredentials(
  username: string,
  password: string
): boolean {
  return (
    username.trim() === DEMO_AUTHOR_USERNAME &&
    password === DEMO_AUTHOR_PASSWORD
  );
}

export function createAuthorUser(username: string): DemoUser {
  return {
    name: "Staff Writer",
    role: "author",
    username: username.trim() || DEMO_AUTHOR_USERNAME,
  };
}

export function getRegisteredUsers(): RegisteredUser[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(DEMO_USERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as RegisteredUser[];
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users: RegisteredUser[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(DEMO_USERS_STORAGE_KEY, JSON.stringify(users));
}

export function findRegisteredUser(
  username: string,
  password: string
): RegisteredUser | undefined {
  const normalized = username.trim().toLowerCase();
  return getRegisteredUsers().find(
    (user) =>
      user.username.toLowerCase() === normalized && user.password === password
  );
}

export function isUsernameTaken(username: string): boolean {
  const normalized = username.trim().toLowerCase();
  if (normalized === DEMO_ADMIN_USERNAME || normalized === DEMO_AUTHOR_USERNAME) {
    return true;
  }
  return getRegisteredUsers().some(
    (user) => user.username.toLowerCase() === normalized
  );
}

export type RegisterInput = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export function registerDemoUser(
  input: RegisterInput
): { ok: true } | { ok: false; error: string } {
  const name = input.name.trim();
  const email = input.email.trim();
  const username = input.username.trim();

  if (!name || !email || !username || !input.password) {
    return { ok: false, error: "Please fill in all fields." };
  }

  if (username.length < 3) {
    return { ok: false, error: "Username must be at least 3 characters." };
  }

  if (input.password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }

  if (isUsernameTaken(username)) {
    return { ok: false, error: "This username is already taken." };
  }

  const users = getRegisteredUsers();
  users.push({
    name,
    email,
    username,
    password: input.password,
  });
  saveRegisteredUsers(users);

  return { ok: true };
}

export function authenticateDemoUser(
  username: string,
  password: string
): DemoUser | null {
  if (isValidDemoCredentials(username, password)) {
    return createDemoAdminUser(username);
  }

  if (isValidAuthorCredentials(username, password)) {
    return createAuthorUser(username);
  }

  const registered = findRegisteredUser(username, password);
  if (registered) {
    return createReaderUser(registered.name, registered.username);
  }

  return null;
}

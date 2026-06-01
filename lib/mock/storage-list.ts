export function readStorageList(key: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function writeStorageList(key: string, ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(ids));
}

export function addToStorageList(key: string, id: string) {
  const list = readStorageList(key);
  if (!list.includes(id)) {
    list.push(id);
    writeStorageList(key, list);
  }
}

export function removeFromStorageList(key: string, id: string) {
  writeStorageList(
    key,
    readStorageList(key).filter((item) => item !== id)
  );
}

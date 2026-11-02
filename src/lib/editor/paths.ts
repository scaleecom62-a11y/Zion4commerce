/** Read and immutably write nested values by dotted path ("cases.0.metrics.1.value"). */
export function getAt(obj: unknown, path: string): unknown {
  if (!path) return obj;
  return path.split(".").reduce<unknown>((acc, k) => (acc == null ? undefined : (acc as Record<string, unknown>)[k]), obj);
}

export function setAt<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const walk = (node: unknown, i: number): unknown => {
    const k = keys[i];
    const isIndex = /^\d+$/.test(k);
    const base: Record<string, unknown> | unknown[] = Array.isArray(node)
      ? [...node]
      : node && typeof node === "object"
        ? { ...(node as Record<string, unknown>) }
        : isIndex
          ? []
          : {};
    const next = i === keys.length - 1 ? value : walk((base as Record<string, unknown>)[k], i + 1);
    (base as Record<string, unknown>)[k] = next;
    return base;
  };
  return walk(obj, 0) as T;
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

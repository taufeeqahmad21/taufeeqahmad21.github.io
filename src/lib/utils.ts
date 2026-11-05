type ClassValue = string | false | null | undefined;

/** Join class names, skipping falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** true for http(s) links that should open in a new tab. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * Prefix a path in /public with the deploy base path. Static imports and next/link do this
 * automatically; plain <a href> to files in /public (like a résumé PDF) need it.
 */
export function withBasePath(path: string): string {
  if (isExternal(path) || path.startsWith("mailto:") || path.startsWith("#")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** "InvoiceFlow" → "IF", "WA Toolbox" → "WT": capitals first, falling back to the first two letters. */
export function initials(name: string): string {
  const caps = name.match(/[A-Z]/g)?.join("") ?? "";
  return (caps.length >= 2 ? caps : name).slice(0, 2).toUpperCase();
}

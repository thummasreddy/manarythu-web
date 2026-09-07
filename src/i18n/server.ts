import { cookies } from "next/headers";
import en from "@/i18n/messages/en.json";
import te from "@/i18n/messages/te.json";

export type Locale = "en" | "te";

const messages = { en, te } as const;

/** Read the active locale from the cookie set by the client I18nProvider. */
export function getLocale(): Locale {
  const store = cookies();
  const saved = store.get("manarythu.locale")?.value;
  return saved === "te" ? "te" : "en";
}

/** Server-side translate. Resolves nested dot paths and interpolates {vars}. */
export function t(path: string, vars?: Record<string, string | number>): string {
  const locale = getLocale();
  const value = resolve(path, messages[locale]) ?? resolve(path, messages.en) ?? path;
  return typeof value === "string" ? interpolate(value, vars) : path;
}

function resolve(path: string, obj: unknown): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
}

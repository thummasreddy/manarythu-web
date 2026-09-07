"use client";

import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./messages/en.json";
import te from "./messages/te.json";

export type Locale = "en" | "te";

const messageMap = { en, te };

export type TranslateFn = (path: string, vars?: Record<string, string | number>) => string;

export type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslateFn;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "manarythu.locale";

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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const cookieMatch = document.cookie.match(/(?:^|;\s*)manarythu\.locale=(en|te)/);
    const saved =
      (cookieMatch?.[1] as Locale | undefined) ??
      (typeof localStorage !== "undefined" && (localStorage.getItem(STORAGE_KEY) as Locale | null));
    if (saved === "en" || saved === "te") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, l);
    document.cookie = `manarythu.locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.documentElement.lang = l;
  };

  const value = useMemo<I18nContextValue>(() => {
    const t: TranslateFn = (path, vars) => {
      const messages = messageMap[locale];
      const found = resolve(path, messages);
      if (typeof found === "string") return interpolate(found, vars);
      const fallback = resolve(path, messageMap.en);
      if (typeof fallback === "string") return interpolate(fallback, vars);
      return path;
    };
    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}


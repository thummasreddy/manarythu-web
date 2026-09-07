"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <QueryProvider>{children}</QueryProvider>
    </I18nProvider>
  );
}

"use client";

import { useEffect, type ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { QueryProvider } from "./QueryProvider";
import { useCartStore } from "@/lib/store/cart-store";

export function Providers({ children }: { children: ReactNode }) {
  // The persisted cart token survives reloads but the cart payload does not —
  // refresh once on mount so badge/steppers are correct after navigation.
  useEffect(() => {
    void useCartStore.getState().refresh().catch(() => {});
  }, []);
  return (
    <I18nProvider>
      <QueryProvider>{children}</QueryProvider>
    </I18nProvider>
  );
}

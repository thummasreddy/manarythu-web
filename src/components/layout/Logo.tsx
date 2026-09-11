"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function Logo() {
  const { t } = useI18n();
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={t("common.appName")}>
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-soft transition-all group-hover:-translate-y-0.5 group-hover:shadow-elevated md:h-11 md:w-11">
        <Sprout className="relative z-10 h-5 w-5 md:h-6 md:w-6" />
        <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-white/20 blur-sm" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold text-brand-900 md:text-xl">
          {t("common.appName")}
        </span>
        <span className="hidden text-[10px] font-medium uppercase tracking-widest text-brand-500 sm:block">
          {t("common.tagline")}
        </span>
      </span>
    </Link>
  );
}

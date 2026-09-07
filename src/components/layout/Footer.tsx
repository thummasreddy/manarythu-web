"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-brand-100 bg-cream-50 bg-grain">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-soft">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-brand-900">{t("common.appName")}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-brand-600">{t("footer.aboutBody")}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-900">{t("footer.quickLinks")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-600">
            <li><Link className="transition-colors hover:text-brand-700" href="/">{t("nav.home")}</Link></li>
            <li><Link className="transition-colors hover:text-brand-700" href="/categories">{t("nav.categories")}</Link></li>
            <li><Link className="transition-colors hover:text-brand-700" href="/farmers">{t("home.farmersNearYou")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-900">{t("footer.forFarmers")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-600">
            <li><Link className="transition-colors hover:text-brand-700" href="/farmer">Sell on ManaRythu</Link></li>
            <li><Link className="transition-colors hover:text-brand-700" href="/farmer/onboarding">Farmer onboarding</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-900">{t("footer.help")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-600">
            <li><Link className="transition-colors hover:text-brand-700" href="/help">Help center</Link></li>
            <li><Link className="transition-colors hover:text-brand-700" href="/about">About us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-100 py-5 text-center text-xs font-medium text-brand-500">
        {t("footer.rights", { year })}
      </div>
    </footer>
  );
}

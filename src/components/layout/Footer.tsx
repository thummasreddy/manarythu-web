"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-brand-100 bg-white">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-base font-semibold text-brand-700">
            {t("common.appName")}
          </h3>
          <p className="mt-2 text-sm text-brand-600">{t("footer.aboutBody")}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-800">{t("footer.quickLinks")}</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-brand-600">
            <li><Link className="hover:text-brand-700" href="/">{t("nav.home")}</Link></li>
            <li><Link className="hover:text-brand-700" href="/categories">{t("nav.categories")}</Link></li>
            <li><Link className="hover:text-brand-700" href="/farmers">{t("home.farmersNearYou")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-800">{t("footer.forFarmers")}</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-brand-600">
            <li><Link className="hover:text-brand-700" href="/farmer">Sell on ManaRythu</Link></li>
            <li><Link className="hover:text-brand-700" href="/farmer/onboarding">Farmer onboarding</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-800">{t("footer.help")}</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-brand-600">
            <li><Link className="hover:text-brand-700" href="/help">Help center</Link></li>
            <li><Link className="hover:text-brand-700" href="/about">About us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-100 py-4 text-center text-xs text-brand-500">
        {t("footer.rights", { year })}
      </div>
    </footer>
  );
}

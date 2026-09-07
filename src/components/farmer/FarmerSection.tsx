"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { FarmerCard } from "./FarmerCard";
import { ChevronRight } from "lucide-react";
import type { FarmerCardDto } from "@/lib/api/types";

export function FarmerSection({ farmers }: { farmers: FarmerCardDto[] }) {
  const { t } = useI18n();
  if (!farmers.length) return null;
  return (
    <section className="container-page py-6 md:py-8" aria-labelledby="farmers-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="farmers-heading" className="font-display text-xl font-bold text-brand-800 md:text-2xl">
            {t("home.farmersNearYou")}
          </h2>
          <p className="mt-1 text-sm text-brand-500">{t("home.farmersNearYouSubtitle")}</p>
        </div>
        <Link
          href="/farmers"
          className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:flex"
        >
          {t("common.viewAll")}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-5 lg:grid-cols-6 xl:gap-4">
        {farmers.map((f) => (
          <FarmerCard key={f.id} farmer={f} />
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { localized } from "@/lib/utils";
import type { CategoryDto } from "@/lib/api/types";

export function CategoryGrid({ categories }: { categories: CategoryDto[] }) {
  const { t, locale } = useI18n();
  return (
    <section className="container-page py-8 md:py-12" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="section-title mb-6">
        {t("home.categories")}
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 xl:gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-brand-100/80 bg-white/80 p-3 text-center shadow-card backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-card-hover sm:p-4"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-cream-100 text-2xl shadow-inner transition-transform group-hover:scale-110 md:h-16 md:w-16 md:text-3xl">
              {c.icon}
            </span>
            <span className="line-clamp-2 text-xs font-bold text-brand-800 transition-colors group-hover:text-brand-600 md:text-sm">
              {localized(c.name, locale)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

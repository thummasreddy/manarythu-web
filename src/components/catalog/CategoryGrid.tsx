"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { localized } from "@/lib/utils";
import type { CategoryDto } from "@/lib/api/types";

export function CategoryGrid({ categories }: { categories: CategoryDto[] }) {
  const { t, locale } = useI18n();
  return (
    <section className="container-page py-6 md:py-8" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="mb-4 font-display text-xl font-bold text-brand-800 md:text-2xl">
        {t("home.categories")}
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 xl:gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className="card flex flex-col items-center gap-2 p-3 text-center transition-shadow hover:shadow-card-hover"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl md:h-14 md:w-14">
              {c.icon}
            </span>
            <span className="line-clamp-2 text-xs font-medium text-brand-800 md:text-sm">
              {localized(c.name, locale)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { ProductCard } from "./ProductCard";
import type { ProductCardDto } from "@/lib/api/types";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: ProductCardDto[];
  viewAllHref?: string;
}

export function ProductSection({ title, subtitle, products, viewAllHref }: ProductSectionProps) {
  const { t } = useI18n();
  if (!products.length) return null;
  const id = `section-${title.replace(/\s/g, "-").toLowerCase()}`;
  return (
    <section className="container-page py-8 md:py-12" aria-labelledby={id}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 id={id} className="section-title">
            {title}
          </h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden items-center gap-1 rounded-2xl px-3 py-1.5 text-sm font-semibold text-brand-600 transition-all hover:bg-brand-50 hover:text-brand-700 sm:flex"
          >
            {t("common.viewAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

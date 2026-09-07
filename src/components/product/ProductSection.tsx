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
  return (
    <section className="container-page py-6 md:py-8" aria-labelledby={`section-${title.replace(/\s/g, "-").toLowerCase()}`}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2
            id={`section-${title.replace(/\s/g, "-").toLowerCase()}`}
            className="font-display text-xl font-bold text-brand-800 md:text-2xl"
          >
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-brand-500">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:flex"
          >
            {t("common.viewAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

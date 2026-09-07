"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { api, type ProductListParams } from "@/lib/api/endpoints";
import { ProductSection } from "@/components/product/ProductSection";

function getSection(q: string): ProductListParams["section"] | undefined {
  if (q === "deals") return "deals";
  if (q === "organic") return "organic";
  if (q === "fresh") return "fresh";
  if (q === "popular") return "popular";
  if (q === "recent") return "recent";
  return undefined;
}

export function SearchResults() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const farmer = searchParams.get("farmer") ?? undefined;
  const section = getSection(searchParams.get("section") ?? "");
  const sort = searchParams.get("sort") as ProductListParams["sort"] | undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", { q, category, farmer, section, sort }],
    queryFn: () => api.products.list({ q, category, farmer, section, sort, size: 50 }),
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="container-page flex h-80 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-page py-10 text-center text-brand-600">
        {error.message}
      </div>
    );
  }

  const title = q ? `Search results for "${q}"` : t("home.popularProducts");
  return (
    <ProductSection
      title={title}
      products={data ?? []}
    />
  );
}

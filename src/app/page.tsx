import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/catalog/CategoryGrid";
import { ProductSection } from "@/components/product/ProductSection";
import { FarmerSection } from "@/components/farmer/FarmerSection";
import { api } from "@/lib/api/endpoints";
import { t } from "@/i18n/server";
import type { Metadata } from "next";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ManaRythu — Fresh from local farms, direct to you",
  description:
    "Buy fresh, organic and natural produce directly from verified farmers across Telangana. Know your farmer, know where your food comes from.",
  alternates: { canonical: "/" },
};

async function fetchSection(section: "fresh" | "organic" | "deals" | "popular" | "recent") {
  try {
    return await api.products.listServer({ section, size: 10 });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  // Parallel fetches for fast server rendering.
  const [categories, fresh, organic, deals, farmers] = await Promise.all([
    api.categories.listServer().catch(() => []),
    fetchSection("fresh"),
    fetchSection("organic"),
    fetchSection("deals"),
    api.farmers.listServer(0, 6).catch(() => []),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <div id="fresh-from-farms">
        <ProductSection
          title={t("home.freshFromFarms")}
          subtitle={t("home.freshFromFarmsSubtitle")}
          products={fresh}
          viewAllHref="/category/vegetables?sort=newest_harvest"
        />
      </div>
      <ProductSection
        title={t("home.todaysBestPrices")}
        subtitle={t("home.todaysBestPricesSubtitle")}
        products={deals}
        viewAllHref="/search?section=deals"
      />
      <ProductSection
        title={t("home.organicPicks")}
        subtitle={t("home.organicPicksSubtitle")}
        products={organic}
        viewAllHref="/search?section=organic"
      />
      <FarmerSection farmers={farmers} />
    </>
  );
}

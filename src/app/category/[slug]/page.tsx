import { ProductSection } from "@/components/product/ProductSection";
import { api } from "@/lib/api/endpoints";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, " ")} — ManaRythu`,
    alternates: { canonical: `/category/${params.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const [category, products] = await Promise.all([
    api.categories.listServer().then((cats) =>
      cats.find((c) => c.slug === params.slug) ??
      cats.flatMap((c) => c.children ?? []).find((c) => c.slug === params.slug),
    ),
    api.products.listServer({ category: params.slug, size: 50 }).catch(() => []),
  ]);

  return (
    <ProductSection
      title={category?.name.en ?? params.slug}
      products={products}
      viewAllHref="/search"
    />
  );
}

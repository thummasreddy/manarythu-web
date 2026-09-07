import { ProductDetail } from "@/components/product/ProductDetail";
import { api } from "@/lib/api/endpoints";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await api.products.bySlugServer(params.slug);
  const nameEn = product.name.en;
  return {
    title: `${nameEn} — Buy directly from ${product.farmer.farmName} | ManaRythu`,
    description: `Fresh ${nameEn} grown by ${product.farmer.farmerName} at ${product.farmer.farmName}. ${product.description?.en ?? ""}`,
    alternates: { canonical: `/product/${params.slug}` },
    openGraph: {
      title: `${nameEn} — ManaRythu`,
      description: `Buy direct from ${product.farmer.farmName}`,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await api.products.bySlugServer(params.slug);
  return <ProductDetail product={product} />;
}

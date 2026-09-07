import { FarmerDetail } from "@/components/farmer/FarmerDetail";
import { api } from "@/lib/api/endpoints";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const farmer = await api.farmers.bySlugServer(params.slug);
  return {
    title: `${farmer.displayName} — ${farmer.farms[0]?.name ?? "Farmer"} | ManaRythu`,
    description: `${farmer.displayName} grows fresh produce in ${farmer.farms[0]?.district ?? "Telangana"}.`,
    alternates: { canonical: `/farmer/${params.slug}` },
  };
}

export default async function FarmerPage({ params }: PageProps) {
  const farmer = await api.farmers.bySlugServer(params.slug);
  return <FarmerDetail farmer={farmer} />;
}

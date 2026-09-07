"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { api } from "@/lib/api/endpoints";
import { FarmerCard } from "@/components/farmer/FarmerCard";

export default function FarmersPage() {
  const { t } = useI18n();
  const { data, isLoading } = useQuery({
    queryKey: ["farmers"],
    queryFn: () => api.farmers.list(),
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="container-page flex h-80 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="container-page py-6 md:py-10">
      <h1 className="font-display text-2xl font-bold text-brand-800">{t("home.farmersNearYou")}</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data?.map((f) => <FarmerCard key={f.id} farmer={f} />)}
      </div>
    </div>
  );
}

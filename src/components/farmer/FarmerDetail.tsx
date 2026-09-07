"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import type { FarmerDetailDto } from "@/lib/api/types";

export function FarmerDetail({ farmer }: { farmer: FarmerDetailDto }) {
  const { t } = useI18n();
  const primary = farmer.farms[0];

  return (
    <div className="container-page py-6 md:py-10">
      <div className="card overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-brand-200 to-brand-400" />
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
          <div className="relative -mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-brand-100 shadow-card">
            {farmer.photoUrl ? (
              <Image src={farmer.photoUrl} alt={farmer.displayName} fill className="object-cover" sizes="96px" />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl">👨‍🌾</div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-brand-800">{farmer.displayName}</h1>
            {primary && (
              <p className="mt-1 flex items-center gap-1 text-sm text-brand-600">
                <MapPin className="h-4 w-4" /> {primary.village ?? primary.district}, {primary.state}
              </p>
            )}
            <div className="mt-2 flex items-center gap-1 text-sm text-brand-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {farmer.ratingAvg > 0 ? farmer.ratingAvg.toFixed(1) : "New"} ({farmer.ratingCount})
            </div>
          </div>
          <button className="btn-primary" disabled>
            {t("farmer.follow")}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {farmer.story && (
            <section className="card p-5">
              <h2 className="font-display text-lg font-semibold text-brand-800">{t("home.exploreFarmers")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-600">{farmer.story}</p>
            </section>
          )}

          {farmer.farms.length > 0 && (
            <section className="card p-5">
              <h2 className="font-display text-lg font-semibold text-brand-800">{t("farmer.farms")}</h2>
              <div className="mt-3 space-y-3">
                {farmer.farms.map((f) => (
                  <div key={f.id} className="rounded-xl bg-cream-50 p-4">
                    <h3 className="font-semibold text-brand-800">{f.name}</h3>
                    <p className="text-sm text-brand-600">
                      {f.village && `${f.village}, `}{f.district}, {f.state}
                    </p>
                    {f.farmingMethods && (
                      <p className="mt-1 text-xs text-brand-500">
                        <span className="font-medium">{t("farmer.farmingPractices")}:</span> {f.farmingMethods}
                      </p>
                    )}
                    {f.certifications && (
                      <p className="text-xs text-brand-500">
                        <span className="font-medium">{t("farmer.certifications")}:</span> {f.certifications}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display font-semibold text-brand-800">{t("farmer.rating")}</h3>
            <p className="mt-2 text-3xl font-bold text-brand-800">{farmer.ratingAvg.toFixed(1)}</p>
            <p className="text-xs text-brand-500">{farmer.ratingCount} ratings</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

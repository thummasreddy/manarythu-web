"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import type { FarmerCardDto } from "@/lib/api/types";

export function FarmerCard({ farmer }: { farmer: FarmerCardDto }) {
  return (
    <Link
      href={`/farmer/${farmer.slug}`}
      className="card flex flex-col items-center p-4 text-center transition-shadow hover:shadow-card-hover"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-brand-100 md:h-20 md:w-20">
        {farmer.photoUrl ? (
          <Image src={farmer.photoUrl} alt={farmer.displayName} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl">👨‍🌾</div>
        )}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-brand-900">{farmer.displayName}</h3>
      {farmer.primaryFarm && (
        <p className="mt-0.5 flex items-center gap-1 text-xs text-brand-500">
          <MapPin className="h-3 w-3" />
          {farmer.primaryFarm.village ?? farmer.primaryFarm.district}
        </p>
      )}
      <div className="mt-2 flex items-center gap-1 text-xs text-brand-600">
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
        {farmer.ratingAvg > 0 ? farmer.ratingAvg.toFixed(1) : "New"}
        <span className="text-brand-400">· {farmer.experienceYears}y exp</span>
      </div>
    </Link>
  );
}

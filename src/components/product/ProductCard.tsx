"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, Check, Star, MapPin, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useCartStore } from "@/lib/store/cart-store";
import { localized, formatINR, cn } from "@/lib/utils";
import type { ProductCardDto } from "@/lib/api/types";

export function ProductCard({ product }: { product: ProductCardDto }) {
  const { t, locale } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const cartItem = useCartStore((s) =>
    s.cart?.items.find((i) => i.variantId === product.defaultVariant?.id),
  );
  const [busy, setBusy] = useState(false);

  const variant = product.defaultVariant;
  if (!variant) return null;
  const qty = cartItem?.qty ?? 0;
  const harvestedToday = product.harvestDate === new Date().toISOString().slice(0, 10);
  const isDeal = variant.savings > 0;

  const onAdd = async () => {
    setBusy(true);
    try {
      await addItem(variant.id, variant.minOrderQty || 1);
    } finally {
      setBusy(false);
    }
  };

  const onQty = async (delta: number) => {
    if (!cartItem) return;
    setBusy(true);
    try {
      await updateItem(cartItem.id, Math.max(0, qty + delta));
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={localized(product.name, locale)}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">{product.categorySlug === "fruits" ? "🥭" : "🥬"}</div>
        )}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.growingMethod !== "CONVENTIONAL" && (
            <span className={cn(product.growingMethod === "ORGANIC" ? "chip-organic" : "chip-natural")}>
              {product.growingMethod === "ORGANIC" ? t("product.organic") : t("product.natural")}
            </span>
          )}
          {isDeal && <span className="chip-deal">{Math.round((variant.savings / variant.mrp) * 100)}% off</span>}
        </div>
        {!variant.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm font-semibold text-brand-700">
            {t("common.outOfStock")}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-semibold text-brand-900 hover:text-brand-600">
          {localized(product.name, locale)}
        </Link>
        <Link
          href={`/farmer/${product.farmer.farmerSlug}`}
          className="mt-1 flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700"
        >
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{product.farmer.farmName} · {product.farmer.district}</span>
        </Link>

        <div className="mt-1 flex items-center gap-1 text-xs text-brand-500">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {product.ratingAvg > 0 ? product.ratingAvg.toFixed(1) : "New"}
          {harvestedToday && (
            <span className="ml-auto chip-organic py-0 text-[10px]">{t("common.harvestedToday")}</span>
          )}
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-base font-bold text-brand-800">
            {t("common.inr")}{formatINR(variant.sellingPrice)}
          </span>
          {isDeal && (
            <span className="text-xs text-brand-400 line-through">
              {t("common.inr")}{formatINR(variant.mrp)}
            </span>
          )}
          <span className="ml-auto text-xs text-brand-500">{variant.label}</span>
        </div>
        {isDeal && (
          <p className="text-xs font-medium text-clay-500">
            {t("common.saveRupee", { amount: formatINR(variant.savings) })}
          </p>
        )}

        <div className="mt-3">
          {qty === 0 ? (
            <button
              className="btn-primary w-full"
              onClick={onAdd}
              disabled={!variant.inStock || busy}
              aria-label={t("common.add")}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : t("common.add")}
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-white">
              <button
                className="flex h-9 w-10 items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                onClick={() => onQty(-1)}
                disabled={busy}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center text-sm font-semibold text-brand-800">
                {busy ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : qty}
              </span>
              <button
                className="flex h-9 w-10 items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                onClick={() => onQty(1)}
                disabled={busy || qty >= variant.maxOrderQty || qty >= variant.availableQty}
                aria-label="Increase quantity"
              >
                {qty >= variant.maxOrderQty ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

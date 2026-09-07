"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Check, Star, MapPin, ArrowLeft, Truck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { useCartStore } from "@/lib/store/cart-store";
import { localized, formatINR, cn } from "@/lib/utils";
import type { ProductDetailDto, VariantDto } from "@/lib/api/types";

export function ProductDetail({ product }: { product: ProductDetailDto }) {
  const { t, locale } = useI18n();
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<VariantDto>(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? null);
  const cart = useCartStore((s) => s.cart);
  const existingItem = cart?.items.find((i) => i.variantId === selectedVariant.id);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = async () => {
    await addItem(selectedVariant.id, qty);
    setQty(1);
  };

  return (
    <div className="container-page py-6 md:py-10">
      <Link href="/" className="btn-ghost mb-4 inline-flex pl-0 text-sm">
        <ArrowLeft className="h-4 w-4" /> {t("common.back") || "Back"}
      </Link>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Images */}
        <div className="space-y-3 lg:col-span-1">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-100 bg-cream-100">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={localized(product.name, locale)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">🥬</div>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border bg-cream-100",
                  selectedImage === img ? "border-brand-500 ring-2 ring-brand-500" : "border-brand-100",
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            {product.growingMethod !== "CONVENTIONAL" && (
              <span
                className={cn(
                  "chip",
                  product.growingMethod === "ORGANIC"
                    ? "chip-organic"
                    : "chip-natural",
                )}
              >
                {product.growingMethod === "ORGANIC" ? t("product.organic") : t("product.natural")}
              </span>
            )}
            {product.organicCertified && <span className="chip chip-organic">{t("product.organicCertified")}</span>}
          </div>

          <h1 className="mt-3 font-display text-2xl font-bold text-brand-900 md:text-3xl">
            {localized(product.name, locale)}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-brand-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{product.ratingAvg > 0 ? product.ratingAvg.toFixed(1) : "New"}</span>
            <span className="text-brand-400">({product.ratingCount})</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-brand-800">
              {t("common.inr")}{formatINR(selectedVariant.sellingPrice)}
            </span>
            {selectedVariant.mrp > selectedVariant.sellingPrice && (
              <span className="text-lg text-brand-400 line-through">
                {t("common.inr")}{formatINR(selectedVariant.mrp)}
              </span>
            )}
          </div>
          {selectedVariant.mrp > selectedVariant.sellingPrice && (
            <p className="mt-1 text-sm font-medium text-clay-500">
              {t("common.saveRupee", { amount: formatINR(selectedVariant.savings) })}
            </p>
          )}

          {/* Variants */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-brand-800">{t("product.chooseWeight")}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVariant(v);
                    setQty(1);
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                    v.id === selectedVariant.id
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-brand-200 bg-white text-brand-600 hover:border-brand-300",
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-brand-200 bg-white">
              <button
                className="flex h-10 w-10 items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center text-sm font-semibold text-brand-800">{qty}</span>
              <button
                className="flex h-10 w-10 items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                onClick={() => setQty((q) => Math.min(selectedVariant.maxOrderQty, q + 1))}
                disabled={qty >= selectedVariant.maxOrderQty || qty >= selectedVariant.availableQty}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              className="btn-primary flex-1"
              onClick={handleAdd}
              disabled={!selectedVariant.inStock}
            >
              {existingItem ? t("product.addedToCart") : t("product.addToCart")}
              {!existingItem && <Check className="h-4 w-4" />}
            </button>
          </div>

          {/* Farmer card */}
          <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-4">
            <h3 className="text-sm font-semibold text-brand-500">{t("product.meetYourFarmer")}</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-brand-100">
                {product.farmer.farmerPhotoUrl ? (
                  <Image
                    src={product.farmer.farmerPhotoUrl}
                    alt={product.farmer.farmerName}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">👨‍🌾</div>
                )}
              </div>
              <div>
                <p className="font-semibold text-brand-800">
                  {product.farmer.farmerName}
                </p>
                <p className="text-sm text-brand-600">
                  {product.farmer.farmName}
                </p>
                <p className="flex items-center gap-1 text-xs text-brand-500">
                  <MapPin className="h-3 w-3" />
                  {product.farmer.district}, {product.farmer.state}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-brand-600">
              {t("product.yearsExperience", { years: product.farmer.experienceYears })}
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-4 text-sm text-brand-600">
            {product.description && (
              <div>
                <h3 className="font-semibold text-brand-800">{t("product.description")}</h3>
                <p className="mt-1">{localized(product.description, locale)}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-cream-50 p-3">
                <p className="font-semibold text-brand-800">{t("product.harvestDate")}</p>
                <p className="mt-1">{product.harvestDate ?? "—"}</p>
              </div>
              <div className="rounded-xl bg-cream-50 p-3">
                <p className="font-semibold text-brand-800">{t("product.growingMethod")}</p>
                <p className="mt-1">{t(`product.${product.growingMethod.toLowerCase()}`)}</p>
              </div>
              <div className="rounded-xl bg-cream-50 p-3">
                <p className="font-semibold text-brand-800 flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> {t("product.deliveryEstimate")}</p>
                <p className="mt-1">{t("product.deliveryEstimateValue")}</p>
              </div>
              <div className="rounded-xl bg-cream-50 p-3">
                <p className="font-semibold text-brand-800 flex items-center gap-1"><RefreshCw className="h-3.5 w-3.5" /> {t("product.returns")}</p>
                <p className="mt-1">{t("product.returnsValue")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

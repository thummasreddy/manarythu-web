"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useCartStore } from "@/lib/store/cart-store";
import { formatINR, localized } from "@/lib/utils";

export default function CartPage() {
  const { t, locale } = useI18n();
  const cart = useCartStore((s) => s.cart);
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-brand-300" />
        <h1 className="mt-4 font-display text-xl font-bold text-brand-800">{t("cart.empty")}</h1>
        <p className="mt-1 text-brand-600">{t("cart.emptyBody")}</p>
        <Link href="/" className="btn-primary mt-6">
          {t("cart.browseProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-6 md:py-10">
      <h1 className="font-display text-2xl font-bold text-brand-800">{t("cart.title")}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream-100">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={localized(item.productName, locale)} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">🥬</div>
                )}
              </div>
              <div className="flex-1">
                <Link href={`/product/${item.productSlug}`} className="font-semibold text-brand-900 hover:text-brand-600">
                  {localized(item.productName, locale)}
                </Link>
                <p className="text-xs text-brand-500">{item.variantLabel} · {item.farmName}</p>
                <p className="mt-1 text-sm font-semibold text-brand-800">
                  {t("common.inr")}{formatINR(item.sellingPrice)}
                  {item.mrp > item.sellingPrice && (
                    <span className="ml-2 text-xs text-brand-400 line-through">{t("common.inr")}{formatINR(item.mrp)}</span>
                  )}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-brand-200 bg-white">
                    <button
                      className="flex h-8 w-8 items-center justify-center text-brand-700 hover:bg-brand-50"
                      onClick={() => updateItem(item.id, Math.max(0, item.qty - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-brand-800">{item.qty}</span>
                    <button
                      className="flex h-8 w-8 items-center justify-center text-brand-700 hover:bg-brand-50"
                      onClick={() => updateItem(item.id, item.qty + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    className="text-clay-500 hover:text-clay-600"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-brand-800">{t("common.inr")}{formatINR(item.lineTotal)}</p>
                {item.lineSavings > 0 && (
                  <p className="text-xs text-clay-500">{t("common.saveRupee", { amount: formatINR(item.lineSavings) })}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="card h-fit space-y-4 p-5">
          <h2 className="font-display text-lg font-semibold text-brand-800">{t("cart.title")}</h2>
          <div className="flex justify-between text-sm text-brand-600">
            <span>{t("cart.subtotal")} ({t("cart.totalItems", { count: cart.totalItems })})</span>
            <span className="font-medium text-brand-800">{t("common.inr")}{formatINR(cart.subtotal)}</span>
          </div>
          {cart.totalSavings > 0 && (
            <div className="flex justify-between text-sm text-clay-500">
              <span>{t("cart.savings")}</span>
              <span className="font-medium">-{t("common.inr")}{formatINR(cart.totalSavings)}</span>
            </div>
          )}
          <div className="border-t border-brand-100 pt-3">
            <div className="flex justify-between text-base font-semibold text-brand-800">
              <span>{t("cart.subtotal")}</span>
              <span>{t("common.inr")}{formatINR(cart.subtotal)}</span>
            </div>
          </div>
          <Link href="/" className="btn-primary w-full block text-center">
            {t("cart.continueShopping")}
          </Link>
          <p className="text-center text-xs text-brand-500">Checkout will be enabled once you confirm delivery address and slot.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, Heart, ShoppingCart, User, Globe, Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useLocationStore } from "@/lib/store/location-store";
import { useCartStore } from "@/lib/store/cart-store";
import { LocationModal } from "@/components/location/LocationModal";
import { Logo } from "./Logo";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const area = useLocationStore((s) => s.area);
  const totalItems = useCartStore((s) => s.cart?.totalItems ?? 0);
  const [locOpen, setLocOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-cream-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-3 md:h-20">
        {/* Mobile menu button */}
        <button
          className="btn-ghost -ml-2 p-2 md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Logo />

        {/* Delivery location */}
        <button
          className="hidden items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-brand-50 md:flex"
          onClick={() => setLocOpen(true)}
        >
          <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
          <span className="min-w-0">
            <span className="block text-xs text-brand-500">{t("header.deliveringTo")}</span>
            <span className="block max-w-[12rem] truncate font-medium text-brand-800">
              {area?.zoneName ?? area?.city ?? t("header.chooseLocation")}
            </span>
          </span>
        </button>

        {/* Search */}
        <form
          className="relative ml-auto hidden flex-1 md:block"
          action="/search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) window.location.href = `/search?q=${encodeURIComponent(q.trim())}`;
          }}
        >
          <label htmlFor="search" className="sr-only">
            {t("header.searchPlaceholder")}
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <input
            id="search"
            name="q"
            className="input pl-10"
            placeholder={t("header.searchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <button
            className="hidden items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 md:flex"
            onClick={() => setLocale(locale === "en" ? "te" : "en")}
            aria-label={t("header.language")}
          >
            <Globe className="h-4 w-4" />
            {locale === "en" ? "తె" : "EN"}
          </button>
          <Link href="/account" className="btn-ghost hidden p-2 md:inline-flex" aria-label={t("header.account")}>
            <User className="h-5 w-5" />
          </Link>
          <Link href="/favorites" className="btn-ghost hidden p-2 md:inline-flex" aria-label={t("header.favorites")}>
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="btn-ghost relative p-2" aria-label={t("header.cart")}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile location + search row */}
      <div className="container-page flex items-center gap-2 pb-3 md:hidden">
        <button
          className="flex flex-1 items-center gap-2 rounded-xl border border-brand-200 bg-white px-3 py-2 text-left text-sm"
          onClick={() => setLocOpen(true)}
        >
          <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
          <span className="min-w-0">
            <span className="block text-[11px] leading-tight text-brand-500">{t("header.deliveringTo")}</span>
            <span className="block max-w-full truncate text-sm font-medium leading-tight text-brand-800">
              {area?.zoneName ?? area?.city ?? t("header.chooseLocation")}
            </span>
          </span>
        </button>
      </div>
      <form
        className="container-page pb-3 md:hidden"
        action="/search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) window.location.href = `/search?q=${encodeURIComponent(q.trim())}`;
        }}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <input
            className="input pl-10"
            name="q"
            placeholder={t("header.searchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </form>

      {locOpen && <LocationModal />}
    </header>
  );
}

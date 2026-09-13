"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, Heart, ShoppingCart, User, Globe, Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useLocationStore } from "@/lib/store/location-store";
import { useCartStore } from "@/lib/store/cart-store";
import { LocationModal } from "@/components/location/LocationModal";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const area = useLocationStore((s) => s.area);
  const totalItems = useCartStore((s) => s.cart?.totalItems ?? 0);
  const [locOpen, setLocOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-brand-100/50 bg-cream-50/85 shadow-soft backdrop-blur-xl",
        "transition-all duration-300",
      )}
    >
      <div className="container-page flex h-16 items-center gap-3 md:h-[72px]">
        {/* Mobile menu button */}
        <button
          className="btn-ghost -ml-2 rounded-2xl p-2.5 md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Logo />

        {/* Delivery location */}
        <button
          className={cn(
            "hidden items-center gap-2 rounded-2xl border border-brand-100 bg-white/60 px-3 py-2 text-left text-sm",
            "backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft md:flex",
          )}
          onClick={() => setLocOpen(true)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <MapPin className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] uppercase tracking-wide text-brand-500">{t("header.deliveringTo")}</span>
            <span className="block max-w-[12rem] truncate font-semibold text-brand-900">
              {area?.zoneName ?? area?.city ?? t("header.chooseLocation")}
            </span>
          </span>
        </button>

        {/* Search */}
        <form
          className="relative ml-auto hidden flex-1 max-w-xl md:block"
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
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <input
            id="search"
            name="q"
            className="input h-11 pl-11"
            placeholder={t("header.searchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5 md:ml-2">
          <button
            className={cn(
              "hidden items-center gap-1.5 rounded-2xl border border-brand-100 px-3 py-2 text-sm font-semibold",
              "bg-white/60 text-brand-700 backdrop-blur-sm transition-all hover:bg-brand-50 hover:shadow-soft md:flex",
            )}
            onClick={() => setLocale(locale === "en" ? "te" : "en")}
            aria-label={t("header.language")}
          >
            <Globe className="h-4 w-4" />
            {locale === "en" ? "తె" : "EN"}
          </button>
          <Link
            href="/account"
            className="btn-ghost hidden rounded-2xl p-2.5 md:inline-flex"
            aria-label={t("header.account")}
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/favorites"
            className="btn-ghost hidden rounded-2xl p-2.5 md:inline-flex"
            aria-label={t("header.favorites")}
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-elevated active:translate-y-0"
            aria-label={t("header.cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile location + search row */}
      <div className="container-page flex items-center gap-2 pb-3 md:hidden">
        <button
          className={cn(
            "flex flex-1 items-center gap-2 rounded-2xl border border-brand-100 bg-white/80 px-3 py-2 text-left text-sm",
            "shadow-sm backdrop-blur-sm",
          )}
          onClick={() => setLocOpen(true)}
        >
          <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wide text-brand-500">{t("header.deliveringTo")}</span>
            <span className="block max-w-full truncate text-sm font-semibold leading-tight text-brand-900">
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
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <input
            className="input h-11 pl-11"
            name="q"
            placeholder={t("header.searchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </form>

      {/* Mobile nav overlay */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-brand-100 bg-cream-50/95 p-4 shadow-elevated backdrop-blur-xl md:hidden">
          <nav className="grid gap-2">
            <Link href="/" className="btn-ghost justify-start" onClick={() => setMenuOpen(false)}>{t("nav.home")}</Link>
            <Link href="/categories" className="btn-ghost justify-start" onClick={() => setMenuOpen(false)}>{t("nav.categories")}</Link>
            <Link href="/farmers" className="btn-ghost justify-start" onClick={() => setMenuOpen(false)}>{t("home.farmersNearYou")}</Link>
            <Link href="/cart" className="btn-ghost justify-start" onClick={() => setMenuOpen(false)}>{t("header.cart")}</Link>
            <Link href="/account" className="btn-ghost justify-start" onClick={() => setMenuOpen(false)}>{t("nav.account")}</Link>
          </nav>
        </div>
      )}

      {locOpen && <LocationModal onClose={() => setLocOpen(false)} />}
    </header>
  );
}

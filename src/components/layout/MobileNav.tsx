"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingBag, User } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.cart?.totalItems ?? 0);

  const items = [
    { href: "/", label: t("nav.home"), icon: Home, active: pathname === "/" },
    { href: "/categories", label: t("nav.categories"), icon: LayoutGrid, active: pathname?.startsWith("/categories") },
    { href: "/search", label: t("nav.search"), icon: Search, active: pathname?.startsWith("/search") },
    { href: "/orders", label: t("nav.orders"), icon: ShoppingBag, active: pathname?.startsWith("/orders") },
    { href: "/account", label: t("nav.account"), icon: User, active: pathname?.startsWith("/account") },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 backdrop-blur md:hidden"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                  item.active ? "text-brand-600" : "text-brand-500 hover:text-brand-700",
                )}
                aria-current={item.active ? "page" : undefined}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" />
                  {item.href === "/orders" && totalItems > 0 && (
                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[9px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

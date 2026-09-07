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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-cream-50/90 shadow-elevated backdrop-blur-2xl md:hidden"
      aria-label="Primary"
    >
      <ul className="grid h-16 grid-cols-5 items-end">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 pb-3 pt-2 text-[10px] font-semibold transition-colors",
                  item.active
                    ? "text-brand-600"
                    : "text-brand-500 hover:text-brand-700",
                )}
                aria-current={item.active ? "page" : undefined}
              >
                <span className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200",
                  item.active ? "bg-brand-100 text-brand-700 shadow-inner" : "",
                )}>
                  <Icon className="h-5 w-5" />
                  {item.href === "/orders" && totalItems > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[9px] font-bold text-white shadow-sm">
                      {totalItems}
                    </span>
                  )}
                </span>
                {item.label}
                {item.active && (
                  <span className="absolute -bottom-1 h-1 w-6 rounded-full bg-brand-500" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

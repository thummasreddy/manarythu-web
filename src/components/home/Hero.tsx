import Link from "next/link";
import { Sprout, ArrowRight, Truck } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-brand-100 bg-cream-50 bg-grain">
      {/* Soft glowing orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-leaf-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-clay-500/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-8 py-14 md:grid-cols-2 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 backdrop-blur-sm">
            <Sprout className="h-3.5 w-3.5" />
            {t("home.buyDirect")}
          </span>

          <h1 className="font-display text-balance text-4xl font-bold leading-[1.1] text-brand-950 md:text-5xl lg:text-6xl">
            {t("home.heroTitle").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">{t("home.heroTitle").split(" ").slice(-2).join(" ")}</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-600">
            {t("home.heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#fresh-from-farms"
              className="btn-primary h-12 px-6 text-base"
            >
              {t("home.shopNow")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/farmers" className="btn-outline h-12 px-6 text-base">
              {t("home.exploreFarmers")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-brand-600">
            <span className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Truck className="h-4 w-4 text-brand-500" />
              {t("home.buyDirectBody")}
            </span>
          </div>
        </div>

        {/* Decorative visual with floating cards */}
        <div className="relative hidden aspect-[4/3] md:block">
          <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-brand-100 via-cream-100 to-leaf-300/30 shadow-elevated" />
          <div className="absolute inset-0 rounded-4xl bg-[url('https://placehold.co/600x450/e8f5d6/5a9a32?text=Farm+to+Home')] bg-cover bg-center opacity-70 mix-blend-multiply" />

          {/* Floating cards */}
          <div className="absolute -left-6 top-8 animate-float rounded-2xl border border-white/40 bg-white/85 p-4 shadow-elevated backdrop-blur-xl">
            <span className="text-3xl">🥬</span>
            <p className="mt-1 text-xs font-semibold text-brand-800">Organic Spinach</p>
            <p className="text-xs text-brand-500">Harvested today</p>
          </div>
          <div className="absolute -right-4 bottom-12 animate-float-slow rounded-2xl border border-white/40 bg-white/85 p-4 shadow-elevated backdrop-blur-xl">
            <span className="text-3xl">🍅</span>
            <p className="mt-1 text-xs font-semibold text-brand-800">Country Tomatoes</p>
            <p className="text-xs text-brand-500">From Ranga Reddy</p>
          </div>
          <div className="absolute bottom-4 left-8 rounded-2xl border border-white/40 bg-white/85 px-4 py-2 shadow-elevated backdrop-blur-xl">
            <p className="text-sm font-bold text-brand-800">10+ Verified Farmers</p>
            <p className="text-xs text-brand-500">across Telangana</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Sprout, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-cream-50">
      <div className="container-page grid items-center gap-6 py-10 md:grid-cols-2 md:py-16">
        <div>
          <span className="chip-organic mb-4">
            <Sprout className="h-3 w-3" /> {t("home.buyDirect")}
          </span>
          <h1 className="font-display text-3xl font-bold leading-tight text-brand-800 md:text-4xl lg:text-5xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-4 max-w-xl text-base text-brand-600 md:text-lg">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#fresh-from-farms" className="btn-primary">
              {t("home.shopNow")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/farmers" className="btn-outline">
              {t("home.exploreFarmers")}
            </Link>
          </div>
        </div>
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-brand-400" />
          <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-90">
            🌾
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 p-3 text-sm text-brand-700 backdrop-blur">
            <strong className="font-semibold">10+ verified farmers</strong> across Telangana growing fresh produce just for you.
          </div>
        </div>
      </div>
    </section>
  );
}

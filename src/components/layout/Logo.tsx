import Link from "next/link";
import { Sprout } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function Logo() {
  const { t } = useI18n();
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={t("common.appName")}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white md:h-10 md:w-10">
        <Sprout className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-brand-700 md:text-xl">
          {t("common.appName")}
        </span>
        <span className="hidden text-[10px] text-brand-500 sm:block">{t("common.tagline")}</span>
      </span>
    </Link>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, Loader2, CheckCircle2, XCircle, Navigation } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { api } from "@/lib/api/endpoints";
import { useLocationStore } from "@/lib/store/location-store";
import type { ServiceabilityDto } from "@/lib/api/types";

export function LocationModal({ onClose }: { onClose?: () => void } = {}) {
  const { t } = useI18n();
  const set = useLocationStore((s) => s.set);
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<ServiceabilityDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError(t("location.pincodePlaceholder"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.locations.check(pincode);
      setResult(data);
    } catch {
      setError(t("location.notServiceable"));
    } finally {
      setLoading(false);
    }
  };

  const confirm = () => {
    if (!result?.serviceable) return;
    set(pincode, result);
    onClose?.();
  };

  useEffect(() => {
    if (!onClose) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Ancestors using backdrop-filter (the sticky header) become the containing
  // block for `position: fixed`, so the dialog must render into <body>.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const useGps = () => {
    // Geolocation -> reverse geocode to pincode is a future enhancement;
    // for the MVP we prompt the user to enter a PIN code.
    setError("GPS detection is coming soon. Please enter your PIN code.");
  };

  const dialog = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-brand-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-title"
      onClick={onClose ? (e) => e.target === e.currentTarget && onClose() : undefined}
    >
      <div className="card my-auto max-h-full w-full max-w-md overflow-y-auto rounded-b-none rounded-t-2xl p-6 sm:rounded-2xl">
        <div className="mb-4 flex items-center gap-2 text-brand-600">
          <MapPin className="h-5 w-5" />
          <h2 id="location-title" className="font-display text-lg font-semibold text-brand-800">
            {t("location.title")}
          </h2>
        </div>
        <p className="mb-5 text-sm text-brand-600">{t("location.subtitle")}</p>

        <div className="space-y-3">
          <label htmlFor="pincode" className="sr-only">
            {t("location.pincode")}
          </label>
          <input
            id="pincode"
            className="input"
            inputMode="numeric"
            maxLength={6}
            placeholder={t("location.pincodePlaceholder")}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setResult(null);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            aria-invalid={!!error}
          />

          {error && <p className="text-sm text-clay-500">{error}</p>}

          {result?.serviceable && (
            <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>{t("location.serviceable", { area: result.zoneName ?? "", city: result.city ?? "" })}</p>
                <p className="mt-1 text-brand-600">
                  {t("location.deliveryFee", { fee: result.deliveryFee ?? 0 })}
                  {result.minFreeDelivery
                    ? " · " + t("location.freeAbove", { amount: result.minFreeDelivery })
                    : ""}
                </p>
              </div>
            </div>
          )}

          {result && !result.serviceable && (
            <div className="flex items-start gap-2 rounded-xl bg-clay-500/10 p-3 text-sm text-clay-500">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{t("location.notServiceable")}</p>
            </div>
          )}

          <button className="btn-primary w-full" onClick={check} disabled={loading || pincode.length !== 6}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("location.check")}
          </button>

          <button className="btn-outline w-full" onClick={useGps}>
            <Navigation className="h-4 w-4" /> {t("location.useGps")}
          </button>

          {result?.serviceable && (
            <button className="btn-primary w-full" onClick={confirm}>
              {t("common.continue")}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(dialog, document.body);
}

"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/lib/store/location-store";
import { LocationModal } from "./LocationModal";

/** Ensures a delivery location is chosen before the customer shops. */
export function LocationGate() {
  const pincode = useLocationStore((s) => s.pincode);
  const open = useLocationStore.getState; // placeholder to keep tree-shaking happy

  // The gate is intentionally non-blocking: the modal renders only when no
  // location is set, but the homepage still loads behind it so SSR stays fast.
  useEffect(() => {
    void open;
  }, [open]);

  if (pincode) return null;
  return <LocationModal />;
}

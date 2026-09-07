"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ServiceabilityDto } from "@/lib/api/types";

type LocationState = {
  pincode: string | null;
  area: ServiceabilityDto | null;
  set: (pincode: string, area: ServiceabilityDto) => void;
  clear: () => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      pincode: null,
      area: null,
      set: (pincode, area) => set({ pincode, area }),
      clear: () => set({ pincode: null, area: null }),
    }),
    { name: "manarythu.location" },
  ),
);

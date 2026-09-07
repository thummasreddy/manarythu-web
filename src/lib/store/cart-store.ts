"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartDto } from "@/lib/api/types";
import { api } from "@/lib/api/endpoints";

type CartState = {
  token: string | null;
  cart: CartDto | null;
  loading: boolean;
  ensureToken: () => string;
  refresh: () => Promise<void>;
  addItem: (variantId: string, qty?: number) => Promise<void>;
  updateItem: (itemId: string, qty: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

function newToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      token: null,
      cart: null,
      loading: false,

      ensureToken: () => {
        let token = get().token;
        if (!token) {
          token = newToken();
          set({ token });
        }
        return token;
      },

      refresh: async () => {
        const token = get().ensureToken();
        set({ loading: true });
        try {
          const cart = await api.cart.get(token);
          set({ cart, loading: false });
        } catch (e) {
          set({ loading: false });
          throw e;
        }
      },

      addItem: async (variantId, qty = 1) => {
        const token = get().ensureToken();
        set({ loading: true });
        try {
          const cart = await api.cart.addItem(token, variantId, qty);
          set({ cart, loading: false });
        } catch (e) {
          set({ loading: false });
          throw e;
        }
      },

      updateItem: async (itemId, qty) => {
        const token = get().ensureToken();
        set({ loading: true });
        try {
          const cart = await api.cart.updateItem(token, itemId, qty);
          set({ cart, loading: false });
        } catch (e) {
          set({ loading: false });
          throw e;
        }
      },

      removeItem: async (itemId) => {
        const token = get().ensureToken();
        set({ loading: true });
        try {
          const cart = await api.cart.removeItem(token, itemId);
          set({ cart, loading: false });
        } catch (e) {
          set({ loading: false });
          throw e;
        }
      },
    }),
    {
      name: "manarythu.cart",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

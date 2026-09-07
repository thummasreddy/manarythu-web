import { apiRequest, apiRequestServer } from "./client";
import type {
  CartDto,
  CategoryDto,
  FarmerCardDto,
  FarmerDetailDto,
  ProductCardDto,
  ProductDetailDto,
  ServiceabilityDto,
  ZoneDto,
} from "./types";

export interface ProductListParams {
  q?: string;
  category?: string;
  farmer?: string;
  section?: "fresh" | "organic" | "deals" | "popular" | "recent";
  sort?: "relevance" | "newest_harvest" | "rating" | "newest";
  page?: number;
  size?: number;
}

function toQuery(params: Record<string, unknown>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export const api = {
  categories: {
    list: () => apiRequest<CategoryDto[]>("/categories"),
    listServer: () => apiRequestServer<CategoryDto[]>("/categories"),
  },
  products: {
    list: (params: ProductListParams = {}) =>
      apiRequest<ProductCardDto[]>(`/products${toQuery(params as Record<string, unknown>)}`),
    listServer: (params: ProductListParams = {}) =>
      apiRequestServer<ProductCardDto[]>(`/products${toQuery(params as Record<string, unknown>)}`),
    bySlug: (slug: string) => apiRequest<ProductDetailDto>(`/products/${slug}`),
    bySlugServer: (slug: string) => apiRequestServer<ProductDetailDto>(`/products/${slug}`),
  },
  farmers: {
    list: (page = 0, size = 12) =>
      apiRequest<FarmerCardDto[]>(`/farmers${toQuery({ page, size })}`),
    listServer: (page = 0, size = 12) =>
      apiRequestServer<FarmerCardDto[]>(`/farmers${toQuery({ page, size })}`),
    bySlug: (slug: string) => apiRequest<FarmerDetailDto>(`/farmers/${slug}`),
    bySlugServer: (slug: string) => apiRequestServer<FarmerDetailDto>(`/farmers/${slug}`),
  },
  locations: {
    check: (pincode: string) => apiRequest<ServiceabilityDto>(`/locations/check${toQuery({ pincode })}`),
    checkServer: (pincode: string) =>
      apiRequestServer<ServiceabilityDto>(`/locations/check${toQuery({ pincode })}`),
    zones: () => apiRequest<ZoneDto[]>("/locations/zones"),
    zonesServer: () => apiRequestServer<ZoneDto[]>("/locations/zones"),
  },
  cart: {
    get: (token: string) => apiRequest<CartDto>("/cart", { headers: { "X-Cart-Token": token } }),
    addItem: (token: string, variantId: string, qty: number) =>
      apiRequest<CartDto>("/cart/items", {
        method: "POST",
        body: { variantId, qty },
        headers: { "X-Cart-Token": token },
      }),
    updateItem: (token: string, itemId: string, qty: number) =>
      apiRequest<CartDto>(`/cart/items/${itemId}`, {
        method: "PATCH",
        body: { qty },
        headers: { "X-Cart-Token": token },
      }),
    removeItem: (token: string, itemId: string) =>
      apiRequest<CartDto>(`/cart/items/${itemId}`, {
        method: "DELETE",
        headers: { "X-Cart-Token": token },
      }),
  },
};

// Typed API contract for ManaRythu. Mirrors the Spring Boot DTOs in manarythu-api.
// When the OpenAPI generator is wired up (next milestone), this file can be replaced
// with generated code; the shapes below are intentionally identical.

export type Locale = "en" | "te";

export type LocalizedText = Record<Locale, string>;

export type Unit = "G" | "KG" | "ML" | "L" | "PIECE" | "BUNCH" | "DOZEN" | "BOX" | "BAG";

export type GrowingMethod = "ORGANIC" | "NATURAL" | "CONVENTIONAL";

export interface PageMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  fieldErrors?: { field: string; message: string }[];
}

export interface ApiResponse<T> {
  data: T;
  meta?: PageMeta;
  error?: ApiError;
}

export interface CategoryDto {
  id: string;
  name: LocalizedText;
  slug: string;
  icon: string;
  imageUrl?: string;
  sortOrder: number;
  children?: CategoryDto[];
}

export interface FarmerSummaryDto {
  farmerId: string;
  farmerName: string;
  farmerSlug: string;
  farmerPhotoUrl?: string;
  experienceYears: number;
  farmId: string;
  farmName: string;
  farmSlug: string;
  village?: string;
  district: string;
  state: string;
}

export interface VariantDto {
  id: string;
  unit: Unit;
  unitSize: number;
  label: string;
  mrp: number;
  sellingPrice: number;
  savings: number;
  minOrderQty: number;
  maxOrderQty: number;
  availableQty: number;
  inStock: boolean;
}

export interface ProductCardDto {
  id: string;
  name: LocalizedText;
  slug: string;
  categorySlug: string;
  imageUrl?: string;
  growingMethod: GrowingMethod;
  organicCertified: boolean;
  harvestDate?: string;
  ratingAvg: number;
  ratingCount: number;
  farmer: FarmerSummaryDto;
  defaultVariant: VariantDto;
}

export interface ProductDetailDto {
  id: string;
  name: LocalizedText;
  slug: string;
  description?: LocalizedText;
  categorySlug: string;
  categoryName: LocalizedText;
  images: string[];
  growingMethod: GrowingMethod;
  organicCertified: boolean;
  harvestDate?: string;
  nextHarvestDate?: string;
  ratingAvg: number;
  ratingCount: number;
  farmer: FarmerSummaryDto;
  variants: VariantDto[];
}

export interface FarmerCardDto {
  id: string;
  displayName: string;
  slug: string;
  photoUrl?: string;
  experienceYears: number;
  ratingAvg: number;
  ratingCount: number;
  primaryFarm?: FarmDto;
}

export interface FarmDto {
  id: string;
  name: string;
  slug: string;
  village?: string;
  district: string;
  state: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  acreage?: number;
  farmingMethods?: string;
  certifications?: string;
  photoUrl?: string;
}

export interface FarmerDetailDto {
  id: string;
  displayName: string;
  slug: string;
  photoUrl?: string;
  story?: string;
  experienceYears: number;
  ratingAvg: number;
  ratingCount: number;
  farms: FarmDto[];
}

export interface CartItemDto {
  id: string;
  variantId: string;
  productId: string;
  productName: LocalizedText;
  productSlug: string;
  imageUrl?: string;
  variantLabel: string;
  farmerName: string;
  farmerSlug: string;
  farmName: string;
  mrp: number;
  sellingPrice: number;
  qty: number;
  lineTotal: number;
  lineSavings: number;
  availableQty: number;
}

export interface CartDto {
  token: string;
  items: CartItemDto[];
  totalItems: number;
  subtotal: number;
  totalSavings: number;
}

export interface ServiceabilityDto {
  serviceable: boolean;
  pincode: string;
  zoneId?: string;
  zoneName?: string;
  city?: string;
  state?: string;
  deliveryFee?: number;
  minFreeDelivery?: number;
}

export interface ZoneDto {
  id: string;
  name: string;
  city: string;
  state: string;
}

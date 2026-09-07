import type { ApiResponse } from "./types";

const API_BASE = "/api/v1";

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public fieldErrors?: { field: string; message: string }[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  // When true, errors are returned as a thrown ApiError. Otherwise the raw envelope is returned.
  signal?: AbortSignal;
};

/** Low-level request helper that unwraps the ManaRythu API envelope. */
export async function apiRequest<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, signal } = options;
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    signal,
  };
  if (body !== undefined) init.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, init);
  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    // Non-JSON response (e.g. 204)
  }

  if (!res.ok) {
    const err = payload?.error;
    throw new ApiError(
      err?.code ?? "HTTP_ERROR",
      err?.message ?? `Request failed with status ${res.status}`,
      res.status,
      err?.fieldErrors,
    );
  }
  if (payload?.error) {
    throw new ApiError(payload.error.code, payload.error.message, res.status, payload.error.fieldErrors);
  }
  return (payload as ApiResponse<T>).data;
}

/** Server-side variant that talks to the backend directly (bypassing the Next.js rewrite). */
export async function apiRequestServer<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const baseUrl = process.env.MANARYTHU_API_URL ?? "http://localhost:8081";
  const { method = "GET", body, headers = {}, signal } = options;
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    signal,
  };
  if (body !== undefined) init.body = JSON.stringify(body);

  const res = await fetch(`${baseUrl}/api/v1${path}`, init);
  const payload = (await res.json()) as ApiResponse<T>;
  if (!res.ok || payload.error) {
    throw new ApiError(
      payload.error?.code ?? "HTTP_ERROR",
      payload.error?.message ?? `Request failed with status ${res.status}`,
      res.status,
      payload.error?.fieldErrors,
    );
  }
  return payload.data;
}

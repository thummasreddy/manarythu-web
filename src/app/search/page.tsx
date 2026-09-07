"use client";

import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page flex h-80 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}

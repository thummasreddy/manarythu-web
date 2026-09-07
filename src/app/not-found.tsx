import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-20 text-center">
      <Leaf className="h-16 w-16 text-brand-300" />
      <h1 className="mt-4 font-display text-2xl font-bold text-brand-800">Page not found</h1>
      <p className="mt-2 text-brand-600">We couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/" className="btn-primary mt-6">Go home</Link>
    </div>
  );
}

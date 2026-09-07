import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { LocationGate } from "@/components/location/LocationGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    default: "ManaRythu — Cultivating Organic Goodness",
    template: "%s · ManaRythu",
  },
  description:
    "ManaRythu (మన రైతు) connects farmers directly with consumers across Telangana. Buy fresh, organic and natural produce harvested just hours ago.",
  keywords: ["organic vegetables", "farm fresh", "Telangana farmers", "ManaRythu", "Hyderabad groceries"],
  openGraph: {
    title: "ManaRythu — Cultivating Organic Goodness",
    description: "Buy fresh produce directly from verified local farmers.",
    type: "website",
    locale: "en_IN",
  },
  metadataBase: new URL("https://manarythu.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LocationGate />
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}

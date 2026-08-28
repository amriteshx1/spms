import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Bodoni_Moda, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Sailanee Packers And Movers | SPMS, Ranchi",
  description:
    "Professional packing, moving and transportation. Protecting your goods like our own. 30+ years of experience. Pan-India service from Ranchi, Jharkhand.",
};

export const viewport: Viewport = {
  themeColor: "#0B0A09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bodoni.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-ink text-bone">{children}</body>
    </html>
  );
}

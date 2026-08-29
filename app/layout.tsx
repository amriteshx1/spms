import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sailanee Packers And Movers | SPMS, Ranchi",
  description:
    "Professional packing, moving and transportation. Always for your moving needs. 30+ years of experience. Pan-India service from Ranchi, Jharkhand.",
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
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-ink text-bone">{children}</body>
    </html>
  );
}

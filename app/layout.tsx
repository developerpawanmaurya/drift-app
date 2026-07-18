import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drift — A sleep coach for shift workers",
  description:
    "Drift builds sleep plans around your actual roster — not a textbook 9-to-5. For night nurses, drivers, paramedics, and anyone whose week doesn't end on Friday.",
  metadataBase: new URL("https://drift.health"),
  openGraph: {
    title: "Drift — Built for the 4am clock-out",
    description:
      "A sleep coach for people whose shift doesn't follow the sun.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

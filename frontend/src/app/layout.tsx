import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SentinelAI | From Millions of Alerts to One Attack Story",
  description: "Autonomous SOC Alert Correlation & Attack Narrative Reconstruction Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070b14] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

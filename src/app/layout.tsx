import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ad Campaign Report Builder",
  description: "Ad Campaign Report Builder for Ad Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

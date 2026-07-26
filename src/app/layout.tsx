import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shikhardarshan.com"),
  title: {
    default: "Shikhar Darshan Braj",
    template: "%s | Shikhar Darshan Braj",
  },
  description:
    "Plan a trusted, accessible Braj pilgrimage with verified stays, transport guidance and temple information.",
  applicationName: "Shikhar Darshan Braj",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/shikhar-darshan-logo.png",
    apple: "/images/shikhar-darshan-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}

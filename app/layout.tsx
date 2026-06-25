import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexalaya.com"),
  title: "Nexalaya — Attendance in 10 Seconds. Zero Proxies. Full Control.",
  description:
    "nexalaya is an IoT-powered, proxy-proof attendance system built for Indian colleges. Facial recognition. NAAC Criteria 2, 5, 6, 7 ready. Launching soon.",
  keywords: [
    "automated attendance system",
    "NAAC compliance",
    "college attendance app",
    "IoT attendance",
    "facial recognition attendance",
    "proxy proof attendance India",
    "campus management system",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nexalaya — Attendance in 10 Seconds. Zero Proxies. Full Control.",
    description:
      "IoT-powered, proxy-proof attendance built for Indian colleges. NAAC Criteria 2, 5, 6, 7 ready.",
    url: "https://nexalaya.com",
    siteName: "Nexalaya",
    images: [
      {
        url: "https://zmi2svdoi5uasiyi.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-24%20at%2021.26.11.jpeg",
        width: 720,
        height: 1600,
        alt: "Nexalaya IoT Attendance app interface",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexalaya — Attendance in 10 Seconds. Zero Proxies. Full Control.",
    description:
      "IoT-powered, proxy-proof attendance built for Indian colleges. NAAC Criteria 2, 5, 6, 7 ready.",
    images: ["https://zmi2svdoi5uasiyi.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-24%20at%2021.26.11.jpeg"],
  },
};

export const viewport = {
  themeColor: "#2F54FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

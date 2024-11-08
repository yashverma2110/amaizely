import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://amaizely.com'),
  title: "Amaizely | Learn smartly with AI",
  description: "Create and study flashcards efficiently with AI-powered generation from websites, YouTube, books, and PDFs. Use smart spaced repetition for better learning.",
  keywords: [
    "flashcards",
    "AI flashcards",
    "study tools",
    "spaced repetition",
    "learning platform",
    "educational technology",
    "smart revision",
    "PDF to flashcards",
    "YouTube to flashcards",
    "study aids",
    "revision tools"
  ],
  openGraph: {
    title: "Amaizely | Learn smartly with AI",
    description: "Create and study flashcards efficiently with AI-powered generation from websites, YouTube, books, and PDFs. Use smart spaced repetition for better learning.",
    images: [
      {
        url: "/og-image.png", // Make sure to add your OG image
        width: 1200,
        height: 630,
        alt: "Amaizely - Smart Flashcard Platform"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaizely | Smart Flashcards with AI",
    description: "Create and study flashcards efficiently with AI-powered generation from websites, YouTube, books, and PDFs. Use smart spaced repetition for better learning.",
    images: ["/og-image.png"], // Make sure to add your Twitter card image
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-V8LDWF03TJ" />
    </html>
  );
}

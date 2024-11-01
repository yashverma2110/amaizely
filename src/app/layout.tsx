import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amaizely | The smarter way to learn",
  description: "Transform your learning with AI-powered flashcards. Generate flashcards from YouTube, websites & text, or create your own. Revise smartly, anytime, anywhere using spaced repetition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

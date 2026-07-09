import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Hassan Masood — Sr AI/ML Engineer",
  description:
    "Portfolio of Hassan Masood, a Senior AI/ML Engineer specializing in Generative AI, LLMs, LangChain, LangGraph, and machine learning systems.",
  keywords: [
    "Hassan Masood",
    "AI Engineer",
    "ML Engineer",
    "Generative AI",
    "LLMs",
    "LangChain",
    "LangGraph",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Hassan Masood" }],
  openGraph: {
    title: "Hassan Masood — Sr AI/ML Engineer",
    description:
      "Portfolio of Hassan Masood, a Senior AI/ML Engineer specializing in Generative AI, LLMs, and machine learning systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} font-sans bg-[#0f0f0f] text-white antialiased`}
      >
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}
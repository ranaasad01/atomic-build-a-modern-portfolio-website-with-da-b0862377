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
  title: "Ajwa Asif — Business Analyst",
  description:
    "Portfolio of Ajwa Asif, a Business Analyst specializing in data-driven insights, process optimization, and strategic business solutions.",
  keywords: [
    "Ajwa Asif",
    "Business Analyst",
    "Data Analysis",
    "Business Intelligence",
    "Process Optimization",
    "Strategic Planning",
    "Portfolio",
  ],
  authors: [{ name: "Ajwa Asif" }],
  openGraph: {
    title: "Ajwa Asif — Business Analyst",
    description:
      "Portfolio of Ajwa Asif, a Business Analyst specializing in data-driven insights, process optimization, and strategic business solutions.",
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

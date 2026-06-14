import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeContext from "@/context/context/ThemeContext";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/context/ToastContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobzz.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jobzz — Find Tech Jobs & Hire Developers",
    template: "%s | Jobzz",
  },
  description:
    "Jobzz is a modern job portal for developers, designers, and engineers. Browse remote and on-site tech jobs, build your resume profile, and hire verified talent.",
  keywords: [
    "tech jobs",
    "developer jobs",
    "remote work",
    "software engineer",
    "frontend developer",
    "backend developer",
    "hiring platform",
    "Jobzz",
    "job portal",
  ],
  authors: [{ name: "Jobzz Team", url: siteUrl }],
  creator: "Jobzz",
  publisher: "Jobzz",
  formatDetection: { email: false, address: false, telephone: false },
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jobzz",
    title: "Jobzz — Find Tech Jobs & Hire Developers",
    description:
      "Browse live tech openings, build your profile, apply with AI cover letters, and hire developers on Jobzz.",
    images: [{ url: "/file.svg", width: 512, height: 512, alt: "Jobzz job portal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobzz — Find Tech Jobs & Hire Developers",
    description: "Modern job portal for tech professionals and hiring teams.",
    images: ["/file.svg"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeContext>
          <ToastProvider>
            {children}
            <Footer/>
          </ToastProvider>
        </ThemeContext>
      </body>
    </html>
  );
}

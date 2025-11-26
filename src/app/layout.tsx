import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AnimatedCursor from "@/components/AnimatedCursor";
import { Toaster } from "react-hot-toast";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surya Kumar M - Full Stack Developer | React, Node.js, AI/ML",
  description: "Portfolio of Surya Kumar M, a passionate Full Stack Developer specializing in React.js, Node.js, Python, AI/ML, and modern web technologies. Building innovative solutions with cutting-edge tech.",
  keywords: ["Full Stack Developer", "React Developer", "Node.js", "Python", "AI/ML", "Web Development", "Surya Kumar M", "Portfolio", "JavaScript", "TypeScript", "MongoDB", "MySQL"],
  authors: [{ name: "Surya Kumar M" }],
  creator: "Surya Kumar M",
  publisher: "Surya Kumar M",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suryakumar.vercel.app",
    title: "Surya Kumar M - Full Stack Developer",
    description: "Portfolio of Surya Kumar M, a passionate Full Stack Developer specializing in React.js, Node.js, Python, AI/ML, and modern web technologies.",
    siteName: "Surya Kumar M Portfolio",
    images: [
      {
        url: "/SURYA.JPG",
        width: 1200,
        height: 630,
        alt: "Surya Kumar M - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Kumar M - Full Stack Developer",
    description: "Portfolio of Surya Kumar M, a passionate Full Stack Developer specializing in React.js, Node.js, Python, AI/ML, and modern web technologies.",
    images: ["/SURYA.JPG"],
    creator: "@suryakumar",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Analytics />
          <AnimatedCursor />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

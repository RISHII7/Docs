import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ConvexClientProvider } from "@/providers/convex-client-provider";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Docs",
  description: "A real time collaboration workspace",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

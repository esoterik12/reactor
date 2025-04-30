import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import NavHeader from "@/components/layout/NavHeader";

const late = Lato({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Reactor",
  description: "Content generation and lesson planning application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${late.className} page-background h-[100vh] antialiased`}
      >
        <Providers>
          <NavHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}

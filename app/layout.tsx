import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/comps/Nav/Navbar";
import Providers from "@/comps/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vefsíða",
  description: "Læra Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark text-foreground bg-background`}>
        <div className="fixed w-screen h-screen bg-gradient-to-t from-neutral-800 to-neutral-900" />
        <Providers>
          <Navbar />
          <main className="size-full relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

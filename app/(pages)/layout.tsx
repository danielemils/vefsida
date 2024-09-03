import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/comps/nav/Navbar";
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
      <body
        className={`${inter.className} min-h-full min-w-full`} // dark text-foreground bg-background
      >
        {/* <div className="fixed w-screen h-screen bg-gradient-to-t from-neutral-800 to-neutral-900" /> */}
        <Providers>
          <Navbar />
          <main className="size-full relative z-10">
            <div className="max-w-screen-xl mx-auto p-6">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

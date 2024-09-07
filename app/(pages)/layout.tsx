// init models
import("@/app/utils/database");
import("@/app/models/User");
import("@/app/models/Post");

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/comps/nav/Navbar";
import Providers from "@/comps/Providers";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vefsíða",
  description: "Læra Next.js.",
};

const SCROLL_SHADOW_HEIGHT = 60;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-visible">
      <body
        className={`${inter.className} min-h-full min-w-full`} // dark text-foreground bg-background
      >
        {/* <div className="fixed w-screen h-screen bg-gradient-to-t from-neutral-800 to-neutral-900" /> */}
        <Providers>
          <ScrollShadow
            visibility="bottom"
            size={SCROLL_SHADOW_HEIGHT}
            className="w-full h-screen z-10 overflow-auto"
            style={{ paddingBottom: SCROLL_SHADOW_HEIGHT }}
          >
            <Navbar />
            <main>
              <div className="max-w-screen-xl mx-auto p-6">{children}</div>
            </main>
          </ScrollShadow>
        </Providers>
      </body>
    </html>
  );
}

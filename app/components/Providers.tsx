"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

const Providers = ({
  children,
  session,
}: {
  children: Readonly<React.ReactNode>;
  session?: Session;
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
};

export default Providers;

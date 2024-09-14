"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({
  children,
  session,
}: {
  children: Readonly<React.ReactNode>;
  session?: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;

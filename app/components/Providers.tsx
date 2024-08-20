"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

const Providers = ({
  children,
  session,
}: {
  children: Readonly<React.ReactNode>;
  session?: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;

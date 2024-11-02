"use client";

import { createContext, useContext } from "react";

type FeedContextType = {
  mutate: any;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({
  children,
  mutate,
}: {
  children: React.ReactNode;
  mutate: any;
}) => {
  return (
    <FeedContext.Provider value={{ mutate }}>{children}</FeedContext.Provider>
  );
};

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};

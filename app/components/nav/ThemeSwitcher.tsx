"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/comps/IconTest";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center">
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <SunIcon />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <MoonIcon />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@/comps/icons";

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
          <Sun />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <Moon />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;

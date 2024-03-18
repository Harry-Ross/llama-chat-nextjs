"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const DarkModeButton = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const [isDark, setIsDark] = useState<boolean>(theme === "dark");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark, setTheme]);

  return (
    <button
      className="m-2 rounded-md p-1 hover:bg-slate-300"
      onClick={() => {
        setIsDark((prev) => !prev);
      }}
    >
      {isDark ? <Moon /> : <Sun />}
    </button>
  );
};

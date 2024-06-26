"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const DarkModeButton = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <button
      className="m-2 rounded-md p-1 hover:bg-slate-300"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
};

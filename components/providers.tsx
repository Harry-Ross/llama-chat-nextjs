"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { type ThemeProviderProps } from "next-themes/dist/types";

interface ProvidersProps {
  children: React.ReactNode;
  themeProps: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}

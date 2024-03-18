"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

interface ProvidersProps {
  children: React.ReactNode;
  themeProps: ThemeProviderProps;
}

export function Providers({
  children,
  themeProps,
}: ProvidersProps): JSX.Element {
  return (
    <NextThemesProvider {...themeProps} attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
}

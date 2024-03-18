import { Providers } from "@/components/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Llama Chat Next",
};

export default function RootLayout({
  children,
  window,
}: {
  children: React.ReactNode;
  window: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          themeProps={{
            defaultTheme: "system",
            enableSystem: true,
            attribute: "class",
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}

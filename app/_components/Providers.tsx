"use client";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ModalsProvider } from '@mantine/modals'
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <NextThemeProvider defaultTheme="dark" attribute="class" enableSystem>
        <SessionProvider>
          <ModalsProvider>
          {children}
          </ModalsProvider>
        </SessionProvider>
      </NextThemeProvider>
    </MantineProvider>
  );
}

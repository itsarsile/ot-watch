"use client";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { MapProvider } from "react-map-gl/maplibre";
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <NextThemeProvider defaultTheme="dark" attribute="class" enableSystem>
        <SessionProvider>
          <MapProvider>{children}</MapProvider>
        </SessionProvider>
      </NextThemeProvider>
    </MantineProvider>
  );
}

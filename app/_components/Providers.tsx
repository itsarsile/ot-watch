"use client";
import { MantineProvider, useEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ModalsProvider } from "@mantine/modals";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));
  return (
    <NextThemeProvider defaultTheme="light" attribute="class" enableSystem>
      <CacheProvider value={cache}>
        <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles>
          <Notifications />
          <ModalsProvider>
            <SessionProvider>{children}</SessionProvider>
          </ModalsProvider>
        </MantineProvider>
      </CacheProvider>
    </NextThemeProvider>
  );
}

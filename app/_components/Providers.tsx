"use client";
import { Container, MantineProvider } from "@mantine/core";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <SessionProvider>
        <Container size="lg" className="mt-5">
          {children}
        </Container>
      </SessionProvider>
    </MantineProvider>
  );
}

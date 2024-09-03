// app/routes/__root.tsx
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";

// the special ?url end of this instruct vite to load the css as a url that points to it
//@ts-expect-error
import tailwind from "../tailwind.css?url";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack Start Starter Cats App",
    },
  ],
  // Add it in here, so that Tanstack Start add it as a <link ref="stylesheet" ref="tailwind-89420983.css"> to the header
  links: () => [
    {
      rel: "stylesheet",
      href: tailwind,
    },
  ],
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}

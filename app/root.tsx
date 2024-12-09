import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Header } from "./components/layout/header";
import { Sidebar } from "./components/layout/sidebar";
import { Toaster } from "./components/ui/toaster";
import { Providers } from "./components/providers";
import { useLoadScript } from "@react-google-maps/api";

import "./tailwind.css";

const libraries: ("places")[] = ["places"];

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmXsgnr3In_koCgOO-awDBGSj_1QTBTq4",
    libraries,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar className="w-64" />
            <div className="flex-1">
              <Header />
              <main className="container px-4 py-8">
                {isLoaded ? <Outlet /> : <div>Loading...</div>}
                <Toaster />
              </main>
            </div>
          </div>
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
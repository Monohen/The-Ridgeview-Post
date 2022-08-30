import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <SessionProvider session={session}>
        <Header></Header>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

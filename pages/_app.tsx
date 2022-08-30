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
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6110297073296255"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

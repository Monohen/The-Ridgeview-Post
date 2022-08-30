import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Header></Header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

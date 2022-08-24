import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Header></Header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AllStateProvider } from "@/context/AllStateContext";
import { SessionProvider } from "next-auth/react";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div className={lato.className}>
        <Navbar />
        <AllStateProvider>
          <Component {...pageProps} />
        </AllStateProvider>
      </div>
    </SessionProvider>
  );
}

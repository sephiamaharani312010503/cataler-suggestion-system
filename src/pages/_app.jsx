import "@/styles/globals.css";
import { Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { AllStateProvider } from "@/context/AllStateContext";
import { SuggestionDataContextProvider } from "@/context/SuggestionDataContext";
import { SessionContextProvider } from "@/context/SessionContext";
import { ModalFunctionContextProvider } from "@/context/ModalFunctionContext";

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
        <SessionContextProvider>
          <AllStateProvider>
            <SuggestionDataContextProvider>
              <ModalFunctionContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </ModalFunctionContextProvider>
            </SuggestionDataContextProvider>
          </AllStateProvider>
        </SessionContextProvider>
      </div>
    </SessionProvider>
  );
}

import "@/styles/globals.css";

import { TrackingContextProvider } from "@/context/Tracking";
import { NavBar, Footer } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <TrackingContextProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </TrackingContextProvider>
  );
}

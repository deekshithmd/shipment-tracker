import "@/styles/globals.css";

import { TrackingContextProvider } from "@/context/Tracking";

export default function App({ Component, pageProps }) {
  return (
    <TrackingContextProvider>
      <Component {...pageProps} />
    </TrackingContextProvider>
  );
}

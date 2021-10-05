import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/nprogress.css";
import * as ga from "../components/general/ga";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => NProgress.start();
    const handleStop = () => NProgress.done();
    const handleRouteChange = (url) => {
      ga.pageview(url);
      NProgress.done();
      window.scrollTo(0, 0);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", handleStop);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}

export default MyApp;

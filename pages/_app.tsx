import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import MyAppBar from "../components/AppBar";
import MyBottomNavigation from "../components/ButtonNavigation";
import { AuthProvider } from "../utils/firebase/AuthProvider";
import { AuthGuard } from "../utils/AuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <AuthProvider>
        <AuthGuard>
          {/* アプリケーションバー */}
          <MyAppBar />

          <CssBaseline />

          {/* ページコンテンツ */}
          <Component {...pageProps} />
          {/* ナビゲーションバー */}
          <MyBottomNavigation />
        </AuthGuard>
      </AuthProvider>
    </Box>
  );
}

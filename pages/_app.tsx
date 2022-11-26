import * as React from "react";
import "../styles/globals.css";
import {
  Box,
  CssBaseline,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from "@mui/icons-material/Star";

export default function App({ Component, pageProps }: AppProps) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <AppBar position="static">
        <Toolbar>
          {/* <StarIcon sx={{ marginRight: 2 }} /> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            japan times alpha - Study Log
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />

      {/* ページコンテンツ */}
      <Component {...pageProps} />

      {/* ナビゲーションバー */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            router.push(newValue);
          }}
        >
          <BottomNavigationAction
            value="."
            label="Articles"
            icon={<ArticleIcon />}
          />
          <BottomNavigationAction value="add" label="Add" icon={<AddIcon />} />
          <BottomNavigationAction
            value="dashboard"
            label="Dashboard"
            icon={<DashboardIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

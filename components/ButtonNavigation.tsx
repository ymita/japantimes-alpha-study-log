import * as React from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import router, { useRouter } from "next/router";

import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from "@mui/icons-material/Star";

export default function MyBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const router = useRouter();

    return(
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
    );
}
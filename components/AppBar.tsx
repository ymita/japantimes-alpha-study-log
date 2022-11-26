import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

export default function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <StarIcon sx={{ marginRight: 2 }} /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          japan times alpha - Study Log
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

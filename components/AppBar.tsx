import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import NextLink from "next/link";
import { useAuthContext } from "../utils/firebase/AuthProvider";

export default function MyAppBar() {
  const { user } = useAuthContext();
  const getName = () => {
    if(!user){
      return;
    }
    const name = user.displayName?.split(' ');
    const firstName = name?.[0] as string;
    const lastName = name?.[1] as string;
    return firstName.charAt(0) + lastName.charAt(0);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <StarIcon sx={{ marginRight: 2 }} /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          japan times alpha - Study Log
        </Typography>

        <>
          {user === null ? (
            <Button href="/login" color="inherit" LinkComponent={NextLink}>
              Login
            </Button>
          ) : (
            <Button href="/user" color="inherit" LinkComponent={NextLink}>
              <Avatar>{getName()}</Avatar>
            </Button>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
}

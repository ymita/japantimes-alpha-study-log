import * as React from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

export default function Index() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <Box sx={{ flex: 1, alignSelf: "center" }}>選択週</Box>
        <Button variant="contained">日付変更</Button>
      </Box>
      <List sx={{ width: "100%" }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

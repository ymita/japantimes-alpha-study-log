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
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../utils/firebase/init";

interface Article {
  id: string;
  publishedDate: Date;
  title: string;
}
const getArticles = async (): Promise<any> => {
  const db = getFirestore(app);
  const authorsRef = collection(db, "/articles");
  const authorSnapshot = await getDocs(authorsRef);
  const articles = authorSnapshot.docs.map((doc) => doc.data());
  return articles;
};

export default function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  // const [checked, setChecked] = useState([0]);

  useEffect(() => {
    void (async () => {
      setArticles(await getArticles());
    })();
  }, []);

  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <Box sx={{ flex: 1, alignSelf: "center" }}>選択週</Box>
        <Button variant="contained">日付変更</Button>
      </Box>
      <List sx={{ width: "100%" }}>
        {articles.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                // onClick={handleToggle(value.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

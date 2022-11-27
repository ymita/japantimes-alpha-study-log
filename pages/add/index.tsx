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
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../../utils/firebase/init";
import { useAuthContext } from "../../utils/firebase/AuthProvider";
import { User } from "firebase/auth";
import { getDatabase, push, ref, update } from "@firebase/database";

interface Article {
  id: string;
  publishedDate: Date;
  title: string;
  isRead: boolean;
}

interface StudyHistory {
  articleId: string;
  userId: string;
}

const getArticles = async (): Promise<Article[]> => {
  const db = getFirestore(app);
  const articlesRef = collection(db, "/articles");
  const articlesSnapshot = await getDocs(articlesRef);

  const articles = articlesSnapshot.docs.map<Article>((doc) => {
    return { id: doc.id, ...doc.data() } as Article;
  });

  return articles;
};

const getStudyHistories = async (user: User): Promise<StudyHistory[]> => {
  const db = getFirestore(app);
  const studyHistoryRef = collection(db, "/study-history");
  const studyHistorySnapshot = await getDocs(studyHistoryRef);

  const studyHistoryCollection = studyHistorySnapshot.docs.map<StudyHistory>(
    (doc) => {
      return { articleId: doc.id, ...doc.data() } as StudyHistory;
    }
  );

  return studyHistoryCollection;
};

const readArticle = async (articleId: string, user: User): Promise<void> => {
  const db = getFirestore(app);
  const docRef = doc(db, "/study-history", articleId);

  const data: StudyHistory = { articleId: articleId, userId: user.uid };

  const docRefx = await addDoc(collection(db, "/study-history"), {
    articleId: articleId,
    userId: user.uid,
  });
};

export default function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  const user = useAuthContext().user as User;
  // const [checked, setChecked] = useState([0]);

  useEffect(() => {
    void (async () => {
      // ビューモデルの作成
      const articles = await getArticles();
      const studyHistories = await getStudyHistories(user);
      articles.forEach((article) => {
        // studyHistoryCollectionに、article ID が存在すれば
        // articles の各記事の isRead ステートを更新する。
        article.isRead = studyHistories.some((h) => h.articleId === article.id);
      });
      setArticles(articles);
    })();
  }, []);

  const toggleCompleted = (article: Article, user: User) => () => {
    debugger;
    console.log(article);
    readArticle(article.id, user);
  };

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
              onClick={toggleCompleted(value, user)}
              disablePadding
            >
              <ListItemButton
                role={undefined}
                // onClick={toggleCompleted(value.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.isRead}
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
}

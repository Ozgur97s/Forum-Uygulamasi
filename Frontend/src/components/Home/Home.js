import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
    paddingTop: "20px",
    gap: "20px",
  },
});

function Home() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState([false]);
  const [postList, setPostList] = useState([]);
  const refreshPost = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPost();
  }, [postList]);

  if (error) {
    return <div> Error!!!! </div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <div className={classes.container}>
        <PostForm userId={1} userName={"nnnn"} refreshPost={refreshPost} />
        {postList.map((post) => (
          <Post
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
    marginLeft: "10px",
    "&:hover": {
      color: "lightblue",
    },
  },
});
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const classes = useStyles();
  const [likeId, setLikeId] = useState(null);

  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState([false]);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };
  const checkedLikes = () => {
    var likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    checkedLikes();
  });
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [commentList]);
  return (
    <div className="postContainer">
      <Card sx={{ width: 800 }}>
        <CardHeader
          avatar={
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          titleTypographyProps={{ style: { textAlign: "left" } }}
        />

        <CardContent>
          <Typography
            textAlign="left"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
          {likeCount}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed className={classes.container}>
            {error
              ? "error"
              : isLoaded
              ? commentList.map((comment) => (
                  <Comment
                    userId={1}
                    userName={"USER"}
                    text={comment.text}
                  ></Comment>
                ))
              : "Loading"}
            <CommentForm
              userId={1}
              userName={"USER"}
              postId={postId}
            ></CommentForm>
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;

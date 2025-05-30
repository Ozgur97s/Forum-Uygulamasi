import React, { useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import {
  Button,
  InputAdornment,
  inputAdornmentClasses,
  OutlinedInput,
} from "@mui/material";
import { SettingsCell } from "@mui/icons-material";

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
  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };
  const [isSent, setIsSent] = useState(false);
  const { userId, userName, refreshPost } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };
  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSent(false);
  };
  return (
    <div className="postContainer">
      <Snackbar
        open={isSent}
        autoHideDuration={5000}
        onClose={handleClose}
        message="POST BAŞARILI ŞEKİLDE PAYLAŞI."
      />
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
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
          titleTypographyProps={{ style: { textAlign: "left" } }}
        />

        <CardContent>
          <Typography
            textAlign="left"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 250 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" onClick={handleSubmit}>
                    {" "}
                    Post{" "}
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Post;

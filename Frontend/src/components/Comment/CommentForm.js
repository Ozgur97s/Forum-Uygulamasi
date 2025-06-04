import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import {
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

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

function CommentForm(props) {
  const { userId, userName, postId } = props;
  const classes = useStyles();
  const [text, setText] = useState("");
  const handleChange = (value) => {
    setText(value);
  };
  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then(() => setText("")) // Başarılı olunca temizle
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    saveComment();
  };

  return (
    <CardContent className={classes.Comment}>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName ? userName.charAt(0).toUpperCase() : "?"}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button variant="contained" onClick={handleSubmit}>
              {" "}
              Paylaş{" "}
            </Button>
          </InputAdornment>
        }
        value={text}
      ></OutlinedInput>
    </CardContent>
  );
}

export default CommentForm;

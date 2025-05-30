import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";

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

function Comment(props) {
  const { text, userId, userName } = props;
  const classes = useStyles();
  return (
    <CardContent className={classes.Comment}>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        value={text}
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
      ></OutlinedInput>
    </CardContent>
  );
}

export default Comment;

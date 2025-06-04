import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { LockOpen } from "@mui/icons-material";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
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

function Navbar() {
  let navigate = useNavigate();

  const classes = useStyles();
  let userId = 1;

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    navigate(0);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                Home
              </Link>
            </Typography>
            <Typography variant="h6">
              {localStorage.getItem("currentUser") == null ? (
                <Link className={classes.link} to="/auth">
                  Giriş/Kayıt ol
                </Link>
              ) : (
                <div>
                  <IconButton className={classes.link} onClick={onClick}>
                    <LockOpen></LockOpen>
                  </IconButton>
                  <Link
                    className={classes.link}
                    to={{
                      pathname: "/users/" + localStorage.getItem("currentUser"),
                    }}
                  >
                    Profil
                  </Link>
                </div>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
export default Navbar;

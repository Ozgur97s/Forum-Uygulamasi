import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Post from "../Post/Post";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Dialog } from "@mui/material";

// Popup bileşeni
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
  const { isOpen, postId, setIsOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (postId) {
      fetch("/posts/" + postId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("tokenKey"),
        },
      })
        .then((res) => res.json())
        .then((result) => setPost(result))
        .catch((error) => console.log(error));
    }
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  return post ? (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Post Detayı
          </Typography>
        </Toolbar>
      </AppBar>
      <Post
        likes={post.postLikes}
        postId={post.id}
        userId={post.userId}
        userName={post.userName}
        title={post.title}
        text={post.text}
      />
    </Dialog>
  ) : (
    "Yükleniyor..."
  );
}

// Ana bileşen
function UserActivity(props) {
  const { userId } = props;
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  };

  const getActivity = () => {
    fetch("/users/activity/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then((result) => setRows(result))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {isOpen && (
        <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} />
      )}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="user activity table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>İşlem Türü</strong>
                </TableCell>
                <TableCell>
                  <strong>Detay</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleNotification(row[1])}
                      >
                        Gör
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Kullanıcı aktivitesi bulunamadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default UserActivity;

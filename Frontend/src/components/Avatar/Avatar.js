import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";

function Avatar(props) {
  const { avatarId } = props;
  const [selectedValue, setSelectedValue] = useState(avatarId);
  const [open, setOpen] = useState(false);

  const saveAvatar = () => {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    fetch("/users/" + localStorage.getItem("currentUser"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        avatar: selectedValue,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: 5, mt: 4 }}>
        <CardMedia
          component="img"
          alt="Kullanıcı Avatarı"
          image={`/avatars/avatar${selectedValue}.png`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kullanıcı adı
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Kullanıcı bilgisi
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Avatar değiştir
          </Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <List dense>
            {[1, 2, 3, 4, 5, 6].map((key) => {
              const labelId = `checkbox-list-secondary-label-${key}`;
              return (
                <ListItem key={key} button>
                  <CardMedia
                    style={{ maxWidth: 100 }}
                    component="img"
                    alt={`Avatar n°${key}`}
                    image={`/avatars/avatar${key}.png`}
                    title="User Avatar"
                  />
                  <ListItemSecondaryAction>
                    <Radio
                      edge="end"
                      value={key}
                      onChange={handleChange}
                      checked={"" + selectedValue === "" + key}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}

export default Avatar;

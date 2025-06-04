import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const sendRequest = async (path) => {
    try {
      const res = await fetch("/auth/" + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password: password }),
      });

      const result = await res.json();

      if (path === "login") {
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleButton = async (path) => {
    await sendRequest(path);
    setUsername("");
    setPassword("");
    if (path === "login") {
      navigate("/");
    } else if (path === "register") {
      navigate("/auth");
    }
  };

  return (
    <FormControl>
      <InputLabel>Kullanıcı adı</InputLabel>
      <Input
        value={username}
        onChange={(i) => handleUsername(i.target.value)}
      />

      <InputLabel style={{ top: 80 }}>Parola</InputLabel>
      <Input
        type="password"
        value={password}
        onChange={(i) => handlePassword(i.target.value)}
        style={{ top: 40 }}
      />

      <Button
        variant="contained"
        style={{ marginTop: 60 }}
        onClick={() => handleButton("register")}
      >
        Kayıt ol
      </Button>

      <FormHelperText>Zaten hesabınız var mı?</FormHelperText>

      <Button variant="contained" onClick={() => handleButton("login")}>
        Giriş
      </Button>
    </FormControl>
  );
}

export default Auth;

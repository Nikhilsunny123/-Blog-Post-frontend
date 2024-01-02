import React from "react";
import LoginForm from "../../components/login=components/LoginForm";
import { Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <Typography>New Account</Typography>
      <p></p>
    </div>
  );
};

export default LoginPage;

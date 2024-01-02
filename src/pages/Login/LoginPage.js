import React, { useState } from "react";
import LoginForm from "../../components/login-components/LoginForm";
import { Typography } from "@mui/material";
import "./login.css";
import RegistrationForm from "../../components/login-components/RegistrationForm";
import { IsLoginAction } from "../../store/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);
  return (
    <div>
      {!isLogin ? <LoginForm /> : <RegistrationForm />}

      <Typography onClick={() => dispatch(IsLoginAction(true))}>
        New Account
      </Typography>
    </div>
  );
};

export default LoginPage;

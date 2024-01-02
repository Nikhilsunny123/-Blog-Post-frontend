import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextField, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Alerts from "../common/Alerts";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { IsLoginAction } from "../../store/authSlice/authSlice";
import loginServices from "../../services/authServices";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  // calling login api
  const mutation = useMutation(loginServices.register, {
    onSuccess: (data) => {
      console.log("Register successfully:", data);
      dispatch(IsLoginAction(false));
    },
    // handling error if error
    onError: (error) => {
      const responce = error;
      console.log();
      console.error(responce.message);

      if (responce?.response?.status === 500) {
        setErrorMessage(responce?.response?.data.message);
      } else {
        console.log(error);
        setErrorMessage("network Error");
      }
    },
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // validation  using yup

  const schema = yup
    .object({
      email: yup.string().email().required("Please enter your email"),
      password: yup.string().required("Please enter your password"),
    })
    .required();

  // login form using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  //handle the login submit
  const onSubmit = (data) => {
    setIsLoggingIn(true);
    mutation.mutate(data);
    setIsLoggingIn(false);
  };

  return (
    <div className="login-container">
      <h1 className="header">Create new account</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
      >
        <div className="form-container">
          {mutation.isError && <Alerts name={errorMessage} />}
          <div>
            <TextField
              label="You Email"
              type="email"
              fullWidth
              className="textbox"
              {...register("email")}
            />
            {errors.password?.message ? (
              <p className="error-message">{errors.email?.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <TextField
              label="You Password"
              className="textbox"
              type="password"
              fullWidth
              {...register("password")}
            />
            {errors.password?.message ? (
              <p className="error-message">{errors.password?.message}</p>
            ) : (
              ""
            )}
          </div>

          <Button
            type="submit"
            size="medium"
            variant="contained"
            className="log-in-button"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            disabled={isLoggingIn}
          >
            Sign up
          </Button>
        </div>
      </form>

      <Link onClick={() => dispatch(IsLoginAction(false))}>
        Already have an account
      </Link>
    </div>
  );
};

export default RegistrationForm;

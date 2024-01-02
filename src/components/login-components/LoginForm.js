// LoginForm.jsx
import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginForm = () => {
  // Yup schema for LoginForm
  const schema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema), // Assuming you have defined a Yup schema
  });

  const onSubmit = (data) => {
    // Perform login API call using Node.js API
    // Example: axios.post('/api/login', data)
  };

  return (
    <div>
      <Typography>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            type="email"
            name="email"
            inputRef={register}
            error={!!errors?.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            inputRef={register}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
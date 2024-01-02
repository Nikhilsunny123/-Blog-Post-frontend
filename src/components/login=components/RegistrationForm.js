import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const RegistrationForm = () => {
  // Yup schema for RegistrationForm
  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: YupResolver(schema), // Assuming you have defined a Yup schema
  });

  const onSubmit = (data) => {
    // Perform registration API call using Node.js API
    // Example: axios.post('/api/register', data)
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="email" name="email" ref={register} />
        {errors.email && <p>{errors.email.message}</p>}

        <label>Password:</label>
        <input type="password" name="password" ref={register} />
        {errors.password && <p>{errors.password.message} </p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

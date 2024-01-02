import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextField, Button } from "@mui/material";

import { useMutation } from "react-query";
import blogPostServices from "../../services/blogPostServices";
import Alerts from "../../components/common/Alerts";

const AddPost = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  // calling login api
  const mutation = useMutation(blogPostServices.createblogPostService, {
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

  // validation  using yup

  const schema = yup
    .object({
      postName: yup.string().required("Please enter the post name"),
      postMessage: yup.string().required("Please enter the post message"),
    })
    .required();

  // login form using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postName: "",
      postMessage: "",
    },
    resolver: yupResolver(schema),
  });

  //handle the login submit
  const onSubmit = (data) => {
    mutation.mutate(data);
    console.log(data);
  };

  return (
    <div className="login-container">
      <h1 className="header">Add a New Blog Post</h1>

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
              label="Post Name"
              fullWidth
              className="textbox"
              {...register("postName")}
            />
            {errors.postName?.message && (
              <p className="error-message">{errors.postName?.message}</p>
            )}
          </div>
          <div>
            <TextField
              label="Post Message"
              className="textbox"
              multiline
              rows={4}
              fullWidth
              {...register("postMessage")}
            />
            {errors.postMessage?.message && (
              <p className="error-message">{errors.postMessage?.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="medium"
            variant="contained"
            className="log-in-button"
            fullWidth
          >
            Add Blog Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;

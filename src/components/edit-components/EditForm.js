import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRef } from "react";
import blogPostServices from "../../services/blogPostServices";
import Alerts from "../common/Alerts";

export default function EditForm({ post }) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const [defaultValue, setDefault] = useState(post);
  const buttonRef = useRef(null);

  // Validation schema for the form using Yup
  const schema = yup
    .object({
      postName: yup.string().required("Please enter the post name"),
      postMessage: yup.string().required("Please enter the post message"),
    })
    .required();
  // Set up the form using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
  });

  // Function to handle form submission
  const onSubmit = async (value) => {
    buttonRef.current.disabled = true;
    const updateData = {
      id: post?._id,
      postName: value.postName,
      postMessage: value.postMessage,
    };
    try {
      await mutation.mutateAsync(updateData);
      setDefault(updateData);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to control the dialog's open and close state
  const onModalState = (state) => {
    setIsModal(state);
    setErrorMessage(null);
    !state && reset(defaultValue);
  };

  // Updation using React Query
  const mutation = useMutation(blogPostServices.updateblogPostService, {
    onSuccess: (data) => {
      setIsModal(false);

      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      const responce = error;
      console.error(responce.message);
      if (responce?.response?.status === 500) {
        setErrorMessage(responce?.response?.data.message);
      } else {
        console.log(error);
        setErrorMessage("network Error");
      }
    },
  });

  return (
    <>
      <EditOutlinedIcon
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => onModalState(true)}
      />
      <Dialog className="dialog" open={isModal}>
        <div className="dialog-top">
          <DialogTitle className="dialog-title">Update blog post</DialogTitle>
          <CloseIcon
            className="close-icon"
            onClick={() => onModalState(false)}
          />
        </div>
        <Divider light />
        <DialogContent>
          <div className="form-container">
            {mutation.isError && errorMessage ? (
              <Alerts name={errorMessage} />
            ) : (
              ""
            )}
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
                    <p className="error-message">
                      {errors.postMessage?.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  className="log-in-button"
                  fullWidth
                  ref={buttonRef}
                >
                  Edit Post
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

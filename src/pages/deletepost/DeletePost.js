import React from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import DeleteIcon from "@mui/icons-material/Delete";
import blogPostServices from "../../services/blogPostServices";
import { useMutation, useQueryClient } from "react-query";

const DeletePost = () => {
  const blogPosts = useSelector((state) => state.blog.posts);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(blogPostServices.deleteblogPostService, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts"); // Invalidate the query to refresh data
    },
    onError: (error) => {
      const responce = error;
      console.error(responce);
    },
  });

  // Handle the delete action
  const handleDelete = (data) => {
    deleteMutation.mutate(data);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {blogPosts.map((post) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={post._id}
        >
          <Post data={post} />
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(post._id);
            }}
            id={post._id}
          />
        </div>
      ))}
    </div>
  );
};

export default DeletePost;

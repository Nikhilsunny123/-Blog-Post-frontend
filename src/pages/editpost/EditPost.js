import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import EditForm from "../../components/edit-components/EditForm";

const EditPost = () => {
  const blogPosts = useSelector((state) => state.blog.posts);
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
          <EditForm post={post} />
        </div>
      ))}
    </div>
  );
};

export default EditPost;

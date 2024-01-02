import React from "react";
import blogPostServices from "../../services/blogPostServices";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/postsSlice/postSlice";
import Post from "../../components/Post";

const HomePage = () => {
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
        <div key={post.id}>
          <Post data={post} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;

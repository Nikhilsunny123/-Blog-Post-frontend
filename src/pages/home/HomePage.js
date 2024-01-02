import React from "react";
import blogPostServices from "../../services/blogPostServices";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/postsSlice/postSlice";
import Post from "../../components/Post";

const HomePage = () => {
  const blogPosts = useSelector((state) => state.blog.posts);
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useQuery(
    ["posts"],
    blogPostServices.getAllblogPostService,
    {
      onSuccess: (data) => {
        dispatch(setPosts(data?.data.data));
      },
      onError: (error) => {
        const responce = error;
        console.log();
        console.error(responce.message);
      },
    }
  );
  console.log(data);
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

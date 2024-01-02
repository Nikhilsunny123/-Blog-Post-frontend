import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginForm from "./components/login-components/LoginForm";
import HomePage from "./pages/home/HomePage";
import RegistrationForm from "./components/login-components/RegistrationForm";
import LoginPage from "./pages/Login/LoginPage";
import AddPost from "./pages/addpost/AddPost";
import EditPost from "./pages/editpost/EditPost";
import DeletePost from "./pages/deletepost/DeletePost";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import blogPostServices from "./services/blogPostServices";
import { setPosts } from "./store/postsSlice/postSlice";

const Router = () => {
  const navigate = useNavigate();

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkIfUserIsAuthenticated = () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // Check whether the user is authenticated here, and set the state accordingly
    const userIsAuthenticated = checkIfUserIsAuthenticated();
    setIsAuthenticated(userIsAuthenticated);

    // If the user is not authenticated, redirect to the login page
    if (!userIsAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);
  return !isAuthenticated ? (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="addpost" element={<AddPost />} />
        <Route path="editpost" element={<EditPost />} />
        <Route path="deletepost" element={<DeletePost />} />
      </Route>
    </Routes>
  );
};

export default Router;

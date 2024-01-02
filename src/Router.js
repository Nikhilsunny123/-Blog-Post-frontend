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

const Router = () => {
  const navigate = useNavigate();
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
      <Route path="/signup" element={<RegistrationForm />} />
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

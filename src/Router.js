import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginForm from "./components/login=components/LoginForm";

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
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="services" element={<CarServices />} />
        <Route path="services/:serviceid" element={<CarSubServices />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="locations" element={<Locations />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="users" element={<Users />} />
        <Route path="additionalcharges" element={<AdditionalCharges />} />
        <Route path="vouchercode" element={<VoucherCode />} /> */}
      </Route>
    </Routes>
  );
};

export default Router;

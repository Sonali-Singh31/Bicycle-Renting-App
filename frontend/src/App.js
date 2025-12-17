import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationToaster from "./components/toast/NotificationToaster";
import Header from "./components/common/Header";
import NotFound from "./components/common/NotFound";
import Profile from "./components/common/Profile";
import AddBicycle from "./components/common/AddBicycle";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import UserHome from "./components/user/Home";
import PendingRequests from "./components/user/PendingRequests";
import RentedBicycles from "./components/user/RentedBicycles";
import PendingReturns from "./components/user/PendingReturns";
import RentCompleteInfo from "./components/user/RentCompleteInfo";

import AdminHome from "./components/admin/Home";
import PendingAdminRequests from "./components/admin/PendingRequests";
import PendingAdminReturns from "./components/admin/PendingReturns";
import AdminRequests from "./components/admin/AdminRequests";
import ApprovedRequests from "./components/admin/ApprovedRequests";
import Cookies from "js-cookie";
import HomePageCarousel from "./components/common/HomePageCarousel";
import ApprovedReturns from "./components/admin/ApprovedReturns";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    if (Cookies.get("usertype")) {
      setUserType(Cookies.get("usertype"));
    }
  }, []);

  const handleUserChange = (user, type) => {
    setUserType(type);
    setIsAuthenticated(user);
  };

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={handleUserChange}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={handleUserChange}
              setUserType={setUserType}
            />
          }
        />
        {!userType && (
          <Route path="/" element={<HomePageCarousel />} />
        )}

        {/* {userType && (
          <>
            <Route path="/add-bicycle" element={<AddBicycle />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )} */}
        <Route path="/profile" element={<Profile />} />

        {/* Only for certain user types */}
        {userType === "admin" && (
          <Route path="/add-bicycle" element={<AddBicycle />} />
        )}

        {/* Not Found */}
        

        {userType === "user" && (
          <>
            <Route path="/" element={<UserHome />} />
            <Route path="/pending-requests" element={<PendingRequests />} />
            <Route path="/rented-bicycles" element={<RentedBicycles />} />
            <Route path="/pending-returns" element={<PendingReturns />} />
            <Route path="/rent-complete-info" element={<RentCompleteInfo />} />
          </>
        )}

        {userType === "admin" && (
          <>
            <Route path="/" element={<AdminHome />} />
            <Route path="/pending-requests" element={<PendingAdminRequests />} />
            <Route path="/pending-returns" element={<PendingAdminReturns />} />
            <Route path="/approved-requests" element={<AdminRequests />} />
            <Route path="/approved-returns" element={<ApprovedReturns />} />
          </>
        )}

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationToaster />
    </Router>
  );
}

export default App;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import Cookies from "js-cookie";
const Dashboard = () => {
  let navigate = useNavigate();
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="flex mx-35px px-16 mt-4">
      <p>Welcome Aniket</p>
      <button
        className="bg-blue-900 text-white rounded-sm w-20  "
        onClick={() => {
          // Cookies.remove("email");
          // Cookies.remove("auth-Tokensynex");
          // Cookies.remove("name");
          // Cookies.remove("email");
          logout()
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

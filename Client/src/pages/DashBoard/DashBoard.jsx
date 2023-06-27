import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import Cookies from "js-cookie";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import DashDiv from "../../components/DashDiv/DashDiv";
const Dashboard = () => {
  let navigate = useNavigate();
  const logout = () => {
    signOut(auth);
  };
  return (
    <div>
      <SideNavbar />
      <DashDiv/>
    </div>
  );
};

export default Dashboard;

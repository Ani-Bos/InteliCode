import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";


const ResetPassword = (props) => {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "" });
    const [user, loading, error] = useAuthState(auth);
    const [resetSuccess, setResetSuccess] = useState(false);
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  //It defines a state variable called credential using the useState hook which holds the user's email and password.
  //The handleSignIn function is an asynchronous function that handles the sign-in process. It first calls the signInWithEmailAndPassword function  with the provided email and password to authenticate the user. The result is stored in the userCr variable.

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSign = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <section className="absolute w-full h-full">
      <div
        className="absolute top-0 w-full h-full bg-gray-900"
        style={{
          backgroundImage: `url('Images/herobg.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full mt-2">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                borderLeft: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="rounded-t mb-0 px-6 py-6">
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-white text-center mb-3 font-regualar">
                  <small>Get Password Recovery Mail 📧</small>
                </div>
                <form>
                  <div className="relative w-full mb-3 mt-3">
                    <input
                      value={credential.email}
                      onChange={handleSign}
                      type="email"
                      name="email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      style={{
                        transition: "all .15s ease",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => sendPasswordReset(credential.email)}
                      className={`${
                        credential.email === "" ? "bg-blue-500" : "bg-green-500"
                      }
                       text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full `}
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
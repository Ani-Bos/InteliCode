import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub} from "react-icons/fa";
import { FcGoogle} from "react-icons/fc";
import { auth, provider } from "../../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup ,  } from "firebase/auth";
import axios from "axios";

import Cookies from "js-cookie";
const Login = (props) => {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  //It defines a state variable called credential using the useState hook which holds the user's email and password.
  //The handleSignIn function is an asynchronous function that handles the sign-in process. It first calls the signInWithEmailAndPassword function  with the provided email and password to authenticate the user. The result is stored in the userCr variable.
  const handleSignIn = async () => {
    let userCr = await signInWithEmailAndPassword(
      auth,
      credential.email,
      credential.password
    );
    console.log(userCr.user);
    const email = userCr.user.email;
    const name = credential.username;
    const profilepic = userCr.user.photoURL;
    Cookies.set(
      "dp",
      profilepic
        ? profilepic
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGjDJxNoPQgkbqeBPV0yYH7CNMJwficf9hw&usqp=CAU"
    );
    Cookies.set("email", email);
    Cookies.set("name", name);
    const url = "http://localhost:5001/api/auth";
    //server
    const resp = await axios.post(`${url}/login`, { email: credential.email });
    const res = resp.data;
    Cookies.set("auth-Tokensynex", res.authToken);
    navigate("/dashboard");
  };

  const handleSign = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // const handleSign = (e) => {
  //   setCredential((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const signinwithgoogle = async () => {
    const signin = await signInWithPopup(auth, provider);
    const email = signin.user.email;
    const name = signin.user.displayName;
    const profilepic = signin.user.photoURL;
    Cookies.set("dp", profilepic);
    Cookies.set("email", email);
    Cookies.set("name", name);

    const url = "http://localhost:5001/api/auth";
    const user = await axios.post(`${url}/createUser`, {
      email: email,
      name: name,
    });
    const res = user.data;
    console.log(res);
    if (res.mark) {
      const login = await axios.post(`${url}/login`, {
        email: Cookies.get("email"),
      });
      const data = login.data;
      Cookies.set("auth-Tokensynex", data.authToken);
      window.location.replace("/dashboard");
      return;
    }
    Cookies.set("auth-Tokensynex", res.authToken);

    navigate("/dashboard");
  };
  
  const signinwithgithub = async  () => {
    const signin = await signInWithPopup(auth, provider);
    const email = signin.user.email;
    const name = signin.user.displayName;
    const profilepic = signin.user.photoURL;
    Cookies.set("dp", profilepic);
    Cookies.set("email", email);
    Cookies.set("name", name);
    const url = "http://localhost:5001/api/auth";
    const user = await axios.post(`${url}/createUser`, {
      email: email,
      name: name,
    });
    const res = user.data;
    console.log(res);
    if (res.mark) {
      const login = await axios.post(`${url}/login`, {
        email: Cookies.get("email"),
      });
      const data = login.data;
      Cookies.set("auth-Tokensynex", data.authToken);
      window.location.replace("/dashboard");
      return;
    }
    Cookies.set("auth-Tokensynex", res.authToken);

    navigate("/dashboard");
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
                <div className="text-center mb-3">
                  <h6 className="text-white text-sm font-regular">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center flex flex-col mt-4 justify-center">
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-semibold px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs justify-center mt-2 h-9"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    {/* <img alt="..." className="w-5 mr-1" src={FaGithub} /> */}
                    <span>
                      <FaGithub className="w-5 mr-1" />
                    </span>
                    Github
                  </button>
                  <button
                    onClick={async () => {
                      await signinwithgoogle();
                    }}
                    className="bg-white active:bg-gray-100 text-gray-800 font-semibold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs justify-center  mt-2 h-9"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    <span>
                      <FcGoogle className="w-5 mr-1" />
                    </span>
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-white text-center mb-3 font-regualar">
                  <small>Sign in with Email 📧</small>
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

                  <div className="relative w-full mb-3 mt-3">
                    <input
                      value={credential.password}
                      onChange={handleSign}
                      type="password"
                      name="password"
                      className="border-0 px-3 py-3 placeholder-gray-400  text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
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
                  <div>
                    <label className="inline-flex items-center cursor-pointer mt-2">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-white ml-1 w-5 h-5 "
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-regualar text-white">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      disabled={
                        credential.email === "" || credential.password === ""
                          ? true
                          : false
                      }
                      onClick={handleSignIn}
                      className={`${
                        credential.email === "" || credential.password === ""
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }
                       text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full `}
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
              <div className="px-5 py-2 text-xs flex justify-between items-center text-white">
                <p>Don't have an account?</p>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="py-2 px-5 bg-white border rounded-md hover:scale-110 duration-300 text-black"
                >
                  Sign Up
                </button>
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-white"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Create new account</small>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

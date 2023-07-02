import { React, useState, useEffect, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Avatar from "react-avatar";
import axios from "axios";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import Paint from "../Paint/PaintCanvas";
import { CanvasSketchTool } from "react-arts";
const SideNav = ({ host }) => {
 const [showCanvas, setShowCanvas] = useState(false);
 let Navigate = useNavigate();

//  const handleClick = () => {
//    setShowCanvas(true);
//  };
  const handleClick = () => {
    Navigate("/canvas");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const getuserinfo = async () => {
    const user = await axios.post(
      `${host}/api/auth/getuser`,
      {},
      {
        headers: {
          "auth-token": Cookies.get("auth-Tokensynex"),
        },
      }
    );
    const data = user.data;
    setName(data.user.name);
    setEmail(data.user.email);
    console.log(user.name);
  };

   useEffect(() => {
     if (!Cookies.get("auth-Tokensynex")) {
       navigate("/login");
       return;
     }
     // eslint-disable-next-line
   }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let navigate = useNavigate();
  const logout = () => {
    signOut(auth);
  };
  return (
    <div>
      <nav
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-primary dark:border-gray-700"
        style={{
          background: "rgb(5, 8, 22,0.9)",
          // background: "rgb(0, 0, 0,0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: "3px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "5px 5px 30px rgba(0, 0, 0, 0.2)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                onClick={handleSidebarToggle}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24">
                <img
                  src="./images/img1.svg"
                  className="h-12 w-12 self-center"
                  alt=""
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  InteliCode
                </span>
              </a>
            </div>
            <div className="relative">
              <button
                type="button"
                className=""
                aria-expanded={isProfileOpen}
                onClick={handleProfileToggle}
              >
                <span className="sr-only">Open user menu</span>
                <div className="rounded-full m-auto">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={Cookies.get("dp")}
                    alt=""
                  />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {Cookies.get("name")}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                      {Cookies.get("email")}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        onClick={() => {
                          Cookies.remove("email");
                          Cookies.remove("auth-Tokensynex");
                          Cookies.remove("name");
                          Cookies.remove("email");
                          logout();
                          navigate("/");
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-16">
        <aside
          id="logo-sidebar"
          className={`fixed top-20 left-0  z-40 w-48 h-screen pt-20 transition-transform rounded-md ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full rounded-md"
          } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <button
                  onClick={handleClick}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Paint</span>
                </button>
                {/* {showCanvas && <CanvasSketchTool height={450} width={750} />} */}
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Notes</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

  export default SideNav;

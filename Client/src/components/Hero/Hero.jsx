import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";

const Hero = () => {
  return (
    <div>
      <section className="">
        <h1 className=" flex justify-center items-center ] py-14 text-[7.5vw] text-center sm:text-6xl leading-none select-none tracking-tightest font-extrabold">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div>
              <span
                data-content="Code 👨‍💻."
                className="relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:px-2 before:bottom-0 before:left-0 before:text-center before:text-white before:animate-gradient-background-1"
              >
                <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1">
                  {" "}
                  Code 👨‍💻.
                </span>
              </span>
            </div>

            <div>
              <span
                data-content="Conquer ."
                className="relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:px-2 before:bottom-0 before:left-0 before:text-center before:text-white before:animate-gradient-background-2"
              >
                <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2">
                  {" "}
                  Conquer .
                </span>
              </span>
            </div>
            <div>
              <span
                data-content="Run 🏃🏼‍♀️ ."
                className="relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:px-2 before:bottom-0 before:left-0 before:text-center before:text-white before:animate-gradient-background-3"
              >
                <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3">
                  {" "}
                  Run 🏃🏼‍♀️ .
                </span>
              </span>
            </div>
          </div>
        </h1>
        <div className="">
          <div class="px-8 py-32 mb-4 ">
            <div class="grid gap-8 items-start justify-center">
              <div class="relative group">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-gradient-3-start to-gradient-3-end rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Link
                  to="/login"
                  class="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
                >
                  <span class="flex items-center justify-center">
                    <span class="mx-6 text-center text-gray-100">
                      Get Started
                    </span>
                  </span>
                  <span class="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200"></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="color:black">
            <p>kdkdskl</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
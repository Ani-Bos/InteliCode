import React from "react";
import "./DashDiv.css";

const DashDiv = () => {
  return (
    <div className="dashboard-container flex flex-col sm:flex-row sm:justify-center items-center sm:ml-0 sm:mt-16 md:">
      <div className="flex flex-col sm:flex-row sm:justify-center items-center max-w-md sm:max-w-xl shadow-lg rounded-xl overflow-hidden mx-auto mt-8 sm:ml-4 sm:mr-2">
        <div className="h-auto w-auto sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden">
          <div className="flex flex-col justify-center items-center h-full">
            <img
              className="h-32 w-32"
              src="./images/user.svg"
              alt="User Avatar"
            />
            <span className="font-semibold ">boseaniket48</span>
            <div className="flex mt-3">
              <img
                className="h-6 w-6"
                src="./images/badge.png"
                alt="User Avatar"
              />
              <span className="mx-0 font-semibold">
                500 <span className="text-gray-400 font-medium">Rank</span>
              </span>
            </div>

            <div className="flex justify-center align-center">
              <div className="flex flex-col mt-4 mx-4">
                <span className="justify-center align-center mt-9">
                  Current streak
                </span>

                <span className="justify-center align-center">37/690</span>
              </div>
              <img
                className="h-24 w-24"
                src="./images/streak.png"
                alt="User Avatar"
              ></img>
            </div>
          </div>
        </div>

        <div className="h-auto w-auto sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden">
          <div className="flex flex-col py-4 mb-9">
            <h2 className="mb-2 font-black">Hello Aniket👋</h2>
            <p className="mb-2 text-gray-dark text-sm">Languages Used</p>
            <span className="font-semibold">C++, C, Javascript, Java</span>
          </div>

          <div className="flex flex-col px-6 py-4mx-10 mb-9">
            <span className="font-semibold">Total Active Days</span>
            <img
              className="custom-image"
              src="./images/graph.png"
              alt="User Avatar"
            ></img>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-center items-center max-w-md sm:max-w-xl shadow-lg rounded-xl overflow-hidden mx-auto mt-8 sm:ml-4 sm:mr-2">
        <div className="h-auto w-auto sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden">
          <div className="flex flex-col justify-center items-center h-full">
            <img
              className="h-32 w-32"
              src="./images/user.svg"
              alt="User Avatar"
            />
            <span className="font-semibold ">boseaniket48</span>
            <div className="flex mt-3">
              <img
                className="h-6 w-6"
                src="./images/badge.png"
                alt="User Avatar"
              />
              <span className="mx-0 font-semibold">
                500 <span className="text-gray-400 font-medium">Rank</span>
              </span>
            </div>

            <div className="flex justify-center align-center">
              <div className="flex flex-col mt-4 mx-4">
                <span className="justify-center align-center mt-9">
                  Current streak
                </span>

                <span className="justify-center align-center">37/690</span>
              </div>
              <img
                className="h-24 w-24"
                src="./images/streak.png"
                alt="User Avatar"
              ></img>
            </div>
          </div>
        </div>

        <div className="h-auto w-auto sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden">
          <div className="flex flex-col py-4 mb-9">
            <h2 className="mb-2 font-black">Hello Aniket👋</h2>
            <p className="mb-2 text-gray-dark text-sm">Languages Used</p>
            <span className="font-semibold">C++, C, Javascript, Java</span>
          </div>

          <div className="flex flex-col px-6 py-4mx-10 mb-9">
            <span className="font-semibold">Total Active Days</span>
            <img
              className="custom-image"
              src="./images/graph.png"
              alt="User Avatar"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashDiv;

import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
const NoMatch = () => {
  return (
    <div className="no-match">
      <Header />
      <div className="no-match__content flex flex-col items-center justify-center mt-16">
        <h2 className="text-2xl font-light">Invalid video call name.</h2>
        <div className="action-btn">
          <Link
            className="btn cursor-pointer text-base py-4 px-6 border border-transparent rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            to="/"
          >
            Return to home screen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;

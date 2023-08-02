import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,
  faUser,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const MeetingInfo = ({ setMeetInfoPopup, url }) => {
  return (
    <div className="meeting-info-block absolute top-8 left-8 bg-white rounded-lg p-6 w-80">
      <div className="meeting-header flex items-center justify-between text-gray-700">
        <h3 className="text-base font-normal">Your meeting's ready</h3>
        <FontAwesomeIcon
          className="icon cursor-pointer text-base"
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      <button className="add-people-btn flex items-center justify-center bg-green-600 text-white text-base py-2 px-4 mt-4 rounded-lg focus:outline-none">
        <FontAwesomeIcon className="icon text-sm mr-2" icon={faUser} />
        Add Others
      </button>
      <p className="info-text text-base text-gray-700 mt-4">
        Or share this meeting link with others you want in the meeting
      </p>
      <div className="meet-link flex items-center justify-between bg-gray-200 p-4 rounded-lg mt-4">
        <span className="text-base font-semibold text-gray-600 flex-1">
          {url}
          {/* this is the url that is used to be generated in callpage.jsx and passed as prop */}
        </span>
        <FontAwesomeIcon
          className="icon cursor-pointer text-base text-gray-600"
          icon={faCopy}
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </div>
      <div className="permission-text flex items-center justify-center mt-4">
        <FontAwesomeIcon
          className="icon text-red-600 text-base"
          icon={faShieldAlt}
        />
        {/* <p className="small-text text-sm text-gray-700">
          People who use this meeting link must get your permission before they
          can join.
        </p> */}
      </div>
      {/* <p className="small-text text-sm text-gray-700 mt-2">
        Joined as akshay@gmail.com
      </p> */}
    </div>
  );
};

export default MeetingInfo;
